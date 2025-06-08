"use client"

import { useState } from "react"
import Recorder from "./components/Recorder.tsx"
import AudioVisualizer from "./components/AudioVisualizer.tsx"
import EmotionDisplay from "./components/EmotionDisplay.tsx"
import ParticleBackground from "./components/ParticleBackground.tsx"
import handleAudioUpload from "./components/AudioAnalyzer.js"

type Emotion = {
  label: string
  score: number
}

type EmotionData = {
  emotions: Emotion[]
  [key: string]: any
}

export default function Home() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioData, setAudioData] = useState(new Float32Array(0))
  const [emotionData, setEmotionData] = useState<EmotionData | null>(null)
  const [loading, setLoading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleRecordingComplete = (blob) => {
    console.log("✅ Recording completed. Blob received:", blob)
    setIsRecording(false)
    setAudioBlob(blob)
  }

  const handleAnalyzeEmotion = () => {
    if (audioBlob) {
      console.log("🧐 Sending audio for analysis...")
      setLoading(true)
      setIsAnalyzing(true)
      handleAudioUpload(
        audioBlob,
        setEmotionData,
        () => {},
        setEmotionData,
        (loadingState) => {
          setLoading(loadingState)
          if (!loadingState) setIsAnalyzing(false)
        },
      )
    }
  }

  const resetSession = () => {
    setAudioBlob(null)
    setEmotionData(null)
    setIsAnalyzing(false)
    setLoading(false)
  }

  // Get primary emotion for background color
  const primaryEmotion = emotionData?.emotions?.[0]?.label || "neutral"

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${getEmotionBackground(primaryEmotion)}`}
    >
      <ParticleBackground emotion={primaryEmotion} isActive={isRecording || isAnalyzing} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
            EmoSense
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light">Multilingual Emotion Detection</p>
          <p className="text-sm md:text-base text-gray-400 mt-2">Real-time voice signal analysis</p>
        </div>

        {/* Main Interface */}
        <div className="w-full max-w-4xl mx-auto">
          {/* Audio Visualizer */}
          <div className="mb-8">
            <AudioVisualizer
              audioData={audioData}
              isRecording={isRecording}
              isAnalyzing={isAnalyzing}
              emotion={primaryEmotion}
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center space-y-6">
            <Recorder
              onRecordingComplete={handleRecordingComplete}
              isRecording={isRecording}
              setIsRecording={setIsRecording}
              setAudioData={setAudioData}
            />

            {audioBlob && !isRecording && (
              <div className="flex space-x-4">
                <button
                  onClick={handleAnalyzeEmotion}
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    "🔍 Analyze Emotion"
                  )}
                </button>

                <button
                  onClick={resetSession}
                  className="px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          {/* Emotion Results */}
          {emotionData && <EmotionDisplay emotionData={emotionData} isAnalyzing={isAnalyzing} />}
        </div>
      </div>
      <footer className="absolute bottom-0 w-full text-center p-4 bg-gray-800 text-gray-400">
        <p className="text-sm">© 2025 EmoSense. All rights reserved.</p>
        <p className="text-xs">Built By Sejal Sinha</p> 
      </footer>
    </div>
  )
}

function getEmotionBackground(emotion) {
  const backgrounds = {
    joy: "bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-pink-900/20",
    happiness: "bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-pink-900/20",
    sadness: "bg-gradient-to-br from-blue-900/30 via-indigo-900/30 to-gray-900/30",
    anger: "bg-gradient-to-br from-red-900/30 via-orange-900/30 to-yellow-900/20",
    fear: "bg-gradient-to-br from-purple-900/30 via-gray-900/30 to-black/50",
    surprise: "bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-purple-900/20",
    disgust: "bg-gradient-to-br from-green-900/30 via-yellow-900/20 to-brown-900/30",
    neutral: "bg-gradient-to-br from-gray-900/50 via-slate-900/50 to-black/70",
    love: "bg-gradient-to-br from-pink-900/30 via-rose-900/30 to-red-900/20",
    excitement: "bg-gradient-to-br from-orange-900/20 via-yellow-900/20 to-red-900/20",
    desire: "bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-red-900/20",
    optimism: "bg-gradient-to-br from-green-900/20 via-blue-900/20 to-cyan-900/20",
    approval: "bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20",
    realization: "bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-purple-900/20",
    annoyance: "bg-gradient-to-br from-orange-900/30 via-red-900/30 to-yellow-900/20",
  }

  return backgrounds[emotion] || backgrounds.neutral
}
