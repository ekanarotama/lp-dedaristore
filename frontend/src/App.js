import React from "react";
import "@/App.css";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { SellerPath } from "@/components/sections/SellerPath";
import { BuyerPath } from "@/components/sections/BuyerPath";
import { Grading } from "@/components/sections/Grading";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";

function App() {
  return (
    <div className="App min-h-screen bg-white text-[#1A1A1A] font-body" data-testid="dedari-app">
      <Header />
      <main>
        <Hero />
        <Problem />
        <SellerPath />
        <BuyerPath />
        <Grading />
        <HowItWorks />
        <TrustSignals />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
