from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from ai_engine import get_ai_response
from school_data import STUDENTS


app = FastAPI(
    title="XYZ AI",
    description="Human-Like AI School Assistant",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "success": True,
        "message": "XYZ AI backend is running!"
    }


@app.get("/health")
def health():
    return {
        "success": True,
        "status": "healthy"
    }


@app.get("/students")
def get_students():
    return {
        "success": True,
        "data": STUDENTS
    }


def find_student(message):

    message_lower = message.lower()

    for student in STUDENTS:

        if (
            student["name"].lower() in message_lower
            or student["student_id"].lower() in message_lower
            or student["roll_number"].lower() in message_lower
        ):
            return student

    return None


@app.get("/chat")
def chat(
    message: str,
    role: str = "Student",
    language: str = "English"
):

    student = find_student(message)

    lower_message = message.lower()

    # School-data response
    if student and (
        "attendance" in lower_message
        or "attendence" in lower_message
        or "absent" in lower_message
        or "present" in lower_message
    ):

        school_info = (
            f"Student: {student['name']}, "
            f"Roll Number: {student['roll_number']}, "
            f"Attendance: {student['attendance']}%, "
            f"Class: {student['class_name']}."
        )

        try:

            reply = get_ai_response(
                f"""
Give the following school information to the user
in the selected language.

Do not change or invent any information.
Keep it simple and clear.

School information:
{school_info}
""",
                role,
                language
            )

        except Exception as error:

            print("AI ERROR:", error)

            reply = school_info

        return {
            "success": True,
            "reply": reply,
            "source": "school_database"
        }


    # AI response
    try:

        reply = get_ai_response(
            message,
            role,
            language
        )

        return {
            "success": True,
            "reply": reply,
            "source": "XYZ AI"
        }

    except Exception as error:

        print("AI ERROR:", error)

        return {
            "success": False,
            "reply": "I'm having trouble connecting to my AI service right now."
        }
