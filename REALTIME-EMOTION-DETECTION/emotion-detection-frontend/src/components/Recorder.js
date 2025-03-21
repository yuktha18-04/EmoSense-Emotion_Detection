import { useRef } from "react";

const Recorder = ({ onRecordingComplete, isRecording, setIsRecording, setAudioData }) => {
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);
  const streamRef = useRef(null);
  let chunks = [];

  const startRecording = async () => {
    try {
      console.log("🎤 Starting recording...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      audioContextRef.current = new AudioContext();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      const analyser = audioContextRef.current.createAnalyser();
      sourceRef.current.connect(analyser);
      analyser.fftSize = 256;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Float32Array(bufferLength);
      setIsRecording(true);

      const updateWaveform = () => {
        if (stream.active) {
          analyser.getFloatTimeDomainData(dataArray);
          setAudioData(new Float32Array(dataArray));
          requestAnimationFrame(updateWaveform);
        }
      };
      updateWaveform();

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        console.log("⏹ Recording stopped. Processing audio...");
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        chunks = [];
        onRecordingComplete(audioBlob);
      };

      mediaRecorderRef.current.start();
    } catch (err) {
      console.error("❌ Error starting recording:", err);
    }
  };

  const stopRecording = () => {
    console.log("🛑 Stopping recording...");
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
  };

  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-6 py-3 rounded-xl transition ${
          isRecording
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isRecording ? "⏹ Stop Recording" : "🎤 Start Recording"}
      </button>
    </div>
  );
};

export default Recorder;
