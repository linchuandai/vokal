import React, { Component } from "react";
import CTA from './cta/CTA';
import Statistics from './statistics/Statistics'
import TextandFeedback from "./textandfeedback/TextandFeedback";
import "./Transcriber.css"

const audioUtils        = require('./audioUtils');  // for encoding audio data as PCM
const crypto            = require('crypto'); // tot sign our pre-signed URL
const v4                = require('./aws-signature-v4'); // to generate our pre-signed URL
const marshaller        = require("@aws-sdk/eventstream-marshaller"); // for converting binary event stream messages to and from JSON
const util_utf8_node    = require("@aws-sdk/util-utf8-node"); // utilities for encoding and decoding UTF8
const mic               = require('microphone-stream'); // collect microphone input as a stream of raw bytes
const eventStreamMarshaller = new marshaller.EventStreamMarshaller(util_utf8_node.toUtf8, util_utf8_node.fromUtf8);

// our global variables for managing state
let languageCode = "en-US";
let region = "us-east-2";
let sampleRate = 44100;
let transcription = "";
let socket;
let micStream;
let socketError = false;
let transcribeException = false;

var transcribedText = "";

// functions to do the CTAs and AWS API calls 

export default class Transcriber extends Component {

    constructor(props) {
        super(props);

        this.state = {
            start: false,
            transcribedText: ""
        };
        
        this.PlayPauseClick = this.PlayPauseClick.bind(this);
        this.ResetClick = this.ResetClick.bind(this);
    }

    getAudioEventMessage(buffer) {
        // wrap the audio data in a JSON envelope
        return {
            headers: {
                ':message-type': {
                    type: 'string',
                    value: 'event'
                },
                ':event-type': {
                    type: 'string',
                    value: 'AudioEvent'
                }
            },
            body: buffer
        };
    }    

    convertAudioToBinaryMessage(audioChunk) {
        let raw = mic.toRaw(audioChunk);

        // downsample and convert the raw audio bytes to PCM
        let downsampledBuffer = audioUtils.downsampleBuffer(raw, sampleRate);
        let pcmEncodedBuffer = audioUtils.pcmEncode(downsampledBuffer);
    
        // add the right JSON headers and structure to the message
        let audioEventMessage = this.getAudioEventMessage(Buffer.from(pcmEncodedBuffer));
    
        //convert the JSON object + headers into a binary event stream message
        let binary = eventStreamMarshaller.marshall(audioEventMessage);
    
        return binary;
    }

    handleEventStreamMessage(messageJson) {
        let results = messageJson.Transcript.Results;
    
        if (results.length > 0) {
            if (results[0].Alternatives.length > 0) {
                let transcript = results[0].Alternatives[0].Transcript;
    
                // fix encoding for accented characters
                transcript = decodeURIComponent(escape(transcript));
    
                // update the textarea with the latest result
                transcribedText = transcribedText + transcript + "\n";
                console.log(transcribedText)
    
                // if this transcript segment is final, add it to the overall transcription
                if (!results[0].IsPartial) {
                    //scroll the textarea down
    
                    transcribedText += transcript + "\n";

                }
            }
        }
    }

    wireSocketEvents() {
        // handle inbound messages from Amazon Transcribe
        socket.onmessage = (message) => {
            //convert the binary event stream message to JSON
            let messageWrapper = eventStreamMarshaller.unmarshall(Buffer(message.data));
            let messageBody = JSON.parse(String.fromCharCode.apply(String, messageWrapper.body));
            if (messageWrapper.headers[":message-type"].value === "event") {
                this.handleEventStreamMessage(messageBody);
            }
            else {
                transcribeException = true;
            }
        };

        this.setState({ start: this.state.start, transcribedText: transcribedText });

        socket.onerror = function () {
            socketError = true;
        };
        
        socket.onclose = function (closeEvent) {
            micStream.stop();
        };
    }

