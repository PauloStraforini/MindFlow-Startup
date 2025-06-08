"use client";
import { useState, useEffect } from "react";


import Hero from "@/src/pages/landing-page/hero";
import Features from "@/src/pages/landing-page/features";
import Header from "@/src/pages/landing-page/header";
import Works from "@/src/pages/landing-page/works";
import Benefits from "@/src/pages/landing-page/benefits";
import Testimonials from "@/src/pages/landing-page/testimonials";
import Psychologists from "@/src/pages/landing-page/psychologists";
import Princing from "@/src/pages/landing-page/pricing"
import Footer from "@/src/pages/landing-page/footer";


export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 text-gray-800 overflow-x-hidden">
      <main>

        {/* Header Section */}
        <Header />

        {/* Hero Section */}
        <Hero />

        {/* Features */}
        <Features />

        {/* How It Works */}
        <Works />

        {/* Benefits */}
        <Benefits />

        {/* Testimonials */}
        <Testimonials />

        {/* For Psychologists */}
        <Psychologists />

        {/* Pricing */}
        <Princing />
        
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
