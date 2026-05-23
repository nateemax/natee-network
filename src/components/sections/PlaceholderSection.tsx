"use client";

interface PlaceholderSectionProps {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  color: string;
  accent: string;
  coming?: string;
}

export default function PlaceholderSection({
  id, num, title, subtitle, color, accent, coming,
}: PlaceholderSectionProps) {
  return (
    <section
      id={id}
      className="section"
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px 24px",
        position: "relative",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, ${accent} 0%, transparent 70%)`,
          opacity: 0.06,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", textAlign: "center", maxWidth: 600 }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: color,
            opacity: 0.12,
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
            marginBottom: -20,
            letterSpacing: "-0.04em",
          }}
        >
          {num}
        </div>
        <h2
          style={{
            fontSize: "clamp(24px, 4vw, 40px)",
            fontWeight: 500,
            color: "var(--foreground)",
            marginBottom: 12,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "var(--muted-foreground)",
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          {subtitle}
        </p>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
            borderRadius: 999,
            border: `1px solid ${color}40`,
            background: `${color}10`,
            fontSize: 12,
            color: color,
            fontWeight: 500,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: color,
              display: "inline-block",
              opacity: 0.6,
            }}
          />
          {coming || "建设中 · 即将上线"}
        </div>
      </div>
    </section>
  );
}
