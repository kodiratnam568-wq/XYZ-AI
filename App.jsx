import { useEffect, useRef, useState } from "react";
import "./App.css";

const API = "https://xyz-ai-backend-z1ny.onrender.com";

function getDemoResponse(text, role, language) {
  const q = text.toLowerCase();

  const responses = {
    English: {
      attendance: `Sure! As a ${role}, I can help you with attendance. Your attendance information can include total classes, classes attended, classes missed, and your current attendance percentage. For your actual school attendance record, please check the school portal or contact the administration.`,
      subjects: `XYZ AI can help you with your academic subjects. Common school subjects include Mathematics, Science, English, Social Studies, Computer Science, Languages, and Physical Education. You can ask me about a specific subject and I can explain it in a simple way.`,
      timetable: `I can help you understand your school timetable. A timetable normally contains the subject, teacher, classroom, and time for each period. For the latest school-specific timetable, please check your student portal or school notice board.`,
      teacher: `Of course! You can contact your teacher through the school portal, official school email, classroom communication system, or during designated teacher office hours.`,
      management: `You can contact school management through the school office, administration desk, official school portal, or the appropriate school communication channel.`,
      hello: `Hello! 👋 I'm XYZ AI, your school assistant. I can help you with attendance, academics, subjects, timetables, school services, and general school questions.`,
      help: `I'm XYZ AI, your human-like school assistant. I can help with attendance, subjects, timetables, academic questions, school services, teacher assistance, and management-related queries.`,
      default: `Thanks for your question! I'm XYZ AI, your school assistant. I can help you with attendance, subjects, timetables, academics, school services, and connecting you with school staff. Please provide a little more detail about what you need.`
    },

    Telugu: {
      attendance: `తప్పకుండా! ${role}గా, నేను మీ హాజరు గురించి సహాయం చేయగలను. మీ హాజరు వివరాల్లో మొత్తం తరగతులు, హాజరైన తరగతులు, గైర్హాజరైన తరగతులు మరియు ప్రస్తుత హాజరు శాతం ఉంటాయి. మీ నిజమైన హాజరు వివరాల కోసం పాఠశాల పోర్టల్ లేదా పరిపాలన కార్యాలయాన్ని చూడండి.`,
      subjects: `XYZ AI మీ విద్యా విషయాలలో సహాయం చేయగలదు. సాధారణ పాఠశాల విషయాలలో గణితం, సైన్స్, ఇంగ్లీష్, సోషల్ స్టడీస్, కంప్యూటర్ సైన్స్, భాషలు మరియు ఫిజికల్ ఎడ్యుకేషన్ ఉన్నాయి. మీరు ఏదైనా నిర్దిష్ట విషయం గురించి అడగవచ్చు.`,
      timetable: `మీ పాఠశాల టైమ్‌టేబుల్‌ను అర్థం చేసుకోవడంలో నేను సహాయం చేయగలను. టైమ్‌టేబుల్‌లో సాధారణంగా విషయం, ఉపాధ్యాయుడు, తరగతి గది మరియు ప్రతి పీరియడ్ సమయం ఉంటాయి. తాజా టైమ్‌టేబుల్ కోసం మీ విద్యార్థి పోర్టల్ లేదా పాఠశాల నోటీస్ బోర్డును చూడండి.`,
      teacher: `తప్పకుండా! మీరు పాఠశాల పోర్టల్, అధికారిక పాఠశాల ఇమెయిల్ లేదా తరగతి కమ్యూనికేషన్ వ్యవస్థ ద్వారా మీ ఉపాధ్యాయుడిని సంప్రదించవచ్చు.`,
      management: `మీరు పాఠశాల కార్యాలయం, పరిపాలన డెస్క్, అధికారిక పాఠశాల పోర్టల్ లేదా సంబంధిత కమ్యూనికేషన్ ఛానల్ ద్వారా పాఠశాల యాజమాన్యాన్ని సంప్రదించవచ్చు.`,
      hello: `హలో! 👋 నేను XYZ AI, మీ పాఠశాల సహాయకుడిని. హాజరు, విద్య, విషయాలు, టైమ్‌టేబుల్, పాఠశాల సేవలు మరియు సాధారణ ప్రశ్నలలో నేను మీకు సహాయం చేయగలను.`,
      help: `నేను XYZ AI, మీ హ్యూమన్-లైక్ పాఠశాల సహాయకుడిని. హాజరు, విషయాలు, టైమ్‌టేబుల్, విద్యా ప్రశ్నలు, పాఠశాల సేవలు, ఉపాధ్యాయులు మరియు యాజమాన్యానికి సంబంధించిన ప్రశ్నలలో సహాయం చేయగలను.`,
      default: `మీ ప్రశ్నకు ధన్యవాదాలు! నేను XYZ AI, మీ పాఠశాల సహాయకుడిని. హాజరు, విషయాలు, టైమ్‌టేబుల్, విద్య మరియు పాఠశాల సేవల గురించి సహాయం చేయగలను. దయచేసి మీ ప్రశ్నను కొంచెం వివరంగా చెప్పండి.`
    },

    Hindi: {
      attendance: `ज़रूर! ${role} के रूप में, मैं आपकी उपस्थिति के बारे में मदद कर सकता हूँ। आपकी उपस्थिति में कुल कक्षाएँ, उपस्थित कक्षाएँ, अनुपस्थित कक्षाएँ और वर्तमान उपस्थिति प्रतिशत शामिल हो सकते हैं। वास्तविक जानकारी के लिए स्कूल पोर्टल या प्रशासन से संपर्क करें।`,
      subjects: `XYZ AI आपके शैक्षणिक विषयों में मदद कर सकता है। सामान्य विषयों में गणित, विज्ञान, अंग्रेज़ी, सामाजिक अध्ययन, कंप्यूटर विज्ञान और भाषाएँ शामिल हैं।`,
      timetable: `मैं आपके स्कूल के टाइमटेबल को समझने में मदद कर सकता हूँ। इसमें आमतौर पर विषय, शिक्षक, कक्षा और प्रत्येक पीरियड का समय होता है।`,
      teacher: `बिल्कुल! आप स्कूल पोर्टल, आधिकारिक ईमेल या स्कूल की संचार प्रणाली के माध्यम से अपने शिक्षक से संपर्क कर सकते हैं।`,
      management: `आप स्कूल कार्यालय, प्रशासन डेस्क या आधिकारिक स्कूल पोर्टल के माध्यम से स्कूल प्रबंधन से संपर्क कर सकते हैं।`,
      hello: `नमस्ते! 👋 मैं XYZ AI, आपका स्कूल सहायक हूँ। मैं उपस्थिति, पढ़ाई, विषय, टाइमटेबल और स्कूल सेवाओं में मदद कर सकता हूँ।`,
      help: `मैं XYZ AI, आपका ह्यूमन-लाइक स्कूल सहायक हूँ। मैं उपस्थिति, विषय, टाइमटेबल, पढ़ाई और स्कूल सेवाओं से जुड़े प्रश्नों में मदद कर सकता हूँ।`,
      default: `आपके प्रश्न के लिए धन्यवाद! मैं XYZ AI, आपका स्कूल सहायक हूँ। कृपया अपने प्रश्न के बारे में थोड़ा और विवरण दें।`
    },

    Tamil: {
      attendance: `நிச்சயமாக! ${role} ஆக, உங்கள் வருகைப் பதிவைப் பற்றி உதவ முடியும். மொத்த வகுப்புகள், கலந்து கொண்ட வகுப்புகள், தவறவிட்ட வகுப்புகள் மற்றும் தற்போதைய வருகை சதவீதம் போன்ற விவரங்கள் இருக்கலாம். உண்மையான பதிவுக்காக பள்ளி போர்ட்டலைப் பார்க்கவும்.`,
      subjects: `XYZ AI உங்கள் கல்விப் பாடங்களில் உதவ முடியும். கணிதம், அறிவியல், ஆங்கிலம், சமூக அறிவியல் மற்றும் கணினி அறிவியல் போன்ற பாடங்களைப் பற்றி கேட்கலாம்.`,
      timetable: `உங்கள் பள்ளி நேர அட்டவணையைப் புரிந்துகொள்ள நான் உதவ முடியும். அதில் பாடம், ஆசிரியர், வகுப்பறை மற்றும் நேரம் இருக்கும்.`,
      teacher: `நிச்சயமாக! பள்ளி போர்ட்டல் அல்லது அதிகாரப்பூர்வ மின்னஞ்சல் மூலம் உங்கள் ஆசிரியரைத் தொடர்புகொள்ளலாம்.`,
      management: `பள்ளி அலுவலகம், நிர்வாக மேசை அல்லது அதிகாரப்பூர்வ பள்ளி போர்ட்டல் மூலம் பள்ளி நிர்வாகத்தைத் தொடர்புகொள்ளலாம்.`,
      hello: `வணக்கம்! 👋 நான் XYZ AI, உங்கள் பள்ளி உதவியாளர். வருகை, பாடங்கள், நேர அட்டவணை மற்றும் பள்ளி சேவைகளில் உதவ முடியும்.`,
      help: `நான் XYZ AI, உங்கள் பள்ளி உதவியாளர். கல்வி, வருகை, பாடங்கள் மற்றும் பள்ளி சேவைகள் தொடர்பான கேள்விகளில் உதவ முடியும்.`,
      default: `உங்கள் கேள்விக்கு நன்றி! நான் XYZ AI, உங்கள் பள்ளி உதவியாளர். உங்கள் கேள்வியை சற்று விரிவாக கூறுங்கள்.`
    }
  };

  // For languages not included above, use English fallback.
  // The real AI backend will answer in the selected language.
  const r = responses[language] || responses.English;

  if (q.includes("attendance")) return r.attendance;

  if (q.includes("subject") || q.includes("subjects")) {
    return r.subjects;
  }

  if (q.includes("timetable") || q.includes("schedule")) {
    return r.timetable;
  }

  if (q.includes("teacher") || q.includes("talk to my teacher")) {
    return r.teacher;
  }

  if (
    q.includes("management") ||
    q.includes("principal") ||
    q.includes("school management")
  ) {
    return r.management;
  }

  if (
    q.includes("hello") ||
    q.includes("hi") ||
    q.includes("hlo") ||
    q.includes("hey")
  ) {
    return r.hello;
  }

  if (q.includes("help") || q.includes("what can you do")) {
    return r.help;
  }

  return r.default;
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

      if (
        reply &&
        !reply.toLowerCase().includes("groq_api_key") &&
        !reply.toLowerCase().includes("ai service is not configured") &&
        !reply.toLowerCase().includes("service is not configured") &&
        !reply.toLowerCase().includes("trouble generating")
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
