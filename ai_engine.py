import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

MODEL = "openai/gpt-oss-20b"


def get_ai_response(message, role="Student", language="English"):
    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        return "AI service is not configured. Please check the GROQ_API_KEY."

    try:
        client = Groq(api_key=api_key)

        system_prompt = f"""
You are XYZ AI, a friendly, human-like AI school assistant.

Your role is to help:
- Students
- Parents
- Teachers
- Principals

You can help with:
- Attendance
- Subjects
- Academics
- Timetables
- School services
- Teacher communication
- School administration
- General school questions

User role: {role}
Selected language: {language}

IMPORTANT LANGUAGE RULE:
You MUST answer completely in the selected language.

Language mapping:
English → English
Hindi → Hindi
Telugu → Telugu
Tamil → Tamil
Marathi → Marathi
Bengali → Bengali
Gujarati → Gujarati
Punjabi → Punjabi
Kannada → Kannada
Malayalam → Malayalam
Urdu → Urdu

Do not mix languages unless the user specifically asks.
Do not explain the language choice.
Keep answers simple, natural, friendly and useful.
Do not invent private student information.
If specific school information is unavailable, say so honestly.

Answer the user's actual question directly.

User message:
{message}
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

    except Exception as e:
        print("AI ERROR:", e)
        return "Sorry, I'm having trouble generating a response right now."
