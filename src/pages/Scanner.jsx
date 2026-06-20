import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle, Zap, Activity } from 'lucide-react';
import { useCarbon } from '../context/CarbonContext';
import './Scanner.css';

/**
 * Scanner component for uploading and analyzing bills and receipts using AI OCR.
 * @returns {JSX.Element} The rendered Scanner component.
 */
const Scanner = () => {
  const [dragActive, setDragActive] = useState(false);
  const [scanState, setScanState] = useState('idle'); // idle, scanning, complete
  const { scanBill } = useCarbon();
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const simulateScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      const billData = { emissions: 287, category: 'Electricity', usage: '380 kWh' };
      scanBill(billData);
      setScanState('complete');
    }, 2500);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateScan();
    }
  };

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
    <motion.main 
      className="scanner-container container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      aria-labelledby="scanner-title"
    >
      <motion.header 
        className="scanner-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 id="scanner-title" className="text-gradient">Smart AI Scanner</h1>
        <p>Upload your electricity bills, fuel receipts, shopping receipts, or grocery receipts to extract carbon data instantly.</p>
      </motion.header>

      <section className="scanner-content" aria-live="polite">
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
              role="button"
              tabIndex="0"
              aria-label="Drag and drop file upload zone"
            >
              <input type="file" id="file-upload" multiple={false} onChange={handleChange} accept="image/*,.pdf" aria-label="File upload input" />
              <label htmlFor="file-upload" className="upload-label">
                <div className="upload-icon-wrapper">
                  <UploadCloud size={48} color="var(--color-neon-mint)" aria-hidden="true" />
                </div>
                <h3>Drag & Drop your bill here</h3>
                <p>or click to browse files</p>
                <span className="file-types">Supports PDF, JPG, PNG (Electricity, Fuel, Grocery)</span>
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
                  <h3>380 kWh</h3>
                </div>
                <div className="ext-card glass-panel highlight">
                  <span>Estimated Emissions</span>
                  <h3>287 kg CO₂</h3>
                </div>
              </div>

              <div className="ai-recommendation glass-panel">
                <h3 style={{ marginBottom: '15px' }}>Dynamically Added to Dashboard</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} color="var(--color-neon-mint)"/> <span>Emission Sources</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} color="var(--color-neon-mint)"/> <span>Monthly Tracking</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} color="var(--color-neon-mint)"/> <span>AI Recommendations</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle size={16} color="var(--color-neon-mint)"/> <span>Carbon Forecast</span></div>
                </div>
                
                <button className="glass-button" onClick={resetScanner} style={{marginTop: '25px'}} aria-label="Scan another bill or receipt">
                  Scan Another Bill
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.main>
  );
};

export default Scanner;
