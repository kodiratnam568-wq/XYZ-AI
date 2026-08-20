import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

client = Groq(api_key=api_key) if api_key else None

MODEL = "openai/gpt-oss-20b"


def get_ai_response(message, role="Student", language="English"):

    if not client:
        return "AI service is not configured. Please check the GROQ_API_KEY."

    system_prompt = f"""
You are XYZ AI, a human-like school assistant.

User role: {role}
Preferred language: {language}

Help with:
- attendance
- academics
- subjects
- timetable
- school services
- teachers
- school administration
- general school questions

Be friendly, clear and concise.

Do not invent private student information.
If specific school data is unavailable, say so honestly.

Answer the user's actual question directly.
"""

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": message
            }
        ],
        temperature=0.3,
        max_tokens=400
    )

    return response.choices[0].message.content.strip()