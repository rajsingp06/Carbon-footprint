import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle, Zap, Activity } from 'lucide-react';
import './Scanner.css';

const Scanner = () => {
  const [dragActive, setDragActive] = useState(false);
  const [scanState, setScanState] = useState('idle'); // idle, scanning, complete
  
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const simulateScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('complete');
    }, 3000);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateScan();
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      simulateScan();
    }
  };

  const resetScanner = () => {
    setScanState('idle');
  };

  return (
    <motion.div 
      className="scanner-container container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="scanner-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-gradient">Smart AI Scanner</h1>
        <p>Upload your energy bills or receipts to extract carbon data instantly.</p>
      </motion.div>

      <div className="scanner-content">
        <AnimatePresence mode="wait">
          {scanState === 'idle' && (
            <motion.div 
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`upload-zone glass-panel ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input type="file" id="file-upload" multiple={false} onChange={handleChange} accept="image/*,.pdf" />
              <label htmlFor="file-upload" className="upload-label">
                <div className="upload-icon-wrapper">
                  <UploadCloud size={48} color="var(--color-neon-mint)" />
                </div>
                <h3>Drag & Drop your bill here</h3>
                <p>or click to browse files</p>
                <span className="file-types">Supports PDF, JPG, PNG</span>
              </label>
            </motion.div>
          )}

          {scanState === 'scanning' && (
            <motion.div 
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="scanning-state glass-panel"
            >
              <div className="scan-animation">
                <FileText size={64} color="rgba(255,255,255,0.2)" />
                <div className="scan-line"></div>
              </div>
              <h3>AI OCR Processing...</h3>
              <p>Extracting usage data and calculating carbon impact</p>
              <div className="processing-steps">
                <motion.div className="step" initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.5}}><Activity size={16}/> Analyzing Document</motion.div>
                <motion.div className="step" initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1.5}}><Zap size={16}/> Extracting kWh Data</motion.div>
                <motion.div className="step" initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 2.5}}><CheckCircle size={16}/> Calculating Footprint</motion.div>
              </div>
            </motion.div>
          )}

          {scanState === 'complete' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="result-dashboard"
            >
              <div className="result-header">
                <CheckCircle size={32} color="var(--color-neon-mint)" />
                <h2>Analysis Complete</h2>
              </div>

              <div className="extracted-cards">
                <div className="ext-card glass-panel">
                  <span>Document Type</span>
                  <h3>Electricity Bill</h3>
                </div>
                <div className="ext-card glass-panel">
                  <span>Usage Extracted</span>
                  <h3>345 kWh</h3>
                </div>
                <div className="ext-card glass-panel highlight">
                  <span>Carbon Impact</span>
                  <h3>142 kg CO₂</h3>
                </div>
              </div>

              <div className="ai-recommendation glass-panel">
                <h3>AI Recommendation</h3>
                <p>Your energy usage is 12% higher than similar households this month. Switching to LED bulbs and adjusting your thermostat by 1 degree could save you roughly 15 kg CO₂ and $24 next month.</p>
                
                <button className="glass-button" onClick={resetScanner} style={{marginTop: '20px'}}>
                  Scan Another Bill
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Scanner;
