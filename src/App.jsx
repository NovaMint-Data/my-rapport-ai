import { useState, useEffect } from "react";
import { useAuth } from './context/AuthContext'
import AuthGate from './components/auth/AuthGate'


const T = {
  en: {
    dir: "ltr",
    appTag: "POWERED BY GROQ AI",
    appName: "RAPPORT AI",
    appSub: "Professional Report Generator",
    step1: "Select Report Type",
    step2: "Configure Your Report",
    step3: "Report Ready",
    reportTypes: ["Environmental","Technical","Financial","Project","Audit","Monthly"],
    reportIcons: ["🌿","⚙️","📊","🚀","🔍","📅"],
    outputLang: "Report Output Language",
    tone: "Writing Tone",
    tones: ["Highly Formal","Professional","Technical"],
    audience: "Target Audience",
    audiencePh: "e.g. CEO, Technical Committee, Environmental Agency...",
    dataLabel: "Your Raw Data & Notes",
    dataPh: "Enter your notes, numbers, key points...\nExample:\n• 450 tons of waste collected this month\n• 3 leak incidents recorded\n• Compliance rate: 87%\n• Recommendation: upgrade sorting equipment",
    next: "Next →",
    back: "← Back",
    generate: "✦ Generate Report",
    copy: "Copy",
    copied: "✓ Copied!",
    newReport: "+ New Report",
    loading: "AI is writing your professional report...",
    ready: "✦ Report Ready",
    errorMsg: "❌ Connection error. Check your API key and try again.",
    apiTitle: "Enter your Groq API Key",
    apiSub: "Get your free key at console.groq.com",
    apiPh: "gsk_...",
    apiBtn: "Save & Continue",
    apiChange: "Change API Key",
    charCount: "characters",
    footer: "RAPPORT AI · POWERED BY GROQ · مدعوم بالذكاء الاصطناعي",
  },
  fr: {
    dir: "ltr",
    appTag: "PROPULSÉ PAR GROQ AI",
    appName: "RAPPORT AI",
    appSub: "Générateur de Rapports Professionnel",
    step1: "Choisissez le type de rapport",
    step2: "Configurez votre rapport",
    step3: "Rapport prêt",
    reportTypes: ["Environnemental","Technique","Financier","Projet","Audit","Mensuel"],
    reportIcons: ["🌿","⚙️","📊","🚀","🔍","📅"],
    outputLang: "Langue du rapport",
    tone: "Style d'écriture",
    tones: ["Très formel","Professionnel","Technique"],
    audience: "Public cible",
    audiencePh: "ex: PDG, Comité technique, Agence environnementale...",
    dataLabel: "Vos données brutes et notes",
    dataPh: "Entrez vos notes, chiffres, points clés...\nExemple:\n• 450 tonnes de déchets collectés ce mois\n• 3 incidents de fuite enregistrés\n• Taux de conformité: 87%",
    next: "Suivant →",
    back: "← Retour",
    generate: "✦ Générer le rapport",
    copy: "Copier",
    copied: "✓ Copié!",
    newReport: "+ Nouveau rapport",
    loading: "L'IA rédige votre rapport professionnel...",
    ready: "✦ Rapport Prêt",
    errorMsg: "❌ Erreur de connexion. Vérifiez votre clé API.",
    apiTitle: "Entrez votre clé API Groq",
    apiSub: "Obtenez votre clé gratuite sur console.groq.com",
    apiPh: "gsk_...",
    apiBtn: "Enregistrer et continuer",
    apiChange: "Changer la clé API",
    charCount: "caractères",
    footer: "RAPPORT AI · PROPULSÉ PAR GROQ · مدعوم بالذكاء الاصطناعي",
  },
  ar: {
    dir: "rtl",
    appTag: "مدعوم بـ Groq AI",
    appName: "RAPPORT AI",
    appSub: "مولّد التقارير المهنية",
    step1: "اختر نوع التقرير",
    step2: "اضبط إعدادات التقرير",
    step3: "التقرير جاهز",
    reportTypes: ["بيئي","تقني","مالي","مشروع","تدقيق","شهري"],
    reportIcons: ["🌿","⚙️","📊","🚀","🔍","📅"],
    outputLang: "لغة التقرير الناتج",
    tone: "أسلوب الكتابة",
    tones: ["رسمي جداً","مهني","تقني"],
    audience: "الجمهور المستهدف",
    audiencePh: "مثال: مدير عام، لجنة تقنية، هيئة بيئية...",
    dataLabel: "بياناتك وملاحظاتك الخام",
    dataPh: "أدخل ملاحظاتك، أرقامك، نقاطك الرئيسية...\nمثال:\n• تم جمع 450 طن من النفايات\n• 3 حوادث تسرب مسجّلة\n• نسبة الامتثال: 87%",
    next: "التالي ←",
    back: "→ رجوع",
    generate: "✦ توليد التقرير",
    copy: "نسخ",
    copied: "✓ تم النسخ!",
    newReport: "+ تقرير جديد",
    loading: "الذكاء الاصطناعي يكتب تقريرك المهني...",
    ready: "✦ التقرير جاهز",
    errorMsg: "❌ خطأ في الاتصال. تحقق من مفتاح API وحاول مرة أخرى.",
    apiTitle: "أدخل مفتاح Groq API",
    apiSub: "احصل على مفتاحك المجاني من console.groq.com",
    apiPh: "gsk_...",
    apiBtn: "حفظ والمتابعة",
    apiChange: "تغيير مفتاح API",
    charCount: "حرف",
    footer: "RAPPORT AI · POWERED BY GROQ · مدعوم بالذكاء الاصطناعي",
  },
};

