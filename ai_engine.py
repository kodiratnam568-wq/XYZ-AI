from groq import Groq
import os


def generate_response(message, role="Student", language="English"):
    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        return "AI service is not configured. Please check the GROQ_API_KEY."

    client = Groq(api_key=api_key)

    prompt = f"""
You are XYZ AI, a friendly and helpful AI school assistant.

Your job is to help students, parents, teachers, and principals with:
- Attendance
- Subjects
- Academics
- Timetables
- School services
- Teacher communication
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

Do not explain the language choice.
Do not mix languages unless the user specifically asks for it.
Keep the answer simple, natural, friendly, and useful for a school environment.

User message:
{message}
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": prompt
                },
                {
                    "role": "user",
                    "content": message
                }
            ],
            temperature=0.4,
            max_tokens=500
        )

        return response.choices[0].message.content

    except Exception as e:
        print("AI Error:", e)
        return "Sorry, I'm having trouble generating a response right now."
