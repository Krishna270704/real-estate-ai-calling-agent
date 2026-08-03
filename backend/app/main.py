from app.services.summary_service import generate_summary
from fastapi import Request

from app.services.conversation_service import (
    get_history,
    add_message,
)
from app.services.groq_service import ask_groq
from app.services.lead_extraction_service import extract_lead
from app.database.crud import (
    save_lead,
    get_all_leads,
    delete_all_leads
)
from app.database.database import engine
from app.database.models import Base
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="Real Estate AI Calling Agent",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

class ChatRequest(BaseModel):
    session_id: str
    message: str


@app.get("/")
def health():
    return {
        "status": "Backend Running"
    }


@app.post("/chat")
def chat(request: ChatRequest):

    add_message(
        request.session_id,
        "user",
        request.message
    )

    history = get_history(request.session_id)

    reply = ask_groq(history)

    add_message(
        request.session_id,
        "assistant",
        reply
    )

    conversation = "\n".join(
        [f"{msg['role']}: {msg['content']}" for msg in history]
    )

    lead = extract_lead(conversation)

    summary = generate_summary(conversation)

    save_lead(
        lead,
        summary
    )

    return {
    "reply": reply,
    "lead": lead
}   

@app.get("/leads")
def get_leads():

    leads = get_all_leads()

    return leads

@app.delete("/leads")
def delete_leads():

    return delete_all_leads()

@app.post("/webhook")
async def webhook(request: Request):

    data = await request.json()

    print("=" * 50)
    print("Webhook Received")
    print("=" * 50)

    try:
        conversation = data["message"]["artifact"]["transcript"]
        print("Transcript OK")

        lead = extract_lead(conversation)
        print("Lead Extracted:", lead)

        summary = generate_summary(conversation)
        print("Summary Generated")

        save_lead(lead, summary)
        print("Lead Saved")

        print(get_all_leads())

    except Exception:
        import traceback
        traceback.print_exc()

    return {"success": True}