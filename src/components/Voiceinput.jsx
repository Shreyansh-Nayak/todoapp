import { useEffect, useState } from "react";

const VoiceInput = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = "en-US";
      setRecognition(recog);
    } else {
      alert("Speech Recognition not supported in this browser");
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (!recognition) return;

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

  const stopListening = () => {
    recognition.stop();
    setIsListening(false);
  };

  return (
    <div className="my-4 flex items-center gap-4">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`px-4 py-2 rounded ${
          isListening ? "bg-red-600" : "bg-blue-600 hover:bg-blue-700"
        } text-white`}
      >
        {isListening ? "🎙️ Listening..." : "🎤 Speak Task"}
      </button>
      {transcript && <span className="text-sm text-gray-700">You said: "{transcript}"</span>}
    </div>
  );
};

export default VoiceInput;
