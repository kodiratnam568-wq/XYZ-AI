import { useEffect, useRef, useState } from "react";
import "./App.css";

const API = "https://xyz-ai-wd3c.onrender.com";

function getDemoResponse(text, role, language) {
  const q = text.toLowerCase();

  if (q.includes("attendance")) {
    return `Sure! As a ${role}, I can help you with attendance. Your attendance information can include total classes, classes attended, classes missed, and your current attendance percentage. For your actual school attendance record, please check the school portal or contact the administration.`;
  }

  if (
    q.includes("subject") ||
    q.includes("subjects")
  ) {
    return `XYZ AI can help you with your academic subjects. Common school subjects include Mathematics, Science, English, Social Studies, Computer Science, Languages, and Physical Education. You can ask me about a specific subject and I can explain it in a simple way.`;
  }

  if (
    q.includes("timetable") ||
    q.includes("schedule")
  ) {
    return `I can help you understand your school timetable. A timetable normally contains the subject, teacher, classroom, and time for each period. For the latest school-specific timetable, please check your student portal or school notice board.`;
  }

  if (
    q.includes("teacher") ||
    q.includes("talk to my teacher")
  ) {
    return `Of course! You can contact your teacher through the school portal, official school email, classroom communication system, or during designated teacher office hours. If you need urgent assistance, you can also contact the school administration.`;
  }

  if (
    q.includes("management") ||
    q.includes("principal") ||
    q.includes("school management")
  ) {
    return `You can contact school management through the school office, administration desk, official school portal, or the appropriate school communication channel. XYZ AI can also help you prepare a clear message explaining your concern.`;
  }

  if (
    q.includes("hello") ||
    q.includes("hi") ||
    q.includes("hlo") ||
    q.includes("hey")
  ) {
    return `Hello! 👋 I'm XYZ AI, your school assistant. I can help you with attendance, academics, subjects, timetables, school services, and general school questions.`;
  }

  if (
    q.includes("help") ||
    q.includes("what can you do")
  ) {
    return `I'm XYZ AI, your human-like school assistant. I can help with attendance, subjects, timetables, academic questions, school services, teacher assistance, and management-related queries.`;
  }

  return `Thanks for your question! I'm XYZ AI, your school assistant. I can help you with attendance, subjects, timetables, academics, school services, and connecting you with school staff. Please provide a little more detail about what you need.`;
}

function App() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hello! I'm XYZ AI, your school assistant. How can I help you today?"
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("Student");
  const [language, setLanguage] = useState("English");

  const chatEnd = useRef(null);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);

  async function sendMessage(customMessage = null) {
    const text = (customMessage ?? message).trim();

    if (!text || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text
      }
    ]);

    setMessage("");
    setLoading(true);

    try {
      const url =
        `${API}/chat?message=${encodeURIComponent(text)}` +
        `&role=${encodeURIComponent(role)}` +
        `&language=${encodeURIComponent(language)}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Backend unavailable");
      }

      const data = await response.json();

      const reply = data.reply;

      // If backend returns a proper AI response, use it.
      // If backend returns a configuration/error message,
      // use the built-in demo response instead.
      if (
        reply &&
        !reply.toLowerCase().includes("groq_api_key") &&
        !reply.toLowerCase().includes("ai service is not configured") &&
        !reply.toLowerCase().includes("service is not configured")
      ) {
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            text: reply
          }
        ]);
      } else {
        const demoReply = getDemoResponse(
          text,
          role,
          language
        );

        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            text: demoReply
          }
        ]);
      }
    } catch (error) {
      console.error("XYZ AI backend error:", error);

      // Fallback response so the application remains usable
      // even if the backend is temporarily unavailable.
      const demoReply = getDemoResponse(
        text,
        role,
        language
      );

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: demoReply
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="app">
      <header>
        <div className="brand">
          <div>
            <h1>XYZ AI</h1>
            <p>Human-Like AI School Assistant</p>
          </div>

          <div className="online">
            <span></span>
            Online
          </div>
        </div>
      </header>

      <main>
        <section className="intro">
          <div className="ai-icon">AI</div>

          <h2>Your AI School Assistant</h2>

          <p>
            Ask questions about attendance, academics,
            schedules, school services and more.
          </p>
        </section>

        <div className="quick-actions">
          <button
            onClick={() =>
              sendMessage("I want to know about attendance")
            }
          >
            Attendance
          </button>

          <button
            onClick={() =>
              sendMessage("Tell me about subjects")
            }
          >
            Subjects
          </button>

          <button
            onClick={() =>
              sendMessage("Show me the timetable")
            }
          >
            Timetable
          </button>
        </div>

        <section className="chat">
          {messages.map((item, index) => (
            <div
              className={`message ${item.type}`}
              key={index}
            >
              {item.type === "ai" && (
                <div className="avatar">AI</div>
              )}

              <div className="bubble">
                {item.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="message ai">
              <div className="avatar">AI</div>

              <div className="bubble typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={chatEnd}></div>
        </section>

        <section className="controls">
          <div>
            <label>Your role</label>

            <div className="roles">
              {[
                "Student",
                "Parent",
                "Teacher",
                "Principal"
              ].map((item) => (
                <button
                  key={item}
                  className={
                    role === item ? "selected" : ""
                  }
                  onClick={() => setRole(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="language">
            <label>Language</label>

            <select
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
            >
              {[
                "English",
                "Hindi",
                "Telugu",
                "Tamil",
                "Marathi",
                "Bengali",
                "Gujarati",
                "Punjabi",
                "Kannada",
                "Malayalam",
                "Urdu"
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </section>

        <section className="composer">
          <textarea
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />

          <button
            onClick={() => sendMessage()}
            disabled={loading || !message.trim()}
          >
            {loading ? "..." : "Send"}
          </button>
        </section>

        <div className="hint">
          Press Enter to send
        </div>

        <section className="human-help">
          <h3>Need human help?</h3>

          <p>
            If XYZ AI cannot resolve your issue,
            you can request assistance from school staff.
          </p>

          <div>
            <button
              onClick={() =>
                sendMessage(
                  "I want to talk to my teacher"
                )
              }
            >
              Talk to Teacher
            </button>

            <button
              onClick={() =>
                sendMessage(
                  "I want to contact school management"
                )
              }
            >
              Contact Management
            </button>
          </div>
        </section>
      </main>

      <footer>
        XYZ AI · Human-Like AI School Assistant
      </footer>
    </div>
  );
}

export default App;
