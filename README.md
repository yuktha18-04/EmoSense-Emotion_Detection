# 🎤EmoSense: A Real-Time Multilingual Emotion Detection from Speech Signals

## 📌 Overview
This project is a real-time emotion detection system that analyzes emotions from voice inputs using a combination of Flask (Python) and Node.js for backend processing, and React.js for frontend visualization. It supports multilingual speech, automatically transcribes and translates audio, and classifies emotions using a RoBERTa-based transformer model.

---

![WhatsApp Image 2025-05-27 at 11 22 41_964c7949](https://github.com/user-attachments/assets/b89c7a16-c565-486f-8fc6-6e5bd711b636)

![WhatsApp Image 2025-05-27 at 11 22 49_9ed344bb](https://github.com/user-attachments/assets/b36ef351-10f7-40b2-a75a-c853a2b74ca1)

![WhatsApp Image 2025-05-27 at 11 23 00_aa8ac564](https://github.com/user-attachments/assets/aa77d34e-643c-4ac2-bdd8-9357365f0041)



## 🚀 Key Features
- 🎙 **Speech-to-Text**: Converts recorded audio into text using Google Speech Recognition.
- 🌍 **Multilingual Translation**: Detects and translates non-English text to English via Google Translate API.
- 🤖 **Emotion Detection**: Utilizes the `roberta-base-go_emotions` model for accurate emotion classification with confidence scores.
- 🖥 **Interactive Dashboard**: Real-time visualization of detected emotions in a responsive UI.
- ⚡ **Instant Feedback**: Uploads and processes audio with near real-time response.

---

## 🛠 Tech Stack
- **Backend**: Flask (Python), Node.js (Express), Google Speech Recognition, Google Translate API, Hugging Face Transformers
- **Frontend**: React.js, Tailwind CSS, TypeScript
- **Deployment**: Modular architecture — Flask (emotion analysis), Node.js (API routing), React (UI)

---

## 📁 Project Structure
```bash
Emotion-Detection-Voice/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── index.js
│   ├── flask_api/
│   │   └── emotion.py
│   ├── uploads/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
├── README.md
└── .gitignore

