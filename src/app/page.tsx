import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import BackgroundRemover from "@/components/BackgroundRemover";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="grain min-h-screen relative overflow-hidden bg-[#fafafa]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-slate-50/80 to-[#f5f3ff]/30" />
      <div className="pointer-events-none absolute top-[-30%] left-[-15%] w-[700px] h-[700px] rounded-full bg-violet-200/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-slate-200/20 blur-[100px]" />
      <div className="pointer-events-none absolute top-[50%] left-[60%] w-[400px] h-[400px] rounded-full bg-sky-100/10 blur-[100px]" />

      <div className="relative">
        <Navbar />
        <main>
          <Hero />
          <FeatureStrip />
          <BackgroundRemover />
        </main>
        <Footer />
      </div>
    </div>
  );
}
