// filepath: /Users/corey/Desktop/agentkit/frontend/src/app/page.tsx
'use client'

import React, { useState } from 'react';
import { FaChartLine, FaLaptopCode, FaLayerGroup, FaShieldAlt, FaHistory, FaInfoCircle } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import './code.module.css'; // Corrected import statement
import Header from './components/header/Header'; // Import the Header component

export default function InvestmentAIPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Best tech stocks for 2025',
    'High dividend ETFs',
    'Cryptocurrency investment strategy'
  ]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    
    try {
      // Using the provided AI LLM API
      const response = await fetch('https://api.a0.dev/ai/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are an expert investment advisor AI. Provide concise, actionable investment advice based on the query. Include relevant market insights, risks, and potential opportunities. Format your response with clear sections and bullet points where appropriate.'
            },
            {
              role: 'user',
              content: query
            }
          ]
        })
      });
      
      const data = await response.json();
      setResults(data.completion);
      
      // Add to recent searches if not already present
      if (!recentSearches.includes(query)) {
        setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
      }
    } catch (error) {
      setResults('Sorry, there was an error processing your request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecentSearch = (search: string) => {
    setQuery(search);
    // Optional: Automatically trigger search
    // setTimeout(() => handleSearch(), 100);
  };

  return (
    <>
      <Header /> {/* Use the Header component */}

      <section className="hero-section">
        <div className="hero-content">
          <h1>Investment AI</h1>
          <p>Your AI-Powered Investment Assistant</p>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Ask about investments, stocks, market trends..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              className="search-button" 
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? (
                <div className="spinner"></div>
              ) : (
                <IoSearch size={24} color="#fff" />
              )}
            </button>
          </div>
        </div>
      </section>
      
      <section id="features" className="features-section">
        <h2>Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <FaChartLine size={48} color="#00ccff" />
            <h3>Market Analysis</h3>
            <p>Get the latest market insights and trends.</p>
          </div>
          <div className="feature-item">
            <FaLaptopCode size={48} color="#00ccff" />
            <h3>Tech Outlook</h3>
            <p>Understand the future of technology investments.</p>
          </div>
          <div className="feature-item">
            <FaLayerGroup size={48} color="#00ccff" />
            <h3>Portfolio Diversity</h3>
            <p>Diversify your investments for better returns.</p>
          </div>
          <div className="feature-item">
            <FaShieldAlt size={48} color="#00ccff" />
            <h3>Safe Investments</h3>
            <p>Find safe investment options during market volatility.</p>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <h2>About Us</h2>
        <p>Investment AI is your trusted partner in making informed investment decisions using advanced AI technology.</p>
      </section>

      <section id="contact" className="contact-section">
        <h2>Contact Us</h2>
        <p>Have questions? Reach out to us at contact@investmentai.com.</p>
      </section>

      <footer className="footer">
        <p>&copy; 2025 Investment AI. All rights reserved.</p>
      </footer>
    </>
  );
}