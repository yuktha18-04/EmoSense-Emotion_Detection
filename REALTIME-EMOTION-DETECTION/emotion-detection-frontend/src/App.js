import { useState } from "react";
import Recorder from "./components/Recorder";
import AudioVisualizer from "./components/AudioVisualizer.tsx";
import handleAudioUpload from "./components/AudioAnalyzer"; // ✅ Corrected import

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioData, setAudioData] = useState(new Float32Array(0));
  const [emotionData, setEmotionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRecordingComplete = (blob) => {
    console.log("✅ Recording completed. Blob received:", blob);
    setIsRecording(false);
    setAudioBlob(blob);
  };

  const handleAnalyzeEmotion = () => {
    if (audioBlob) {
      console.log("🧐 Sending audio for analysis...");
      setLoading(true);
      handleAudioUpload(audioBlob, setEmotionData, () => {}, setEmotionData, setLoading);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">
        Real-Time Emotion Detection
      </h1>
    <div className="container">
      <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">
      Voice Emotion Analyzer
      </h2>
      <h4 className="text-3xl font-bold text-center text-blue-500 mb-6">
      Speak into your microphone to detect emotions in real-time
      </h4>
      {/* 🎵 Waveform Visualization */}
      <div className="bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-2xl text-center"></div>
        <AudioVisualizer audioData={audioData} isRecording={isRecording} />
        <Recorder
          onRecordingComplete={handleRecordingComplete}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          setAudioData={setAudioData}
        />

      <button
        onClick={handleAnalyzeEmotion}
        className={`mt-6 px-6 py-3 rounded-xl ${
          audioBlob ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"
        } text-white transition`}
        disabled={!audioBlob || loading}
      >
        {loading ? "⏳ Analyzing..." : "🔍 Start Analyzing"}
      </button>

      {emotionData && emotionData.emotions && emotionData.emotions.length > 0 && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center w-full max-w-lg">
          {/* <h2 className="text-lg font-semibold text-orange-400">🎤 Analysis Result</h2> */}
          {/* <p className="text-sm text-gray-400">Original: {emotionData.originalTranscription}</p>
          <p className="text-sm text-gray-400">Translated: {emotionData.translatedText}</p> */}

          <h3 className="mt-2 flex flex-col items-center text-center">🎤 Detected Emotions:</h3>
          <ul className="mt-2 flex flex-col items-center text-center list-none">
          {emotionData.emotions.map((emo, index) => (
            <li key={index} className="text-lg">
            {emo.label} - <span className="text-green-400">{(emo.score * 100).toFixed(2)}%</span>
            </li>
          ))}
          </ul>
        </div>
       )}
    </div>
    </div>
  );
}

export default App;