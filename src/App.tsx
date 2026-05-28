import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import WhyUs from "./components/WhyUs";
import Quiz from "./components/Quiz";
import HowWeWork from "./components/HowWeWork";
import Stats from "./components/Stats";
import Guarantees from "./components/Guarantees";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import MobileStickyCTA from "./components/MobileStickyCTA";

export default function App() {
  return (
    <div className="min-h-screen bg-brand-light flex flex-col font-sans selection:bg-brand-orange selection:text-white antialiased">
      {/* 1. STICKY HEADER */}
      <Header />

      {/* Main layout contents */}
      <main className="flex-1 pb-16 lg:pb-0">
        
        {/* 2. HERO SECTION */}
        <Hero />

        {/* 3. SOCIAL PROOF BLOCK */}
        <SocialProof />

        {/* 4. WHY US (ADVANTAGES) */}
        <WhyUs />

        {/* 5. MULTI-STEP QUIZ SECTION */}
        <Quiz />

        {/* 6. HOW WE WORK (PROCESS) */}
        <HowWeWork />

        {/* 7. FACTS & STATS (Animated countdown/up) */}
        <Stats />

        {/* 8. TRUST & GUARANTEES */}
        <Guarantees />

        {/* 9. FINAL CTA CALL */}
        <CallToAction />

      </main>

      {/* 10. FOOTER WITH LEGAL MODAL */}
      <Footer />

      {/* 11. MOBILE BOTTOM CTAS AND FLOATING INSIGHT TRACKERS */}
      <MobileStickyCTA />
    </div>
  );
}
