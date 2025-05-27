# 🎤 Real-Time MULTILINGUAL Emotion Detection from Speech Signals

## 📌 Project Overview
This project is a *Real-Time Emotion Detection System* that analyzes emotions from voice recordings using *Flask (Python) & Node.js* for backend processing and *React.js* for frontend visualization. The system transcribes audio, translates non-English text, and classifies emotions using a pre-trained *RoBERTa-based model*.

## 🚀 Features
- 🎙 *Speech to Text*: Converts voice recordings to text using Google Speech Recognition.
- 🌍 *Multilingual Support*: Detects and translates non-English text to English using Google Translate.
- 🤖 *Emotion Analysis*: Uses the roberta-base-go_emotions model to classify emotions with confidence scores.
- 🖥 *Frontend Dashboard*: Displays detected emotions in an intuitive UI.
- 🔄 *Real-time Processing*: Uploads audio files, processes them, and returns results instantly.

## 🛠 Tech Stack
- *Backend*: Flask (Python), Node.js (Express), Google Speech Recognition, Google Translate API, Hugging Face Transformers
- *Frontend*: React.js, Tailwind CSS, TypeScript (for some components)
- *Deployment*: Flask API (Backend), React (Frontend), GitHub

## 📂 Project Structure

📦 Emotion-Detection-Voice
├── backend/ (Node.js & Flask API)
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── audiocontroller.js
│   │   ├── routes/
│   │   │   ├── audioroutes.js
│   │   │   ├── musicroutes.js
│   │   ├── index.js (Backend entry point)
│   ├── flask_api/
│   │   ├── emotion.py (Emotion classification logic)
│   ├── uploads/ (Stores audio files temporarily)
│   ├── .env (Environment variables)
│   ├── package.json (Node.js dependencies)
├── frontend/ (React.js UI)
│   ├── src/
│   │   ├── components/
│   │   │   ├── AudioAnalyzer.js
│   │   │   ├── AudioVisualizer.tsx
│   │   │   ├── EmotionResult.js
│   │   │   ├── EmotionTrends.js
│   │   │   ├── Recorder.js
│   │   │   ├── StopRecordingButton.tsx
│   │   ├── App.js (Main app logic)
│   ├── public/
│   ├── package.json (React dependencies)
│   ├── index.js (React entry point)
├── README.md (Project Documentation)


## 🔧 Setup & Installation
### 1️⃣ Clone the Repository
sh
git clone https://github.com/your-username/your-repo-name.git
cd Emotion-Detection-Voice


### 2️⃣ Backend Setup (Node.js & Flask API)
sh
cd backend
# Setup Node.js backend
npm install
npm start  # Run Express server

# Setup Flask API
cd flask_api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python emotion.py  # Run Flask server


### 3️⃣ Frontend Setup (React.js)
sh
cd frontend
npm install
npm start  # Run React UI


## 🎯 API Endpoints
### 🎙 Upload Audio for Emotion Detection
*Endpoint:* POST /predict
*Request:* Upload an audio file as FormData
*Response:*
json
{
  "original_transcription": "I'm feeling very happy today!",
  "translated_text": "I'm feeling very happy today!",
  "emotions": [
    { "label": "joy", "score": 0.98 },
    { "label": "optimism", "score": 0.75 },
    { "label": "love", "score": 0.68 }
  ]
}


## 🛠 Deployment (GitHub)
### Push to GitHub
sh
git add .
git commit -m "Initial commit - Flask & Node.js emotion detection with React"
git branch -M main
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main


