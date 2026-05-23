import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import IDCSection from "@/components/sections/IDCSection";
import DesignSection from "@/components/sections/DesignSection";
import BusinessSection from "@/components/sections/BusinessSection";
import FeedSection from "@/components/sections/FeedSection";
import AboutSection from "@/components/sections/AboutSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <IDCSection />
      <DesignSection />
      <BusinessSection />
      <FeedSection />
      <AboutSection />

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "28px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
          © 2026 Natee · 个人知识体系 · 持续构建中
        </p>
      </footer>
    </main>
  );
}
