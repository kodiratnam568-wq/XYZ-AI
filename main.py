from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from ai_engine import get_ai_response
from school_data import STUDENTS


app = FastAPI(
    title="XYZ AI",
    description="Human-Like AI School Assistant",
    version="1.0.0"
)


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# HOME
# =========================

@app.get("/")
def home():

    return {
        "success": True,
        "message": "XYZ AI backend is running!"
    }


# =========================
# HEALTH
# =========================

@app.get("/health")
def health():

    return {
        "success": True,
        "status": "healthy"
    }


# =========================
# STUDENTS
# =========================

@app.get("/students")
def get_students():

    return {
        "success": True,
        "data": STUDENTS
    }


# =========================
# FIND STUDENT
# =========================

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


# =========================
# CHAT
# =========================

@app.get("/chat")
def chat(
    message: str,
    role: str = "Student",
    language: str = "English"
):

    student = find_student(message)

    lower_message = message.lower()


    # =========================
    # SCHOOL DATABASE
    # =========================

    attendance_words = [
        "attendance",
        "attendence",
        "absent",
        "present"
    ]


    is_attendance_question = any(
        word in lower_message
        for word in attendance_words
    )


    if student and is_attendance_question:

        reply = (
            f"{student['name']} ({student['roll_number']}) "
            f"has {student['attendance']}% attendance "
            f"in class {student['class_name']}."
        )

        return {
            "success": True,
            "reply": reply,
            "source": "school_database"
        }


    # =========================
    # AI RESPONSE
    # =========================

    try:

        reply = get_ai_response(
            message=message,
            role=role,
            language=language
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
