import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Zap, CloudRain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="earth-container">
          <div className="earth-sphere">
            <div className="earth-glow"></div>
            <div className="earth-texture"></div>
          </div>
          <div className="carbon-pulse"></div>
        </div>

        <div className="hero-content">
          <motion.div 
            className="ai-greeting glass-panel"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span className="typing-indicator"></span>
            <p>Hi, I'm EcoBuddy AI.</p>
          </motion.div>

          <h1 className="hero-title">
            Your Personal <br/>
            <span className="text-gradient">AI Climate Coach</span>
          </h1>
          
          <p className="hero-subtitle">
            Track emissions, understand your impact, and build greener habits with AI.
          </p>

          <motion.button 
            className="glass-button cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
          >
            Start My Green Journey <ArrowRight size={20} />
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        className="metrics-grid"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="metric-card glass-panel">
          <Leaf className="metric-icon green" />
          <div className="metric-info">
            <h3>42kg</h3>
            <p>Avg Daily Saving</p>
          </div>
        </div>
        <div className="metric-card glass-panel">
          <Zap className="metric-icon yellow" />
          <div className="metric-info">
            <h3>2.4x</h3>
            <p>Efficiency Rate</p>
          </div>
        </div>
        <div className="metric-card glass-panel">
          <CloudRain className="metric-icon blue" />
          <div className="metric-info">
            <h3>15%</h3>
            <p>Below Average</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