    streamAudioToWebSocket(userMediaStream) {
        micStream = new mic();
        micStream.setStream(userMediaStream);

        let endpoint = "transcribestreaming." + region + ".amazonaws.com:8443";
        let url = v4.createPresignedURL(
            'GET',
            endpoint,
            '/stream-transcription-websocket',
            'transcribe',
            crypto.createHash('sha256').update('', 'utf8').digest('hex'), {
                'key': 'AKIAJ5WYTSMRY4DOFK7A',
                'secret': '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',
                'protocol': 'wss',
                'expires': 15,
                'region': region,
                'query': "language-code=" + languageCode + "&media-encoding=pcm&sample-rate=" + sampleRate
            }
        );

        socket = new WebSocket(url);
        socket.binaryType = "arraybuffer";

        socket.onopen = () => {
            micStream.on('data', (rawAudioChunk) => {
                // the audio stream is raw audio bytes. Transcribe expects PCM with additional metadata, encoded as binary
                //let binary = convertAudioToBinaryMessage(rawAudioChunk);
                let raw = mic.toRaw(rawAudioChunk);

                // downsample and convert the raw audio bytes to PCM
                let downsampledBuffer = audioUtils.downsampleBuffer(raw, sampleRate);
                let pcmEncodedBuffer = audioUtils.pcmEncode(downsampledBuffer);
            
                // add the right JSON headers and structure to the message
                let audioEventMessage = this.getAudioEventMessage(Buffer.from(pcmEncodedBuffer));
            
                //convert the JSON object + headers into a binary event stream message
                let binary = eventStreamMarshaller.marshall(audioEventMessage);
    
                try {
                    socket.send(binary);
                } catch(error) {
                    socket.close();
                }
            }
        )};
        
        // handle messages, errors, and close events
        this.wireSocketEvents();

        // handle inbound messages from Amazon Transcribe
        socket.onmessage = (message) => {
            //convert the binary event stream message to JSON
            let messageWrapper = eventStreamMarshaller.unmarshall(Buffer(message.data));
            let messageBody = JSON.parse(String.fromCharCode.apply(String, messageWrapper.body));
            if (messageWrapper.headers[":message-type"].value === "event") {
                this.handleEventStreamMessage(messageBody);
            }
            else {
                transcribeException = true;
                // console.log(messageBody.Message);
            }
        };

        socket.onerror = function () {
            socketError = true;
            console.log('WebSocket connection error. Try again.');
        };

        socket.onclose = function (closeEvent) {
            micStream.stop();
            
            // the close event immediately follows the error event; only handle one.
            if (!socketError && !transcribeException) {
                if (closeEvent.code != 1000) {
                    console.log('</i><strong>Streaming Exception</strong><br>' + closeEvent.reason);
                }
            }
        };
    }

    startGettingTranscription() {
        navigator.mediaDevices.getUserMedia({ video: false, audio: true })
            .then(this.streamAudioToWebSocket.bind(this))        
    }

    PlayPauseClick() {
        if (this.state.start == false) {
            this.setState( { start: true, transcribedText: transcribedText } )
            this.startGettingTranscription();
        } else {
            this.setState( { start: false, transcribedText: transcribedText } )

            if (socket.OPEN) {
                micStream.stop();
        
                // Send an empty frame so that Transcribe initiates a closure of the WebSocket after submitting all transcripts
                let emptyMessage = this.getAudioEventMessage(Buffer.from(new Buffer([])));
                let emptyBuffer = eventStreamMarshaller.marshall(emptyMessage);
                socket.send(emptyBuffer);
            }        
        }
    }

    ResetClick() {
        transcribedText = ""
        this.setState( { start: this.state.start, transcribedText: transcribedText } )

    }


    render() {
        return(
            <div className="Transcriber">
                <div class="PresentationTitle">Hack the 6ix Presentation</div>
                <div><CTA PlayPauseClick={ this.PlayPauseClick } ResetClick={ this.Reset }/></div>
                <div><Statistics start={ this.state.start }/></div>
                <div><TextandFeedback transcribedText={ this.state.transcribedText }/></div>
            </div>
        );
    }

}