# XYZ AI 🤖

### Human-Like AI School Assistant

XYZ AI is an AI-powered school assistant designed to help students, parents, teachers, and school administrators interact with school-related information through a simple conversational interface.

The assistant can help with queries related to **attendance, subjects, timetables, academics, school services, and general school assistance**.

---

## 🚀 Overview

Finding school-related information can sometimes require checking multiple sources or contacting different people.

**XYZ AI** provides a single conversational interface where users can ask questions naturally and receive AI-powered assistance.

If the AI cannot resolve a request, users can also choose to seek help from **school staff or management**.

---

## ✨ Features

### 💬 AI Chat Assistant

Users can communicate with XYZ AI using a conversational chat interface.

### 📊 Attendance Assistance

Students can ask questions related to attendance and receive relevant information or guidance.

### 📚 Subject Assistance

XYZ AI can provide information and explanations related to academic subjects.

### 🗓️ Timetable Assistance

Users can ask about timetable-related information.

### 👥 Multiple User Roles

The interface supports different user roles:

* Student
* Parent
* Teacher
* Principal

### 🌐 Multi-Language Support

Users can select from multiple languages:

* English
* Hindi
* Telugu
* Tamil
* Marathi
* Bengali
* Gujarati
* Punjabi
* Kannada
* Malayalam
* Urdu

### 👨‍🏫 Human Assistance

If XYZ AI cannot resolve an issue, users can request additional help from:

* Teacher
* School Management

### ⚡ Quick Actions

The interface provides quick-access options for common school queries such as:

* Attendance
* Subjects
* Timetable

---

## 🧠 How It Works

```text
                User
                  │
                  ▼
          ┌───────────────┐
          │   XYZ AI UI   │
          └───────┬───────┘
                  │
                  ▼
          ┌───────────────┐
          │ React Frontend│
          └───────┬───────┘
                  │
                  ▼
          ┌───────────────┐
          │ FastAPI Backend│
          └───────┬───────┘
                  │
          ┌───────┴────────┐
          ▼                ▼
     AI Engine        School Data
          │                │
          └───────┬────────┘
                  ▼
             AI Response
                  │
                  ▼
                User
```

---

## 🛠️ Technology Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Python
* FastAPI
* Uvicorn

### AI

* AI-powered response generation
* School-specific data processing

### Development

* Git
* GitHub
* VS Code

---

## 📁 Project Structure

```text
XYZ-AI/
│
├── App.jsx
├── App.css
├── index.css
├── main.jsx
├── index.html
├── vite.config.js
├── package.json
├── package-lock.json
│
├── main.py
├── ai_engine.py
├── school_data.py
├── requirements.txt
│
└── README.md
```

---

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/kodiratnam568-wq/XYZ-AI.git
cd XYZ-AI
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

### 4. Install backend dependencies

Create a Python virtual environment:

```bash
python -m venv venv
```

On Windows:

```bash
venv\Scripts\activate
```

Install the required packages:

```bash
pip install -r requirements.txt
```

### 5. Start the backend

```bash
uvicorn main:app --reload
```

The backend will run locally at:

```text
http://127.0.0.1:8000
```

---

## 🌐 Deployment

XYZ AI uses a separate frontend and backend architecture.

### Frontend

The React/Vite frontend can be deployed using:

**Vercel**

### Backend

The Python/FastAPI backend can be deployed using:

**Render**

After deployment, the frontend should be configured to communicate with the deployed backend API instead of the local development server.

---

## 🔐 Security

API keys and other sensitive credentials should be stored using environment variables.

Do not commit private API keys, passwords, or other secrets to the GitHub repository.

Example:

```text
AI_API_KEY=your_api_key_here
```

---

## 🎯 Project Vision

The goal of XYZ AI is to create a **human-like digital school assistant** that makes school information easier to access and reduces the need for students and parents to search through multiple systems or contact staff for routine questions.

The platform is designed to bring **AI assistance and human support together** in one place.

---

## 🔮 Future Improvements

* 🌙 Light/Dark mode
* 📊 Personalized attendance dashboard
* 📅 Real-time timetable integration
* 🔔 School notifications
* 📚 Personalized academic assistance
* 👨‍🏫 Direct teacher communication
* 🏫 School management dashboard
* 🔐 Secure user authentication
* 🗣️ Voice-based AI interaction
* 🌐 Improved multilingual conversations
* 📱 Mobile-friendly/PWA experience
* 🧠 Advanced school-specific AI knowledge base

---

## 📌 Project Status

🚧 **Under Development**

XYZ AI is currently being developed as an AI-powered school assistance platform and is being prepared for public deployment.

---

## 👩‍💻 Developer

**Kodi Rushitha**

B.Tech — Electronics and Communication Engineering

Interested in **Artificial Intelligence, Generative AI, Python, and AI-powered applications**.

