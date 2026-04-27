import { useState } from "react";

const THEMES = [
  "God's Faithfulness", "Peace in the Storm", "Walking in Faith",
  "His Unfailing Love", "Strength & Courage", "Hope & Renewal",
  "Gratitude", "Purpose & Calling", "Forgiveness", "Trust in God's Plan"
];

function LoadingDots() {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "center", padding: "40px 0" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 10, height: 10, borderRadius: "50%", background: "#7C5CBF",
          animation: "bounce 1.2s infinite", animationDelay: `${i * 0.2}s`
        }} />
      ))}
      <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }`}</style>
    </div>
  );
}

function DevotionalCard({ content }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${content.subject}\n\n📖 ${content.theme}\n\n${content.scripture_ref}\n"${content.scripture}"\n\n${content.reflection}\n\n🙏 Prayer\n${content.prayer}\n\n📣 Declaration\n${content.declaration}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", maxWidth: 620, margin: "0 auto" }}>
      {/* Email subject preview */}
      <div style={{
        background: "#F3F0FA", border: "1px solid #D6CCF0", borderRadius: 10,
        padding: "10px 16px", marginBottom: 20, fontSize: 13, color: "#5A4A8A"
      }}>
        <span style={{ fontWeight: 700, fontFamily: "sans-serif" }}>📧 Subject line: </span>
        {content.subject}
      </div>

      {/* Card */}
      <div style={{
        background: "white", borderRadius: 16, overflow: "hidden",
        boxShadow: "0 4px 24px rgba(124,92,191,0.12)", border: "1px solid #EDE8FB"
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #7C5CBF 0%, #5B3FA0 100%)",
          padding: "28px 32px", color: "white"
        }}>
          <div style={{ fontSize: 11, letterSpacing: 2, opacity: 0.8, marginBottom: 6, fontFamily: "sans-serif", textTransform: "uppercase" }}>
            Daily Devotional · NKJV
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.3 }}>{content.theme}</div>
          <div style={{ fontSize: 13, opacity: 0.75, marginTop: 8, fontFamily: "sans-serif" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </div>
        </div>

        <div style={{ padding: "28px 32px" }}>
          {/* Scripture */}
          <div style={{
            background: "#F8F5FF", borderLeft: "4px solid #7C5CBF",
            borderRadius: "0 10px 10px 0", padding: "16px 20px", marginBottom: 24
          }}>
            <div style={{ fontSize: 12, color: "#7C5CBF", fontFamily: "sans-serif", fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>
              📖 SCRIPTURE
            </div>
            <div style={{ fontSize: 16, lineHeight: 1.7, color: "#2D1F4E", fontStyle: "italic" }}>
              "{content.scripture}"
            </div>
            <div style={{ fontSize: 13, color: "#7C5CBF", marginTop: 10, fontFamily: "sans-serif", fontWeight: 600 }}>
              — {content.scripture_ref}
            </div>
          </div>

          {/* Reflection */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: "#7C5CBF", fontFamily: "sans-serif", fontWeight: 700, marginBottom: 10, letterSpacing: 1 }}>
              ✨ REFLECTION
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.8, color: "#3D3050" }}>
              {content.reflection}
            </div>
          </div>

          {/* Prayer */}
          <div style={{
            background: "#FFF8F0", border: "1px solid #F5DEB3",
            borderRadius: 10, padding: "16px 20px", marginBottom: 20
          }}>
            <div style={{ fontSize: 12, color: "#B8860B", fontFamily: "sans-serif", fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>
              🙏 PRAYER
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.8, color: "#3D3050", fontStyle: "italic" }}>
              {content.prayer}
            </div>
          </div>

          {/* Declaration */}
          <div style={{
            background: "linear-gradient(135deg, #F3F0FA, #EDE8FB)",
            borderRadius: 10, padding: "16px 20px", textAlign: "center"
          }}>
            <div style={{ fontSize: 12, color: "#7C5CBF", fontFamily: "sans-serif", fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>
              📣 TODAY'S DECLARATION
            </div>
            <div style={{ fontSize: 15, color: "#5B3FA0", fontWeight: 600, lineHeight: 1.6 }}>
              {content.declaration}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, marginTop: 16, fontFamily: "sans-serif" }}>
        <button onClick={handleCopy} style={{
          flex: 1, padding: "12px", borderRadius: 8, border: "1px solid #D6CCF0",
          background: "white", color: "#5B3FA0", cursor: "pointer", fontWeight: 600, fontSize: 14
        }}>
          {copied ? "✅ Copied!" : "📋 Copy for newsletter"}
        </button>
      </div>
    </div>
  );
}

export default function DevotionalWorkflow() {
  const [step, setStep] = useState("home"); // home | generating | result
  const [selectedTheme, setSelectedTheme] = useState("");
  const [customTheme, setCustomTheme] = useState("");
  const [devotional, setDevotional] = useState(null);
  const [error, setError] = useState("");

  const activeTheme = selectedTheme === "custom" ? customTheme : selectedTheme;

  const generate = async () => {
    if (!activeTheme) return;
    setStep("generating");
    setError("");

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a warm, Spirit-filled devotional writer. You write short, powerful daily devotionals using the New King James Version (NKJV) of the Bible. Every devotional must be readable in about 2 minutes. Always respond with ONLY valid JSON, no markdown, no extra text.`,
          messages: [{
            role: "user",
            content: `Write a daily devotional on the theme: "${activeTheme}".

Return ONLY this JSON structure:
{
  "subject": "a compelling email subject line under 60 characters",
  "theme": "${activeTheme}",
  "scripture": "the scripture verse text (NKJV)",
  "scripture_ref": "Book Chapter:Verse",
  "reflection": "2-3 warm, encouraging paragraphs connecting the scripture to daily life. About 120-150 words.",
  "prayer": "A personal, heartfelt prayer of 3-4 sentences. Start with 'Father,'",
  "declaration": "A bold, first-person faith declaration. One or two sentences. Start with 'I declare'"
}`
          }]
        })
      });

      const data = await response.json();
      const text = data.content.map(b => b.text || "").join("");
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setDevotional(parsed);
      setStep("result");
    } catch (e) {
      setError("Something went wrong generating the devotional. Please try again.");
      setStep("home");
    }
  };

  const reset = () => {
    setStep("home");
    setDevotional(null);
    setSelectedTheme("");
    setCustomTheme("");
  };

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(160deg, #F8F5FF 0%, #EDE8FB 100%)",
      padding: "32px 16px", fontFamily: "sans-serif"
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>✝️</div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#2D1F4E", margin: 0 }}>
            Daily Devotional Workflow
          </h1>
          <p style={{ color: "#7C5CBF", marginTop: 8, fontSize: 15 }}>
            Generate your NKJV devotional newsletter · ~2 min read
          </p>
        </div>

        {/* HOME */}
        {step === "home" && (
          <div>
            <div style={{
              background: "white", borderRadius: 16, padding: 28,
              boxShadow: "0 2px 16px rgba(124,92,191,0.1)", marginBottom: 20
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#5B3FA0", marginBottom: 16, letterSpacing: 0.5 }}>
                STEP 1 — Choose a theme
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {THEMES.map(t => (
                  <button key={t} onClick={() => setSelectedTheme(t)} style={{
                    padding: "8px 14px", borderRadius: 20, fontSize: 13, cursor: "pointer",
                    border: selectedTheme === t ? "2px solid #7C5CBF" : "1px solid #D6CCF0",
                    background: selectedTheme === t ? "#7C5CBF" : "white",
                    color: selectedTheme === t ? "white" : "#5B3FA0",
                    fontWeight: selectedTheme === t ? 700 : 400, transition: "all 0.15s"
                  }}>
                    {t}
                  </button>
                ))}
                <button onClick={() => setSelectedTheme("custom")} style={{
                  padding: "8px 14px", borderRadius: 20, fontSize: 13, cursor: "pointer",
                  border: selectedTheme === "custom" ? "2px solid #7C5CBF" : "1px dashed #B0A0E0",
                  background: selectedTheme === "custom" ? "#7C5CBF" : "white",
                  color: selectedTheme === "custom" ? "white" : "#9B8AC4", fontWeight: 600
                }}>
                  + Custom theme
                </button>
              </div>

              {selectedTheme === "custom" && (
                <input
                  value={customTheme}
                  onChange={e => setCustomTheme(e.target.value)}
                  placeholder="Type your theme, e.g. 'Healing' or 'Patience'"
                  style={{
                    marginTop: 12, width: "100%", padding: "10px 14px", borderRadius: 8,
                    border: "1px solid #D6CCF0", fontSize: 14, color: "#2D1F4E",
                    outline: "none", boxSizing: "border-box"
                  }}
                />
              )}
            </div>

            <button
              onClick={generate}
              disabled={!activeTheme}
              style={{
                width: "100%", padding: "16px", borderRadius: 12, border: "none",
                background: activeTheme ? "linear-gradient(135deg, #7C5CBF, #5B3FA0)" : "#D6CCF0",
                color: "white", fontSize: 16, fontWeight: 700, cursor: activeTheme ? "pointer" : "not-allowed",
                boxShadow: activeTheme ? "0 4px 16px rgba(124,92,191,0.35)" : "none", transition: "all 0.2s"
              }}
            >
              ✨ Generate Today's Devotional
            </button>

            {error && <div style={{ marginTop: 12, color: "#C0392B", fontSize: 14, textAlign: "center" }}>{error}</div>}
          </div>
        )}

        {/* GENERATING */}
        {step === "generating" && (
          <div style={{
            background: "white", borderRadius: 16, padding: 40, textAlign: "center",
            boxShadow: "0 2px 16px rgba(124,92,191,0.1)"
          }}>
            <LoadingDots />
            <div style={{ color: "#7C5CBF", fontWeight: 600, fontSize: 15, marginTop: 8 }}>
              Preparing your devotional on <em>"{activeTheme}"</em>…
            </div>
            <div style={{ color: "#B0A0E0", fontSize: 13, marginTop: 6 }}>
              Searching NKJV scripture · Writing reflection · Crafting prayer
            </div>
          </div>
        )}

        {/* RESULT */}
        {step === "result" && devotional && (
          <div>
            <DevotionalCard content={devotional} />
            <button onClick={reset} style={{
              width: "100%", marginTop: 16, padding: "14px", borderRadius: 12,
              border: "2px solid #7C5CBF", background: "transparent",
              color: "#7C5CBF", fontSize: 15, fontWeight: 700, cursor: "pointer"
            }}>
              ↩ Generate Another
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
