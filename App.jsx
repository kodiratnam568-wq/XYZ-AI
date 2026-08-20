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

    const userMessage = text.trim();

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const url =
        `${API_URL}/chat` +
        `?message=${encodeURIComponent(userMessage)}` +
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
            "Sorry, I couldn't generate a response right now.",
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

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
      <header className="header">
        <div>
          <h1>XYZ AI</h1>
          <p>Human-Like AI School Assistant</p>
        </div>

        <span className="online">
          <span className="dot"></span>
          Online
        </span>
      </header>

      <main className="container">
        <section className="hero">
          <div className="ai-icon">✦</div>

          <h2>Your AI School Assistant</h2>

          <p>
            Ask questions about attendance, academics, schedules,
            school services and more.
          </p>

          <div className="quick-buttons">
            <button
              onClick={() =>
                sendMessage("I want to know about attendance")
              }
            >
              Attendance
            </button>

            <button
              onClick={() =>
                sendMessage("Tell me about my subjects")
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

        <section className="chat-box">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === "user" ? "user-message" : "ai-message"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="small-ai">AI</div>
                )}

                <div className="message-text">{msg.text}</div>
              </div>
            ))}

            {loading && (
              <div className="message ai-message">
                <div className="small-ai">AI</div>
                <div className="message-text">Thinking...</div>
              </div>
            )}
          </div>

          <div className="controls">
            <div className="control-group">
              <label>Your role</label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>Student</option>
                <option>Parent</option>
                <option>Teacher</option>
                <option>Principal</option>
              </select>
            </div>

            <div className="control-group">
              <label>Language</label>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Telugu</option>
                <option>Tamil</option>
                <option>Marathi</option>
                <option>Bengali</option>
                <option>Gujarati</option>
                <option>Punjabi</option>
                <option>Kannada</option>
                <option>Malayalam</option>
                <option>Urdu</option>
              </select>
            </div>
          </div>

          <div className="input-area">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              rows="2"
            />

            <button
              className="send-button"
              onClick={() => sendMessage()}
              disabled={loading || !message.trim()}
            >
              Send
            </button>
          </div>

          <p className="enter-text">
            Press Enter to send
          </p>
        </section>

        <section className="human-help">
          <h3>Need human help?</h3>

          <p>
            If XYZ AI cannot resolve your issue, you can request
            assistance from school staff.
          </p>

          <div className="help-buttons">
            <button onClick={() => sendMessage("I want to talk to my teacher")}>
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

      <footer>
        XYZ AI · Human-Like AI School Assistant
      </footer>
    </div>
  );
}

export default App;
