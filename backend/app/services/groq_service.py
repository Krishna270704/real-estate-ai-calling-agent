import os
from pathlib import Path

from dotenv import load_dotenv
from groq import Groq
from app.prompts.system_prompt import SYSTEM_PROMPT

# Load .env from backend folder
env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(dotenv_path=env_path)

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

MODEL = os.getenv("MODEL_NAME")


def ask_groq(messages: list) -> str:

    chat_messages = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT
        }
    ]

    chat_messages.extend(messages)

    response = client.chat.completions.create(
        model=MODEL,
        messages=chat_messages,
        temperature=0.7
    )

    return response.choices[0].message.content