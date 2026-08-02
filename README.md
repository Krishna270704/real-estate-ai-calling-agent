# 🏠 Real Estate AI Calling Agent

AI-powered Real Estate Voice Calling Agent that conducts natural conversations with prospective property buyers, qualifies leads, extracts customer requirements, and generates structured lead summaries.

---

## 🚀 Features

- 🎙️ AI Voice Calling using Vapi
- 🤖 AI Conversation powered by Groq LLM
- 🏡 Real Estate Sales Agent Persona
- 🌐 Supports Hindi, Hinglish, and English
- 📋 Automatic Lead Qualification
- 📝 AI-generated Call Summary
- 💾 Lead Storage using SQLite
- 📊 Modern React Dashboard
- 🔄 Live Lead Refresh
- 🗑️ Delete All Leads

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- CSS
- Vapi Web SDK

### Backend
- FastAPI
- Python
- Groq API

### Database
- SQLite

### AI
- Groq LLM
- Custom Prompt Engineering

### Voice Platform
- Vapi AI

---

## 📂 Project Structure

```
real-estate-ai-calling-agent/

├── backend/
│   ├── app/
│   │   ├── database/
│   │   ├── prompts/
│   │   ├── services/
│   │   └── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## 🎯 Conversation Flow

1. Greet Customer
2. Ask Buy or Investment
3. Collect Property Requirements
4. Answer Customer Questions
5. Handle Interruptions
6. Collect Customer Details
7. Generate Lead Summary
8. Save Lead
9. Display in Dashboard

---

## 🏗️ System Architecture

```
User
   │
   ▼
React Frontend
   │
   ▼
Vapi Voice SDK
   │
   ▼
Groq LLM
   │
   ▼
FastAPI Backend
   ├── Conversation Service
   ├── Lead Extraction
   ├── Summary Generation
   └── SQLite Database
            │
            ▼
Lead Dashboard
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 🔑 Environment Variables

### Backend

```
GROQ_API_KEY=
```

### Frontend

```
VITE_VAPI_PUBLIC_KEY=
VITE_VAPI_ASSISTANT_ID=
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | / | Health Check |
| POST | /chat | Chat with AI |
| GET | /leads | Fetch Leads |
| DELETE | /leads | Delete All Leads |
| POST | /webhook | Receive Voice Call Events |

---

## 📸 Demo

### Dashboard

_Add Screenshot_

### Voice Calling

_Add Screenshot_

### Lead Dashboard

_Add Screenshot_

---

## 🚀 Future Improvements

- PostgreSQL Support
- Authentication
- CRM Integration
- Email Notifications
- Call Analytics
- Multi-Agent Support
- Docker Deployment
- Cloud Storage

---

## ⚠️ Known Limitations

- SQLite is used for demonstration purposes.
- Voice call lead persistence depends on webhook implementation.
- Designed as an interview assignment prototype, not a production-ready system.

---

## 👨‍💻 Author

**Krishna**

B.Tech Artificial Intelligence & Machine Learning

---

## 📄 License

This project is licensed under the MIT License.
