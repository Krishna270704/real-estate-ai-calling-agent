import json

from app.services.groq_service import client, MODEL


def extract_lead(conversation: str):

    prompt = f"""
You are an information extraction assistant.

Extract customer information from the following conversation.

Return ONLY valid JSON.

Schema:

{{
"name":"",
"phone":"",
"buy_or_invest":"",
"location":"",
"property_type":"",
"configuration":"",
"budget":"",
"purpose":"",
"timeline":""
}}

Rules:

- Return only JSON.
- No explanation.
- No markdown.
- If a value is missing return empty string.

Conversation:

{conversation}
"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ],
        temperature=0
    )

    content = response.choices[0].message.content.strip()

    if content.startswith("```"):
        content = content.replace("```json", "").replace("```", "").strip()

    return json.loads(content)