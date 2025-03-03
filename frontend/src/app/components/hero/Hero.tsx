// filepath: /Users/corey/Desktop/agentkit/frontend/src/app/components/hero/Hero.tsx
import React from 'react';
import { IoSearch } from 'react-icons/io5';
import styles from './code.module.css'; // Import the CSS module

interface HeroProps {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: () => void;
  loading: boolean;
  results: string | null;
}

const Hero: React.FC<HeroProps> = ({ query, setQuery, handleSearch, loading, results }) => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1>Investment AI</h1>
        <p>Your AI-Powered Investment Assistant</p>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Ask about investments, stocks, market trends..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            className={styles.searchButton} 
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <div className={styles.spinner}></div>
            ) : (
              <IoSearch size={24} color="#fff" />
            )}
          </button>
        </div>
        {results && (
          <div className={styles.resultsContainer}>
            <h2>Chatbot Response</h2>
            <p>{results}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;