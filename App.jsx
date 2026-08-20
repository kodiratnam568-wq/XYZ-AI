import React, { useState } from "react";
import "./App.css";

const API_URL = "https://xyz-ai-backend-z1ny.onrender.com";

function App() {
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("Student");
  const [language, setLanguage] = useState("English");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I'm XYZ AI, your school assistant. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text = message) => {
    if (!text.trim() || loading) return;

    const userText = text.trim();

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userText,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      // IMPORTANT:
      // Send BOTH selected role and selected language to backend
      const url =
        `${API_URL}/chat` +
        `?message=${encodeURIComponent(userText)}` +
        `&role=${encodeURIComponent(role)}` +
        `&language=${encodeURIComponent(language)}`;

      const response = await fetch(url);
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            data.reply ||
            "Sorry, I'm having trouble generating a response right now.",
        },
      ]);
    } catch (error) {
      console.error("Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, I'm having trouble connecting to XYZ AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div>
          <h1>XYZ AI</h1>
          <p>Human-Like AI School Assistant</p>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          Online
        </div>
      </header>

      {/* MAIN */}
      <main className="main-container">

        {/* AI INTRO */}
        <section className="intro">
          <div className="ai-badge">✦</div>

          <h2>Your AI School Assistant</h2>

          <p>
            Ask questions about attendance, academics, schedules,
            school services and more.
          </p>

          {/* QUICK BUTTONS */}
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
        </section>

        {/* CHAT */}
        <section className="chat-container">

          <div className="messages">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "message user"
                    : "message ai"
                }
              >

                {msg.sender === "ai" && (
                  <div className="ai-label">AI</div>
                )}

                <div className="message-content">
                  {msg.text}
                </div>

              </div>
            ))}

            {loading && (
              <div className="message ai">

                <div className="ai-label">AI</div>

                <div className="message-content">
                  Thinking...
                </div>

              </div>
            )}

          </div>

          {/* ROLE */}
          <div className="selection-row">

            <div className="selection">

              <label>Your role</label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Student">Student</option>
                <option value="Parent">Parent</option>
                <option value="Teacher">Teacher</option>
                <option value="Principal">Principal</option>
              </select>

            </div>

            {/* LANGUAGE */}
            <div className="selection">

              <label>Language</label>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Telugu">Telugu</option>
                <option value="Tamil">Tamil</option>
                <option value="Marathi">Marathi</option>
                <option value="Bengali">Bengali</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Kannada">Kannada</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Urdu">Urdu</option>
              </select>

            </div>

          </div>

          {/* INPUT */}
          <div className="input-container">

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
            />

            <button
              onClick={() => sendMessage()}
              disabled={loading || !message.trim()}
            >
              Send
            </button>

          </div>

          <div className="enter-hint">
            Press Enter to send
          </div>

        </section>

        {/* HUMAN HELP */}
        <section className="human-help">

          <h3>Need human help?</h3>

          <p>
            If XYZ AI cannot resolve your issue, you can request
            assistance from school staff.
          </p>

          <div className="help-actions">

            <button
              onClick={() =>
                sendMessage("I want to talk to my teacher")
              }
            >
              Talk to Teacher
            </button>

            <button
              onClick={() =>
                sendMessage("I want to contact school management")
              }
            >
              Contact Management
            </button>

          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer>
        XYZ AI · Human-Like AI School Assistant
      </footer>

    </div>
  );
}

export default App;
