"use client";
import { useState, useEffect } from "react";


import Hero from "@/components/pages/hero";
import Features from "@/components/pages/features";
import Header from "@/components/pages/header";
import Works from "@/components/pages/works";
import Benefits from "@/components/pages/benefits";
import Testimonials from "@/components/pages/testimonials";
import Psychologists from "@/components/pages/psychologists";
import Princing from "@/components/pages/pricing"
import Footer from "@/components/pages/footer";


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
