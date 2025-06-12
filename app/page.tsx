"use client";
import { useState, useEffect } from "react";


import Hero from "@/src/templates/landing-page/hero";
import Features from "@/src/templates/landing-page/features";
import Header from "@/src/templates/landing-page/header";
import Works from "@/src/templates/landing-page/works";
import Benefits from "@/src/templates/landing-page/benefits";
import Testimonials from "@/src/templates/landing-page/testimonials";
import Psychologists from "@/src/templates/landing-page/psychologists";
import Princing from "@/src/templates/landing-page/pricing"
import Footer from "@/src/templates/landing-page/footer";


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
