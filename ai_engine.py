from groq import Groq
import os


LANGUAGE_NAMES = {
    "English": "English",
    "Hindi": "Hindi",
    "Telugu": "Telugu",
    "Tamil": "Tamil",
    "Marathi": "Marathi",
    "Bengali": "Bengali",
    "Gujarati": "Gujarati",
    "Punjabi": "Punjabi",
    "Kannada": "Kannada",
    "Malayalam": "Malayalam",
    "Urdu": "Urdu"
}


def get_ai_response(message, role="Student", language="English"):

    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        return "AI service is not configured. Please check the GROQ_API_KEY."

    client = Groq(api_key=api_key)

    selected_language = LANGUAGE_NAMES.get(language, "English")

    system_prompt = f"""
You are XYZ AI, a friendly AI school assistant.

You help students, parents, teachers and principals with:
- Attendance
- Subjects
- Academics
- Timetables
- School services
- Teacher communication
- General school questions

USER ROLE:
{role}

OUTPUT LANGUAGE:
{selected_language}

VERY IMPORTANT:
The user may type their question in ANY language.

You MUST answer ONLY in the selected OUTPUT LANGUAGE: {selected_language}.

The selected language has higher priority than the language used in the user's message.

Examples:

If the user says:
"I want to know about attendance"
and selected language is Telugu,
answer completely in Telugu.

If the user says:
"naku attendance kavali"
and selected language is English,
answer completely in English.

If the user says:
"Tell me about subjects"
and selected language is Hindi,
answer completely in Hindi.

If the user says:
"hello"
and selected language is Telugu,
greet the user in Telugu.

Do NOT mix languages.

Do NOT explain that you are translating.

Do NOT mention the selected language.

Keep answers simple, natural, friendly and useful.

If the question is a normal school question, answer it directly.

If exact school data is unavailable, clearly say that the user should check the school portal or contact school staff.

USER MESSAGE:
{message}
"""

    try:

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
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
            temperature=0.2,
            max_tokens=500
        )

        return response.choices[0].message.content.strip()

    except Exception as error:

        print("AI ERROR:", error)

        return "Sorry, I'm having trouble generating a response right now."
