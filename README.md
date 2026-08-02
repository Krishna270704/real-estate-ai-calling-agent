# Real Estate AI Calling Agent

AI-powered voice calling system for real estate lead qualification.  
This project combines conversational AI, voice automation, and a modern web dashboard to engage prospective buyers, capture their requirements, and generate structured lead summaries for sales follow-up.

---

## Project Overview

The **Real Estate AI Calling Agent** is designed to automate first-level real estate sales conversations over voice calls.  
It acts as a virtual sales representative that can:

- initiate natural conversations with prospects,
- understand intent (buying vs investment),
- collect property preferences and contact details,
- answer basic customer queries,
- and persist qualified leads to a dashboard for review.

The solution is ideal for teams looking to scale outreach while maintaining consistent qualification quality.

---

## Features

- **AI Voice Calling** powered by Vapi
- **Conversational Intelligence** using Groq LLM
- **Real Estate Sales Persona** optimized for lead qualification
- **Multilingual Support** (Hindi, Hinglish, English)
- **Automated Requirement Collection** (location, budget, property type, etc.)
- **Structured Lead Summaries** generated after each conversation
- **Lead Management Dashboard** (React-based UI)
- **Live Lead Refresh** for near real-time updates
- **Bulk Lead Deletion** for quick dataset reset (demo/testing mode)
- **SQLite Persistence** for lightweight local development

---

## Screenshots

> Replace these placeholders with actual images once available.

### Dashboard
![Dashboard Screenshot Placeholder](./docs/screenshots/dashboard.png)

### Voice Call Session
![Voice Calling Screenshot Placeholder](./docs/screenshots/voice-calling.png)

### Lead Details / Summary View
![Lead Summary Screenshot Placeholder](./docs/screenshots/lead-summary.png)

---

## Architecture

```text
User
  │
  ▼
React Frontend (Dashboard + Voice UI)
  │
  ▼
Vapi Web SDK (Call orchestration)
  │
  ▼
Groq LLM (Conversation + reasoning)
  │
  ▼
FastAPI Backend
  ├── Conversation Orchestration
  ├── Lead Extraction
  ├── Summary Generation
  └── SQLite Storage
         │
         ▼
Lead Dashboard (Review & Management)
```

### High-Level Flow

1. User/prospect engages with the voice assistant.
2. Assistant conducts real estate qualification conversation.
3. Backend processes conversation payloads and extracts structured lead data.
4. Lead summary is generated and persisted.
5. Frontend dashboard displays leads for sales team action.

---

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- Vapi Web SDK

### Backend
- FastAPI
- Python
- Groq API integration

### Database
- SQLite

### AI & Voice
- Groq LLM
- Vapi AI
- Prompt Engineering for domain-specific behavior

---

## Folder Structure

```text
real-estate-ai-calling-agent/
├── backend/
│   ├── app/
│   │   ├── database/
│   │   ├── prompts/
│   │   ├── services/
│   │   └── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

---

## Installation

### 1) Clone the Repository

```bash
git clone https://github.com/Krishna270704/real-estate-ai-calling-agent.git
cd real-estate-ai-calling-agent
```

### 2) Setup Backend

```bash
cd backend
python -m venv venv
```

Activate virtual environment:

- **Windows**
  ```bash
  venv\Scripts\activate
  ```

- **macOS/Linux**
  ```bash
  source venv/bin/activate
  ```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 3) Setup Frontend

```bash
cd ../frontend
npm install
```

---

## Environment Variables

Create environment variable files before running the project.

### Backend (`backend/.env`)

```env
GROQ_API_KEY=your_groq_api_key
```

### Frontend (`frontend/.env`)

```env
VITE_VAPI_PUBLIC_KEY=your_vapi_public_key
VITE_VAPI_ASSISTANT_ID=your_vapi_assistant_id
```

---

## Running Locally

Run backend server:

```bash
cd backend
uvicorn app.main:app --reload
```

Run frontend dev server (new terminal):

```bash
cd frontend
npm run dev
```

Default local URLs (typical):
- Frontend: `http://localhost:5173`
- Backend: `http://127.0.0.1:8000`

---

## Deployment

You can deploy this project using a split frontend/backend strategy.

### Recommended Setup

- **Frontend**: Vercel / Netlify  
- **Backend**: Render / Railway / Fly.io  
- **Database**:  
  - SQLite for demos/prototypes
  - PostgreSQL for production workloads

### Deployment Notes

- Configure all environment variables in your hosting provider.
- Enable CORS on FastAPI for your frontend domain.
- Use webhook URLs accessible from the public internet for Vapi callbacks.
- For production:
  - replace SQLite with PostgreSQL,
  - add authentication/authorization,
  - add request logging and monitoring.

---

## API Endpoints

| Method | Endpoint   | Description                           |
|--------|------------|---------------------------------------|
| GET    | `/`        | Health check                          |
| POST   | `/chat`    | Chat with AI assistant                |
| GET    | `/leads`   | Fetch all captured leads              |
| DELETE | `/leads`   | Delete all leads                      |
| POST   | `/webhook` | Receive voice/call event callbacks    |

---

## Challenges

During development, the key engineering challenges included:

- **Maintaining natural voice conversation flow** while still collecting structured fields.
- **Handling multilingual context switching** (Hindi/Hinglish/English) gracefully.
- **Designing robust prompt behavior** for consistent lead extraction quality.
- **Managing webhook reliability** to ensure no lead data is lost.
- **Balancing response latency** for a real-time conversational experience.
- **Converting unstructured conversation text** into clean, actionable CRM-style summaries.

---

## Future Improvements

- PostgreSQL migration for scalable persistence
- Authentication and role-based access control
- CRM integration (HubSpot, Zoho, Salesforce)
- Automated notifications (email/WhatsApp)
- Conversation analytics and call quality metrics
- Multi-agent specialization (buyer, investor, rental)
- Dockerized deployment workflow
- Cloud object storage for call artifacts/logs
- CI/CD pipeline and automated testing

---

## License

This project is licensed under the **MIT License**.  
See the `LICENSE` file for details.
