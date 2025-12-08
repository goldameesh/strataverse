'use client';

import React from 'react';

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Cosmic Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-royal-blue-900 to-black">
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gold-500"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5 + 0.2,
                animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
                animationDelay: Math.random() * 5 + 's',
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo / Title */}
        <div className="text-center mb-12 animate-float">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 gradient-text-gold font-headline">
            STRATAVERSE™
          </h1>
          <p className="text-xl md:text-2xl text-platinum-300 max-w-3xl mx-auto">
            The Universal Strategic Archetype Engine
          </p>
          <div className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
        </div>
        
        {/* Main Glass Card */}
        <div className="w-full max-w-4xl mb-8">
          <div className="glass rounded-xl p-8 text-center hover:border-gold-500 transition-all duration-300">
            <h2 className="text-3xl font-bold mb-6 text-platinum-50">
              Welcome, Amish Shah
            </h2>
            
            <p className="text-lg text-platinum-200 mb-8 leading-relaxed">
              Evidence-based, ethically governed strategic intelligence system built to architect 
              organizational strategy using proven archetypes, AI-powered composition, and 
              Bhagavad Gita ethical guardrails.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-7 py-3.5 text-lg bg-gradient-to-r from-gold-500 to-gold-600 text-cosmic-black rounded-lg font-medium hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-lg hover:shadow-gold-500/50">
                Start Strategy Journey
              </button>
              <button className="px-7 py-3.5 text-lg glass rounded-lg font-medium hover:border-gold-500 transition-all duration-300">
                Explore Archetypes
              </button>
            </div>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          <div className="glass rounded-xl p-6 text-center hover:border-royal-blue-500 transition-all duration-300 hover:-translate-y-2">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2 text-platinum-50">10 Archetypes</h3>
            <p className="text-platinum-300">
              Pre-loaded strategic patterns from proven leaders
            </p>
          </div>
          
          <div className="glass rounded-xl p-6 text-center hover:border-royal-blue-500 transition-all duration-300 hover:-translate-y-2">
            <div className="text-4xl mb-4">⚖️</div>
            <h3 className="text-xl font-bold mb-2 text-platinum-50">Gita Guardrails</h3>
            <p className="text-platinum-300">
              7 ethical filters for dharmic strategy
            </p>
          </div>
          
          <div className="glass rounded-xl p-6 text-center hover:border-royal-blue-500 transition-all duration-300 hover:-translate-y-2">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2 text-platinum-50">Impact Simulation</h3>
            <p className="text-platinum-300">
              Forecast outcomes across 8 dimensions
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-platinum-400 text-sm">
        <p className="mb-2">Powered & deeply researched by Bhramaastra Advisory Services</p>
        <p className="mb-2">© Bhramaastra Advisory Services | All Rights Reserved</p>
        <div className="flex flex-wrap justify-center gap-4 px-4">
          <a href="https://www.bhramaastraadvisory.com" className="hover:text-gold-500 transition-colors">
            www.bhramaastraadvisory.com
          </a>
          <span className="hidden sm:inline">|</span>
          <a href="tel:+971504090727" className="hover:text-gold-500 transition-colors">
            +971 50 409 0727
          </a>
          <span className="hidden sm:inline">|</span>
          <a href="mailto:connect@bhramaastraadvisoryservices.com" className="hover:text-gold-500 transition-colors">
            connect@bhramaastraadvisoryservices.com
          </a>
        </div>
      </footer>
    </main>
  );
}
