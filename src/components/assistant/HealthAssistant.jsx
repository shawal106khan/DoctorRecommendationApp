import { useState, useEffect, useRef } from "react";
import { X, MessageCircle, Send, Bot } from "lucide-react";

const HealthAssistant = ({ specializationName, questions, suggestions }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (specializationName) {
      const firstSuggestion =
        suggestions?.length > 0
          ? suggestions[0].question
          : `Ask any ${specializationName} related question`;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMessages([
        {
          sender: "assistant",
          text: `👋 Hello! I'm your Health Assistant. I can help with ${specializationName}-related questions.`,
        },
        {
          sender: "assistant",
          text: `💡 Try asking: ${firstSuggestion}`,
        },
      ]);
    }
  }, [specializationName, suggestions]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleQuickQuestion = (text) => {
    const userMessage = { sender: "user", text };

    const exactMatch = questions.find(
      (q) => q.question.toLowerCase() === text.toLowerCase(),
    );

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        sender: "assistant",
        text: exactMatch?.answer || "No answer found",
      },
    ]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const userText = input.trim().toLowerCase();

    // Exact question match FIRST
    const exactMatch = questions.find(
      (q) => q.question.toLowerCase() === userText,
    );

    if (exactMatch) {
      setMessages((prev) => [
        ...prev,
        userMessage,
        { sender: "assistant", text: exactMatch.answer },
      ]);
      setInput("");
      return;
    }

    // Exact keyword match SECOND
    const exactKeywordMatch = questions.find((q) =>
      (q.keywords || []).some((keyword) => keyword.toLowerCase() === userText),
    );

    if (exactKeywordMatch) {
      setMessages((prev) => [
        ...prev,
        userMessage,
        { sender: "assistant", text: exactKeywordMatch.answer },
      ]);
      setInput("");
      return;
    }

    let bestMatch = null;
    let highestScore = 0;

    const userWords = userText
      .replace(/[^\w\s]/g, "")
      .split(" ")
      .filter((w) => w.length > 2);

    questions.forEach((q) => {
      let score = 0;

      const questionWords = q.question
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(" ")
        .filter((w) => w.length > 2);

      questionWords.forEach((word) => {
        if (userWords.includes(word)) {
          score += 5;
        }
      });

      (q.keywords || []).forEach((keyword) => {
        const key = keyword.toLowerCase();

        if (userText.includes(key)) {
          score += 10;
        }

        key.split(" ").forEach((word) => {
          if (userWords.includes(word)) {
            score += 3;
          }
        });
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = q;
      }
    });

    let answer = `I can only answer ${specializationName} related questions.`;

    if (bestMatch && highestScore >= 8) {
      answer = bestMatch.answer;
    }

    setMessages((prev) => [
      ...prev,
      userMessage,
      { sender: "assistant", text: answer },
    ]);

    setInput("");
  };
  const quickQuestions = (suggestions || []).map((q, index) => ({
    label: `💡 ${index + 1}`,
    text: q.question,
  }));

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* ── CHAT PANEL ── */}
      {isOpen && (
        <div
          className="w-72 bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_8px_40px_rgba(26,111,168,0.20)] flex flex-col overflow-hidden"
          style={{ height: 380 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-white/20 border border-white/25 flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <div>
                <p className="text-white text-xs font-bold leading-tight">
                  Health Assistant
                </p>
                <p className="text-white/60 text-[9px]">{specializationName}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition"
            >
              <X size={12} className="text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-[#F7FAFE]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-[#1A6FA8] to-[#336aac] text-white rounded-br-none"
                      : "bg-white border border-[#D6E6F2] text-[#0D2E4E] rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          <div className="px-3 py-2 flex gap-1.5 flex-wrap border-t border-[#D6E6F2] bg-white flex-shrink-0">
            {quickQuestions.map(({ label, text }) => (
              <button
                key={label}
                onClick={() => handleQuickQuestion(text)}
                className="text-[9px] px-2 py-1 bg-[#E8F4FD] text-[#1A6FA8] font-semibold rounded-full hover:bg-[#1A6FA8] hover:text-white transition"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 py-2.5 border-t border-[#D6E6F2] bg-white flex gap-2 flex-shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a health question..."
              className="flex-1 text-xs px-3 py-2 rounded-xl bg-[#F7FAFE] border border-[#D6E6F2] outline-none text-[#0D2E4E] placeholder:text-[#AAC2D4] focus:border-[#1A6FA8] focus:ring-2 focus:ring-[#1A6FA8]/10 transition"
            />
            <button
              onClick={handleSend}
              className="w-8 h-8 bg-gradient-to-br from-[#1A6FA8] to-[#336aac] rounded-xl flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition flex-shrink-0"
            >
              <Send size={13} className="text-white" />
            </button>
          </div>
        </div>
      )}

      {/* ── TOGGLE BUTTON ── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-12 h-12 bg-gradient-to-br from-[#1A6FA8] to-[#336aac] rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(26,111,168,0.40)] hover:scale-105 active:scale-95 transition-all relative"
      >
        {isOpen ? (
          <X size={20} className="text-white" />
        ) : (
          <>
            <MessageCircle size={20} className="text-white" />
            {/* Pulse dot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#38B2A0] rounded-full border-2 border-white animate-pulse" />
          </>
        )}
      </button>
    </div>
  );
};

export default HealthAssistant;
