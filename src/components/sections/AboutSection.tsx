"use client";

const SOCIALS = [
  { label: "微信", icon: "💬", hint: "扫码添加" },
  { label: "LinkedIn", icon: "in", hint: "职业履历" },
  { label: "即刻", icon: "◉", hint: "思考记录" },
  { label: "Email", icon: "@", hint: "合作咨询" },
];

export default function AboutSection({ standalone }: { standalone?: boolean }) {
  return (
    <section
      id={standalone ? undefined : "about"}
      className="section"
      style={{
        padding: "100px 24px",
        borderTop: standalone ? "none" : "1px solid var(--border)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center bottom, rgba(79,142,247,0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: 64,
            alignItems: "start",
          }}
        >
          {/* Left: Bio */}
          <div>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: "linear-gradient(135deg, #4f8ef7, #a78bfa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 24,
              }}
            >
              N
            </div>

            <h2
              style={{
                fontSize: 28,
                fontWeight: 500,
                color: "var(--foreground)",
                marginBottom: 8,
                letterSpacing: "-0.01em",
              }}
            >
              Natee
            </h2>
            <p
              style={{
                fontSize: 13,
                color: "var(--muted-foreground)",
                marginBottom: 20,
              }}
            >
              IDC 行业研究者 · 设计策略师 · 商业价值分析师
            </p>

            <p
              style={{
                fontSize: 14,
                color: "var(--muted-foreground)",
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              专注于互联网行业的知识体系构建，将行业模型、设计实践与商业价值三者融合，
              探索 Agent 工具在真实场景中的落地路径。
            </p>

            {/* Skills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["IDC行业分析", "设计策略", "商业模型", "Agent应用", "用户研究"].map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Contact & Timeline */}
          <div>
            <h3
              style={{
                fontSize: 13,
                color: "var(--muted-foreground)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              联系方式
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 40 }}>
              {SOCIALS.map((s) => (
                <div
                  key={s.label}
                  className="card"
                  style={{
                    padding: "16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--foreground)",
                      flexShrink: 0,
                    }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)" }}>
                      {s.label}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted-foreground)" }}>{s.hint}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick contact form hint */}
            <div
              className="card"
              style={{
                padding: "20px",
                background: "rgba(79,142,247,0.06)",
                border: "1px solid rgba(79,142,247,0.15)",
              }}
            >
              <p style={{ fontSize: 13, color: "var(--muted-foreground)", marginBottom: 12 }}>
                有合作意向或感兴趣的项目？欢迎直接发起对话。
              </p>
              <button
                style={{
                  padding: "8px 20px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#fff",
                  background: "linear-gradient(135deg, #4f8ef7, #a78bfa)",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.85")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
              >
                发起合作咨询 →
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about [style*="grid-template-columns: 1fr 1.2fr"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
