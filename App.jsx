import { useEffect, useRef, useState } from "react";
import "./App.css";

const API = "http://127.0.0.1:8000";

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


    setMessages(prev => [
      ...prev,
      {
        type: "user",
        text: text
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


      setMessages(prev => [
        ...prev,
        {
          type: "ai",
          text: data.reply
        }
      ]);

    }

    catch (error) {

      console.error(error);

      setMessages(prev => [
        ...prev,
        {
          type: "ai",
          text:
            "I couldn't connect to XYZ AI. Please make sure the backend is running."
        }
      ]);

    }

    finally {

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

          <div className="ai-icon">
            AI
          </div>

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

              <div className="avatar">
                AI
              </div>

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
              ].map(item => (

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
              onChange={e =>
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
              ].map(item => (

                <option key={item}>
                  {item}
                </option>

              ))}

            </select>

          </div>

        </section>


        <section className="composer">

          <textarea
            value={message}
            onChange={e =>
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


      <footer>
        XYZ AI · Human-Like AI School Assistant
      </footer>

    </div>

  );
}

export default App;