import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import { start } from "repl";

interface TranscriptMessage {
    role: "user" | "assistant"
    text: string;
};

export const useVapi = () => {
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

    useEffect(()=> {
        const vapiInstance =  new Vapi("98ff23e3-54e6-4763-9f7c-8eecae3df0a0");
        setVapi(vapiInstance);

        vapiInstance.on("call-start", ()=> {
            setIsConnected(true);
            setIsConnecting(false);
            setTranscript([]); 
        });


        vapiInstance.on("call-end", ()=> {
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
        });

        vapiInstance.on("speech-start", ()=> {
            setIsSpeaking(true);
        });

        vapiInstance.on("speech-end", ()=> {
            setIsSpeaking(false);
        });

        vapiInstance.on("error", (error)=> {
            console.log(error, "VAPI ERROR");
            setIsConnecting(true);
        });

        vapiInstance.on("message", (message) => {
            if(message.type == "transcript" && message.transcriptType == "final"){
                setTranscript((prev) => [
                    ...prev,
                    {
                        role: message.role =="user"? "user" :"assistant",
                        text: message.transcript,
                    }
                ]);
            }
        });

        return() => {
            vapiInstance?.stop();
        }

    }, []);

    const startCall = () => {
        setIsConnecting(true);
        if(vapi){
            vapi.start("d80744b1-49d3-4e3d-8905-e5f4ae233036");
        }
    }

    const endCall = () => {
        if(vapi){
            vapi.stop();
        }
    }

    return{
        isSpeaking,
        isConnected,
        isConnecting,
        transcript,
        startCall,
        endCall,
    }
};