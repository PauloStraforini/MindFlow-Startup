"use client";
import { useState, useEffect } from "react";


import Hero from "@/components/pages/landing-page/hero";
import Features from "@/components/pages/landing-page/features";
import Header from "@/components/pages/landing-page/header";
import Works from "@/components/pages/landing-page/works";
import Benefits from "@/components/pages/landing-page/benefits";
import Testimonials from "@/components/pages/landing-page/testimonials";
import Psychologists from "@/components/pages/landing-page/psychologists";
import Princing from "@/components/pages/landing-page/pricing"
import Footer from "@/components/pages/landing-page/footer";


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
