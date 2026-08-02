from app.services.groq_service import client, MODEL


def generate_summary(conversation: str):

    prompt = f"""
You are a real estate CRM assistant.

Generate a professional call summary.

Include:

- Customer Name
- Buy or Investment
- Preferred Location
- Property Type
- Configuration
- Budget
- Timeline
- Overall Interest

Keep it under 120 words.

Conversation:

{conversation}
"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    return response.choices[0].message.content