const OUTPUT_LANGS = [
  { id: "English", flag: "🇬🇧", label: "English" },
  { id: "French",  flag: "🇫🇷", label: "Français" },
  { id: "Arabic",  flag: "🇩🇿", label: "العربية" },
];

// ─── GROQ API CALL ───────────────────────────────────────────────
async function callGroq(apiKey, reportType, rawData, outputLang, tone, audience) {
  const res = await fetch("/api/generate-report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reportType, rawData, outputLang, tone, audience }),
  });
  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  return data.result;
}

// ─── MAIN APP ────────────────────────────────────────────────────
export default function App() {
  const { user, signOut } = useAuth()
  if (!user) return <AuthGate />
  const [ui, setUi] = useState("en");
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("groq_key") || "");
  const [licensed, setLicensed] = useState(true);
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiInput, setApiInput] = useState("");
  const [showApiPwd, setShowApiPwd] = useState(false);

  const [step, setStep] = useState(1);
  const [reportType, setReportType] = useState(null);
  const [outputLang, setOutputLang] = useState("English");
  const [tone, setTone] = useState(0);
  const [audience, setAudience] = useState("");
  const [rawData, setRawData] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = T[ui];

  

  const saveKey = () => {
    if (!apiInput.trim()) return;
    localStorage.setItem("groq_key", apiInput.trim());
    setApiKey(apiInput.trim());
    setShowApiModal(false);
    setApiInput("");
  };
  

  const generate = async () => {
    if (reportType === null || !rawData.trim()) return;
    setLoading(true);
    setReport("");
    setStep(3);
    try {
      const result = await callGroq(
        apiKey,
        t.reportTypes[reportType],
        rawData,
        outputLang,
        t.tones[tone],
        audience
      );
      setReport(result);
    } catch {
      setReport(t.errorMsg);
    }
    setLoading(false);
  };

  const reset = () => {
    setStep(1); setReportType(null); setRawData("");
    setReport(""); setAudience(""); setTone(0);
  };

  const copyReport = () => {
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const S = {
    app: {
      minHeight: "100vh",
      background: "linear-gradient(135deg,#080B14 0%,#0E1525 60%,#080B14 100%)",
      color: "#E8DCC8",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      direction: t.dir,
      position: "relative",
      overflow: "hidden",
    },
    grid: {
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
      backgroundImage: `linear-gradient(rgba(201,168,76,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(201,168,76,.03) 1px,transparent 1px)`,
      backgroundSize: "60px 60px",
    },
    glow1: {
      position: "fixed", width: 600, height: 600, borderRadius: "50%",
      background: "radial-gradient(ellipse,rgba(201,168,76,.06) 0%,transparent 70%)",
      top: -200, left: -100, pointerEvents: "none", zIndex: 0,
    },
    glow2: {
      position: "fixed", width: 500, height: 500, borderRadius: "50%",
      background: "radial-gradient(ellipse,rgba(80,130,200,.04) 0%,transparent 70%)",
      bottom: -100, right: -100, pointerEvents: "none", zIndex: 0,
    },
    wrap: { position: "relative", zIndex: 1, maxWidth: 860, margin: "0 auto", padding: "36px 20px 60px" },
  };

  return (
    <div style={S.app}>
      <div style={S.grid} />
      <div style={S.glow1} />
      <div style={S.glow2} />
     

      {false && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(8,11,20,.92)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
        }}>
          <div style={{
            background: "#0E1525", border: "1px solid rgba(201,168,76,.35)",
            borderRadius: 18, padding: "40px 36px", maxWidth: 420, width: "100%",
            boxShadow: "0 0 60px rgba(201,168,76,.08)",
          }}>
            <div style={{ fontSize: 32, marginBottom: 16, textAlign: "center" }}>🔑</div>
            <h2 style={{ textAlign: "center", fontFamily: "Georgia,serif", fontWeight: 400,
              fontSize: 22, color: "#C9A84C", margin: "0 0 8px" }}>{t.apiTitle}</h2>
            <p style={{ textAlign: "center", color: "#5A7080", fontSize: 13, margin: "0 0 28px" }}>
              {t.apiSub}
            </p>
            <div style={{ position: "relative", marginBottom: 20 }}>
              <input
                type={showApiPwd ? "text" : "password"}
                value={apiInput}
                onChange={e => setApiInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && saveKey()}
                placeholder={t.apiPh}
                style={{
                  width: "100%", padding: "13px 44px 13px 16px", boxSizing: "border-box",
                  background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: 10, color: "#E8DCC8", fontSize: 14, outline: "none",
                  fontFamily: "monospace",
                }}
              />
              <button onClick={() => setShowApiPwd(p => !p)} style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", color: "#5A7080", cursor: "pointer", fontSize: 16,
              }}>{showApiPwd ? "🙈" : "👁"}</button>
            </div>
            <button onClick={saveKey} disabled={!apiInput.trim()} style={{
              width: "100%", padding: "13px",
              background: apiInput.trim() ? "linear-gradient(135deg,#C9A84C,#A07830)" : "rgba(201,168,76,.1)",
              border: "none", borderRadius: 10,
              color: apiInput.trim() ? "#0A1020" : "#3A4A3A",
              fontSize: 14, fontWeight: 700, cursor: apiInput.trim() ? "pointer" : "not-allowed",
              letterSpacing: .5,
            }}>{t.apiBtn}</button>
          </div>
        </div>
      )}

      <div style={S.wrap}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 4, color: "#C9A84C", marginBottom: 4, textTransform: "uppercase" }}>{t.appTag}</div>
            <h1 style={{
              fontFamily: "Georgia,serif", fontSize: "clamp(24px,4vw,38px)",
              fontWeight: 400, margin: 0, letterSpacing: 2,
              background: "linear-gradient(135deg,#E8DCC8,#C9A84C,#E8DCC8)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>{t.appName}</h1>
            <div style={{ fontSize: 12, color: "#4A5A6A", letterSpacing: 1 }}>{t.appSub}</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            {["en","fr","ar"].map(l => (
              <button key={l} onClick={() => setUi(l)} style={{
                padding: "6px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer",
                background: ui === l ? "rgba(201,168,76,.15)" : "rgba(255,255,255,.03)",
                border: ui === l ? "1px solid rgba(201,168,76,.4)" : "1px solid rgba(255,255,255,.08)",
                color: ui === l ? "#C9A84C" : "#5A7080", transition: "all .2s",
              }}>{{ en: "🇬🇧 EN", fr: "🇫🇷 FR", ar: "🇩🇿 AR" }[l]}</button>
            ))}
            <button onClick={() => { setShowApiModal(true); setApiInput(""); }} style={{
              padding: "6px 12px", borderRadius: 8, fontSize: 11,
              background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.07)",
              color: "#3A4A5A", cursor: "pointer",
            }}>🔑</button>
          </div>
          <button onClick={signOut} style={{
  padding: '6px 14px', borderRadius: 8, fontSize: 12,
  background: 'rgba(224,85,85,.08)',
  border: '1px solid rgba(224,85,85,.2)',
  color: '#E08080', cursor: 'pointer',
}}>Sign Out</button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0, marginBottom: 44 }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%", fontSize: 13, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: step >= s ? "linear-gradient(135deg,#C9A84C,#A07830)" : "rgba(255,255,255,.04)",
                border: step >= s ? "none" : "1px solid rgba(255,255,255,.08)",
                color: step >= s ? "#0A1020" : "#3A4A5A",
                transition: "all .4s ease",
                boxShadow: step >= s ? "0 4px 16px rgba(201,168,76,.25)" : "none",
              }}>{s < step ? "✓" : s}</div>
              {s < 3 && <div style={{ width: 70, height: 1, background: step > s ? "rgba(201,168,76,.4)" : "rgba(255,255,255,.06)", transition: "background .4s" }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <SectionTitle>{t.step1}</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14, marginBottom: 36 }}>
              {t.reportTypes.map((name, i) => (
                <div key={i} onClick={() => setReportType(i)} style={{
                  padding: "22px 20px", borderRadius: 14, cursor: "pointer",
                  background: reportType === i ? "linear-gradient(135deg,rgba(201,168,76,.18),rgba(201,168,76,.05))" : "rgba(255,255,255,.025)",
                  border: reportType === i ? "1px solid rgba(201,168,76,.5)" : "1px solid rgba(255,255,255,.06)",
                  transition: "all .25s ease", position: "relative",
                }}>
                  {reportType === i && <div style={{ position: "absolute", top: 10, right: 10, width: 8, height: 8, borderRadius: "50%", background: "#C9A84C", boxShadow: "0 0 8px #C9A84C" }} />}
                  <div style={{ fontSize: 30, marginBottom: 10 }}>{t.reportIcons[i]}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: reportType === i ? "#C9A84C" : "#B8C4D0" }}>{name}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: t.dir === "rtl" ? "flex-start" : "flex-end" }}>
              <GoldBtn disabled={reportType === null} onClick={() => setStep(2)}>{t.next}</GoldBtn>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <SectionTitle>{t.step2}</SectionTitle>
            <div style={{ marginBottom: 22 }}>
              <Label>{t.outputLang}</Label>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {OUTPUT_LANGS.map(l => (
                  <div key={l.id} onClick={() => setOutputLang(l.id)} style={{
                    padding: "9px 18px", borderRadius: 10, cursor: "pointer",
                    background: outputLang === l.id ? "rgba(201,168,76,.15)" : "rgba(255,255,255,.03)",
                    border: outputLang === l.id ? "1px solid rgba(201,168,76,.4)" : "1px solid rgba(255,255,255,.07)",
                    color: outputLang === l.id ? "#C9A84C" : "#6A7A8A", fontSize: 13, transition: "all .2s",
                  }}>{l.flag} {l.label}</div>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 22 }}>
              <Label>{t.tone}</Label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {t.tones.map((name, i) => (
                  <div key={i} onClick={() => setTone(i)} style={{
                    padding: "10px 16px", borderRadius: 9, cursor: "pointer",
                    background: tone === i ? "rgba(201,168,76,.1)" : "rgba(255,255,255,.02)",
                    border: tone === i ? "1px solid rgba(201,168,76,.3)" : "1px solid rgba(255,255,255,.05)",
                    color: tone === i ? "#C9A84C" : "#6A7A8A", fontSize: 13, transition: "all .2s",
                  }}>{tone === i ? "◉ " : "○ "}{name}</div>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <Label>{t.audience}</Label>
              <input value={audience} onChange={e => setAudience(e.target.value)} placeholder={t.audiencePh} style={{
                width: "100%", padding: "12px 16px", boxSizing: "border-box",
                background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)",
                borderRadius: 10, color: "#E8DCC8", fontSize: 14, outline: "none",
                fontFamily: "inherit", direction: t.dir,
              }} />
            </div>
            <div style={{ marginBottom: 28 }}>
              <Label>{t.dataLabel} <span style={{ color: "#C9A84C" }}>*</span></Label>
              <div style={{ position: "relative" }}>
                <textarea value={rawData} onChange={e => setRawData(e.target.value)} placeholder={t.dataPh} style={{
                  width: "100%", minHeight: 190, padding: "16px", boxSizing: "border-box",
                  background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)",
                  borderRadius: 12, color: "#E8DCC8", fontSize: 14, outline: "none", resize: "vertical",
                  fontFamily: "inherit", lineHeight: 1.8, direction: t.dir, transition: "border-color .2s",
                }}
                  onFocus={e => e.target.style.borderColor = "rgba(201,168,76,.35)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.07)"}
                />
                <div style={{ position: "absolute", bottom: 10, [t.dir === "rtl" ? "left" : "right"]: 14, fontSize: 11, color: "#2A3A4A" }}>
                  {rawData.length} {t.charCount}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <GhostBtn onClick={() => setStep(1)}>{t.back}</GhostBtn>
              <GoldBtn disabled={!rawData.trim()} onClick={generate}>{t.generate}</GoldBtn>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <SectionTitle style={{ margin: 0 }}>
                {loading ? "⏳ " + t.loading.slice(0, 24) + "..." : t.ready}
              </SectionTitle>
              {!loading && report && (
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={copyReport} style={{
                    padding: "8px 18px", borderRadius: 8, fontSize: 13, cursor: "pointer",
                    background: copied ? "rgba(76,180,120,.15)" : "rgba(255,255,255,.04)",
                    border: copied ? "1px solid rgba(76,180,120,.4)" : "1px solid rgba(255,255,255,.09)",
                    color: copied ? "#4CB478" : "#7A8B9A", fontFamily: "inherit", transition: "all .2s",
                  }}>{copied ? t.copied : t.copy}</button>
                  <GhostBtn onClick={reset}>{t.newReport}</GhostBtn>
                </div>
              )}
            </div>
            {loading ? (
              <div style={{ textAlign: "center", padding: "80px 20px" }}>
                <div style={{
                  width: 56, height: 56, margin: "0 auto 24px",
                  border: "2px solid rgba(201,168,76,.1)", borderTop: "2px solid #C9A84C",
                  borderRadius: "50%", animation: "spin 1s linear infinite",
                }} />
                <p style={{ color: "#4A5A6A", fontSize: 14 }}>{t.loading}</p>
              </div>
            ) : (
              <div style={{
                background: "rgba(255,255,255,.02)", border: "1px solid rgba(201,168,76,.12)",
                borderRadius: 16, padding: "32px 36px", lineHeight: 2, fontSize: 14.5,
                whiteSpace: "pre-wrap",
                direction: outputLang === "Arabic" ? "rtl" : "ltr",
                textAlign: outputLang === "Arabic" ? "right" : "left",
                color: "#CEC4B0", maxHeight: "60vh", overflowY: "auto",
              }}>{report}</div>
            )}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 64, color: "#1E2A38", fontSize: 11, letterSpacing: 2 }}>
          {t.footer}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Noto+Sans+Arabic:wght@400;600&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin   { to{transform:rotate(360deg)} }
        *::-webkit-scrollbar{width:4px}
        *::-webkit-scrollbar-thumb{background:rgba(201,168,76,.2);border-radius:4px}
        input,textarea{transition:border-color .2s}
        input::placeholder,textarea::placeholder{color:#2A3A4A}
      `}</style>
    </div>
  );
}

function SectionTitle({ children, style }) {
  return (
    <h2 style={{
      fontFamily: "Georgia,serif", fontSize: 20, fontWeight: 400,
      color: "#C0CADB", margin: "0 0 22px",
      borderBottom: "1px solid rgba(255,255,255,.05)", paddingBottom: 14, ...style,
    }}>{children}</h2>
  );
}
function Label({ children }) {
  return (
    <div style={{ fontSize: 11, color: "#4A6070", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>
      {children}
    </div>
  );
}
function GoldBtn({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "12px 28px", borderRadius: 10,
      background: disabled ? "rgba(201,168,76,.08)" : "linear-gradient(135deg,#C9A84C,#A07830)",
      border: "none", color: disabled ? "#2A3A2A" : "#0A1020",
      fontSize: 14, fontFamily: "inherit", fontWeight: 600,
      cursor: disabled ? "not-allowed" : "pointer", letterSpacing: .5,
      boxShadow: disabled ? "none" : "0 4px 20px rgba(201,168,76,.22)", transition: "all .3s",
    }}>{children}</button>
  );
}
function GhostBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "12px 22px", borderRadius: 10, background: "transparent",
      border: "1px solid rgba(255,255,255,.09)", color: "#4A6070",
      fontSize: 14, fontFamily: "inherit", cursor: "pointer", letterSpacing: .5, transition: "all .2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.2)"; e.currentTarget.style.color = "#8A9AB0"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.09)"; e.currentTarget.style.color = "#4A6070"; }}
    >{children}</button>
  );
}