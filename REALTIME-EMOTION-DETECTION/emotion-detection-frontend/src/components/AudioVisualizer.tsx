import * as React from "react";
import { useRef, useEffect } from "react";

interface AudioVisualizerProps {
  audioData: Float32Array;
  isRecording: boolean;
}

export default function AudioVisualizer({ audioData, isRecording }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Function to draw the waveform
    const drawWaveform = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      if (!isRecording || audioData.length === 0) {
        // Draw a straight line when not recording
        ctx.beginPath();
        ctx.moveTo(0, rect.height / 2);
        ctx.lineTo(rect.width, rect.height / 2);
        ctx.strokeStyle = "#ccc";
        ctx.lineWidth = 2;
        ctx.stroke();
        return;
      }

      const sliceWidth = rect.width / audioData.length;
      ctx.beginPath();
      ctx.strokeStyle = "#3b82f6"; // Blue color for active waveform
      ctx.lineWidth = 2;

      let x = 0;
      for (let i = 0; i < audioData.length; i++) {
        const v = audioData[i];
        const y = ((v + 1) / 2) * rect.height;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      ctx.stroke();

      // Keep updating only if recording
      if (isRecording) {
        animationRef.current = requestAnimationFrame(drawWaveform);
      }
    };

    if (isRecording) {
      drawWaveform(); // Start animation when recording
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioData, isRecording]);

  return <canvas ref={canvasRef} className="w-full h-40 bg-gray-100 rounded-lg" />;
}
