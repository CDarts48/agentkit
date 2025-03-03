import React from 'react';
import styles from './code.module.css'; // Import the CSS module

const Header = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.navbarLogo}>Investment AI</div>
      <div className={styles.navbarLinks}>
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <button className={styles.loginButton}>Login/Sign In</button>
      </div>
    </header>
  );
};

export default Header;