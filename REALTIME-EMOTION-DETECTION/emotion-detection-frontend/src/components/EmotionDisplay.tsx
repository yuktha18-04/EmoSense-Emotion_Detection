"use client"

import { useEffect, useState } from "react"

interface EmotionData {
  emotions: Array<{
    label: string
    score: number
  }>
  original_transcription?: string
  translated_text?: string
}

interface EmotionDisplayProps {
  emotionData: EmotionData
  isAnalyzing: boolean
}

export default function EmotionDisplay({ emotionData, isAnalyzing }: EmotionDisplayProps) {
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (emotionData && !isAnalyzing) {
      setTimeout(() => setShowResults(true), 500)
    } else {
      setShowResults(false)
    }
  }, [emotionData, isAnalyzing])

  if (!emotionData) return null

  const primaryEmotion = emotionData.emotions[0]
  const getEmotionEmoji = (emotion: string) => {
    const emojis = {
      joy: "😊",
      happiness: "😄",
      sadness: "😢",
      anger: "😠",
      fear: "😨",
      surprise: "😲",
      disgust: "🤢",
      neutral: "😐",
      love: "❤️",
      excitement: "🤩",
      desire: "😍",
      optimism: "🌟",
      approval: "👍",
      realization: "💡",
      annoyance: "😤",
    }
    return emojis[emotion as keyof typeof emojis] || "🎭"
  }

  const getEmotionColor = (emotion: string) => {
    const colors = {
      joy: "from-yellow-400 to-orange-400",
      happiness: "from-yellow-400 to-orange-400",
      sadness: "from-blue-400 to-indigo-400",
      anger: "from-red-400 to-orange-400",
      fear: "from-purple-400 to-gray-400",
      surprise: "from-cyan-400 to-blue-400",
      disgust: "from-green-400 to-yellow-400",
      neutral: "from-gray-400 to-slate-400",
      love: "from-pink-400 to-red-400",
      excitement: "from-orange-400 to-yellow-400",
      desire: "from-purple-400 to-pink-400",
      optimism: "from-green-400 to-cyan-400",
      approval: "from-green-400 to-emerald-400",
      realization: "from-blue-400 to-purple-400",
      annoyance: "from-orange-400 to-red-400",
    }
    return colors[emotion as keyof typeof colors] || colors.neutral
  }

  return (
    <div
      className={`mt-8 transition-all duration-1000 ${showResults ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Primary Emotion Display */}
      <div className="text-center mb-8">
        <div
          className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br ${getEmotionColor(primaryEmotion.label)} mb-4 animate-pulse`}
        >
          <span className="text-6xl">{getEmotionEmoji(primaryEmotion.label)}</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-2 capitalize">{primaryEmotion.label}</h2>
        <p className="text-xl text-gray-300">{(primaryEmotion.score * 100).toFixed(1)}% confidence</p>
      </div>

      {/* All Emotions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {emotionData.emotions.slice(0, 3).map((emotion, index) => (
          <div
            key={emotion.label}
            className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-500 hover:scale-105 ${
              index === 0 ? "ring-2 ring-white/30" : ""
            }`}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">{getEmotionEmoji(emotion.label)}</div>
              <h3 className="text-xl font-semibold text-white capitalize mb-2">{emotion.label}</h3>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${getEmotionColor(emotion.label)} transition-all duration-1000`}
                  style={{ width: `${emotion.score * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-300">{(emotion.score * 100).toFixed(1)}%</p>
            </div>
          </div>
        ))}
      </div>

      {/* Transcription and Translation */}
      {(emotionData.original_transcription || emotionData.translated_text) && (
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">🎤</span>
            Voice Analysis
          </h3>

          {emotionData.original_transcription && (
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Original Transcription:</p>
              <p className="text-white bg-white/5 rounded-lg p-3 border border-white/10">
                "{emotionData.original_transcription}"
              </p>
            </div>
          )}

          {emotionData.translated_text && emotionData.translated_text !== emotionData.original_transcription && (
            <div>
              <p className="text-sm text-gray-400 mb-1">Translation:</p>
              <p className="text-white bg-white/5 rounded-lg p-3 border border-white/10">
                "{emotionData.translated_text}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
