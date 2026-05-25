"use client";

/* ── 版本时间轴组件 ──────────────────────────────────────────── */

export interface VersionEntry {
  version: string;
  date: string;
  title: string;
  description: string;
  tags?: string[];
}

interface VersionTimelineProps {
  versions: VersionEntry[];
  accentColor?: string;
  title?: string;
}

export default function VersionTimeline({ versions, accentColor = "#4f8ef7", title }: VersionTimelineProps) {
  if (!versions || versions.length === 0) return null;

  return (
    <div style={{ marginTop: 28 }}>
      {title && (
        <div
          style={{
            fontSize: 11,
            color: "var(--muted-foreground)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {title}
        </div>
      )}

      <div style={{ position: "relative", paddingLeft: 24 }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 5,
            top: 6,
            bottom: 6,
            width: 1,
            background: `linear-gradient(to bottom, ${accentColor}40, ${accentColor}15, ${accentColor}40)`,
          }}
        />

        {versions.map((ver, idx) => {
          const isLatest = idx === 0;
          return (
            <div
              key={ver.version}
              style={{
                position: "relative",
                marginBottom: idx === versions.length - 1 ? 0 : 20,
                paddingLeft: 18,
              }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  position: "absolute",
                  left: -20,
                  top: 4,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: isLatest ? accentColor : `${accentColor}40`,
                  border: isLatest ? `2px solid ${accentColor}` : `2px solid ${accentColor}30`,
                  zIndex: 1,
                }}
              />

              {/* Version content */}
              <div
                className="card"
                style={{
                  padding: "14px 16px",
                  borderLeft: isLatest ? `3px solid ${accentColor}` : "1px solid var(--border)",
                  background: isLatest ? `${accentColor}08` : undefined,
                }}
              >
                {/* Header row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 6,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: isLatest ? accentColor : "var(--foreground)",
                      background: isLatest ? `${accentColor}15` : "transparent",
                      padding: isLatest ? "2px 8px" : 0,
                      borderRadius: isLatest ? 999 : 0,
                    }}
                  >
                    {ver.version}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--muted-foreground)",
                      fontWeight: 400,
                    }}
                  >
                    {ver.date}
                  </span>
                  {isLatest && (
                    <span
                      style={{
                        fontSize: 9,
                        padding: "1px 6px",
                        borderRadius: 999,
                        background: `${accentColor}20`,
                        color: accentColor,
                        fontWeight: 600,
                      }}
                    >
                      LATEST
                    </span>
                  )}
                </div>

                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--foreground)",
                    marginBottom: 4,
                  }}
                >
                  {ver.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--muted-foreground)",
                    lineHeight: 1.6,
                  }}
                >
                  {ver.description}
                </div>

                {ver.tags && ver.tags.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
                    {ver.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 10,
                          padding: "2px 7px",
                          borderRadius: 999,
                          border: `1px solid ${accentColor}30`,
                          color: accentColor,
                          background: `${accentColor}08`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
