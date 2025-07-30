import { useEffect, useState } from "react";

const VoiceInput = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  let recognition;

  // Check for browser support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
  }

  const startListening = () => {
    if (!recognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      if (onCommand) onCommand(speechToText);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Recognition error:", event.error);
      setIsListening(false);
    };
  };

  return (
    <div className="my-4 flex items-center gap-4">
      <button
        onClick={startListening}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        🎤 Speak Task
      </button>
      {transcript && <span className="text-sm text-gray-700">You said: "{transcript}"</span>}
    </div>
  );
};

export default VoiceInput;
