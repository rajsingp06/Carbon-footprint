import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame, TrendingDown, CheckCircle2, Target, Sparkles, Award, BarChart2, Download, Zap, Leaf } from 'lucide-react';
import { useCarbon } from '../context/CarbonContext';
import './Dashboard.css';

/**
 * Dashboard component displaying the user's carbon footprint score, trends,
 * weekly sustainability reports, and AI-generated action plans.
 * @returns {JSX.Element} The rendered Dashboard component.
 */
const Dashboard = () => {
  const { footprint, totalSaved, score, monthlyData, categoryData, roadmapSteps, completeAction } = useCarbon();
  
  // Impact Simulator State
  const [simulatorScenario, setSimulatorScenario] = useState('none');
  
  const getSimulatorProjection = () => {
    if (simulatorScenario === 'train') return { projected: footprint - 60, savings: 60, percentage: 14 };
    if (simulatorScenario === 'ac') return { projected: footprint - 5, savings: 5, percentage: 1 };
    return { projected: footprint, savings: 0, percentage: 0 };
  };
  const projection = getSimulatorProjection();

  return (
    <motion.main 
      className="dashboard-container container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      aria-labelledby="dashboard-title"
    >
      <motion.header 
        className="dashboard-header personalized-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}
      >
        <div className="greeting-section">
          <h1 id="dashboard-title" className="text-gradient">Good Morning Raj 👋</h1>
          <div className="personalized-insights" style={{ marginTop: '15px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', borderLeft: '4px solid var(--color-neon-mint)' }}>
            <p style={{ marginBottom: '8px', fontWeight: '500' }}>Based on your habits:</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>• Transportation is your highest contributor</li>
              <li>• You can reduce emissions by 12% this month</li>
              <li>• Estimated savings: <strong style={{color: 'var(--color-neon-mint)'}}>48 kg CO₂</strong></li>
            </ul>
          </div>
        </div>
        <div className="streak-badge glass-panel" aria-label="Eco Streak: 14 Days">
          <Flame color="#FFD166" size={20} aria-hidden="true" />
          <span>14 Day Eco Streak</span>
        </div>
      </motion.header>

      <div className="dashboard-grid">
        
        {/* =======================================
            SECTION 1: UNDERSTAND
        ======================================= */}
        <motion.div 
          className="score-card glass-panel"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="card-header">
            <h3>UNDERSTAND: Your Impact</h3>
            <span className="badge">Excellent</span>
          </div>
          
          <div className="score-ring-container">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[{value: score}, {value: 100 - score}]}
                  innerRadius={70}
                  outerRadius={90}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill="var(--color-neon-mint)" />
                  <Cell fill="rgba(255,255,255,0.05)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="score-value">
              <h2>{score}</h2>
              <p>/100</p>
            </div>
          </div>
          
          <div className="ai-insight" aria-live="polite" style={{ marginTop: '10px' }}>
            <CheckCircle2 size={16} color="var(--color-neon-mint)" aria-hidden="true" style={{ marginTop: '4px' }} />
            <div>
              <strong>Current Footprint</strong>
              <p style={{ marginTop: '4px', color: '#FFD166', fontWeight: 'bold' }}>{footprint} kg CO₂ / month</p>
            </div>
          </div>

          <div className="understand-section" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart2 size={16}/> Benchmark Comparison
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>You:</span> <strong style={{ color: 'var(--color-neon-mint)' }}>{footprint} kg CO₂</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>City Average:</span> <strong>410 kg CO₂</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>National Average:</span> <strong>470 kg CO₂</strong>
              </div>
              <div style={{ marginTop: '5px', padding: '8px', background: 'rgba(0,255,157,0.1)', borderRadius: '6px', textAlign: 'center', color: 'var(--color-neon-mint)', fontWeight: 'bold' }}>
                You are {Math.round(((410 - footprint) / 410) * 100)}% below average
              </div>
            </div>
          </div>

          <div className="understand-section" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ marginBottom: '10px', fontSize: '0.9rem' }}>AI-Powered Emission Source Analysis</h4>
            
            <div className="categories-list" style={{ marginBottom: '15px' }}>
              {categoryData.map((cat, index) => (
                <div key={index} className="category-item">
                  <div className="cat-info">
                    <div className="cat-dot" style={{ backgroundColor: cat.color }}></div>
                    <span>{cat.name}</span>
                  </div>
                  <div className="cat-bar-container">
                    <div className="cat-bar" style={{ width: `${cat.value}%`, backgroundColor: cat.color }}></div>
                  </div>
                  <span className="cat-value">{cat.value}%</span>
                </div>
              ))}
            </div>

            <div className="ai-explanation" style={{ background: 'rgba(0, 255, 157, 0.1)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(0, 255, 157, 0.2)' }}>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                <strong style={{ color: 'var(--color-neon-mint)' }}>Why is my footprint high?</strong> Your largest contributor is transportation. Uploaded receipts show high personal vehicle usage.
              </p>
            </div>
          </div>
        </motion.div>

        {/* =======================================
            SECTION 2: TRACK
        ======================================= */}
        <motion.section 
          className="trend-card glass-panel"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <header className="card-header" style={{ marginBottom: '15px' }}>
            <h3>TRACK: Footprint Trends</h3>
            <TrendingDown color="var(--color-neon-mint)" size={20} aria-hidden="true" />
          </header>
          
          <div className="chart-container" style={{ height: '220px', marginBottom: '25px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(11,15,25,0.9)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--color-neon-mint)' }}
                />
                <Line type="monotone" dataKey="footprint" stroke="var(--color-neon-mint)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-deep-navy)', stroke: 'var(--color-neon-mint)' }} connectNulls />
                <Line type="monotone" dataKey="forecast" stroke="#FFD166" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4, fill: 'var(--color-deep-navy)', stroke: '#FFD166' }} connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Carbon Savings Tracker */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ color: 'var(--color-neon-mint)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Leaf size={16}/> Carbon Savings Tracker
            </h4>
            <div style={{ marginBottom: '15px' }}>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>This Month Saved:</span>
              <h2 style={{ color: 'var(--color-neon-mint)', marginTop: '5px' }}>{totalSaved} kg CO₂</h2>
            </div>
            
            <p style={{ fontSize: '0.85rem', marginBottom: '10px', color: 'rgba(255,255,255,0.6)' }}>Equivalent To:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>🌳</span> <strong>{Math.floor(totalSaved / 20)} Trees Planted</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>🚗</span> <strong>{totalSaved * 4} km Less Driving</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>⚡</span> <strong>{totalSaved * 2} Hours of LED Usage</strong>
              </div>
            </div>
          </div>

          <button className="glass-button" style={{ width: '100%', marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <Download size={18} /> Download Monthly AI Report
          </button>
        </motion.section>

        {/* =======================================
            SECTION 3: REDUCE
        ======================================= */}
        <motion.section 
          className="gamification-card glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ gridColumn: '1 / -1' }}
        >
          <header className="card-header" style={{ marginBottom: '25px' }}>
            <h3>REDUCE: My Carbon Reduction Roadmap</h3>
            <Target color="#FFD166" size={20} aria-hidden="true" />
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            
            {/* Action Completion System */}
            <div className="action-plan">
              <div className="goal-section" style={{ marginBottom: '20px', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Current: <strong>{footprint} kg CO₂</strong></span>
                  <span>Goal: <strong>250 kg CO₂</strong></span>
                </div>
                <div className="progress-bar-bg" style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div className="progress-bar-fill" style={{ width: `${Math.min(100, ((420 - footprint) / 170) * 100)}%`, height: '100%', background: 'linear-gradient(90deg, #059669, #00FF9D)' }}></div>
                </div>
                <p style={{ marginTop: '10px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>Target Date: 90 Days</p>
              </div>

              <h4 style={{ color: 'var(--color-neon-mint)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} /> AI Carbon Reduction Coach
              </h4>
              
              <div className="action-items" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {roadmapSteps.map((step) => (
                  <div key={step.id} className="action-item" style={{ background: step.status === 'Completed' ? 'rgba(0,255,157,0.15)' : 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', borderLeft: step.status === 'Completed' ? '4px solid var(--color-neon-mint)' : '4px solid rgba(255,255,255,0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <p style={{ fontSize: '1rem', fontWeight: '600', margin: 0, textDecoration: step.status === 'Completed' ? 'line-through' : 'none' }}>{step.title}</p>
                      
                      {/* Checkbox System */}
                      <button 
                        onClick={() => completeAction(step.id)}
                        disabled={step.status === 'Completed'}
                        style={{ 
                          background: step.status === 'Completed' ? 'var(--color-neon-mint)' : 'transparent', 
                          border: '1px solid var(--color-neon-mint)', 
                          color: step.status === 'Completed' ? '#000' : 'var(--color-neon-mint)',
                          padding: '4px 8px', borderRadius: '4px', cursor: step.status === 'Completed' ? 'default' : 'pointer',
                          fontSize: '0.75rem', fontWeight: 'bold'
                        }}>
                        {step.status === 'Completed' ? '☑ Completed' : (step.status === 'In Progress' ? '☐ In Progress' : '☐ Not Started')}
                      </button>
                    </div>
                    
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <p><strong>Why it matters:</strong> {step.why}</p>
                      <p><strong>Carbon savings:</strong> {step.savings} kg CO₂</p>
                      <p><strong>Difficulty level:</strong> {step.difficulty}</p>
                      <p><strong>Time required:</strong> {step.time}</p>
                      <p><strong>Estimated impact:</strong> {step.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Simulator */}
            <div>
              <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 209, 102, 0.3)' }}>
                <h4 style={{ color: '#FFD166', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={18} /> Impact Simulator
                </h4>
                <p style={{ fontSize: '0.85rem', marginBottom: '15px', color: 'rgba(255,255,255,0.7)' }}>Test lifestyle changes before committing to see projected results.</p>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px' }}>Select Scenario:</label>
                  <select 
                    value={simulatorScenario} 
                    onChange={(e) => setSimulatorScenario(e.target.value)}
                    style={{ width: '100%', padding: '10px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }}
                  >
                    <option value="none">-- Choose an action --</option>
                    <option value="train">Use Train 3x Weekly</option>
                    <option value="ac">Reduce AC Usage by 1 Hour Daily</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.9rem' }}>Current Footprint:</span>
                    <strong>{footprint} kg CO₂/month</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFD166' }}>
                    <span style={{ fontSize: '0.9rem' }}>Projected Footprint:</span>
                    <strong>{projection.projected} kg CO₂/month</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-neon-mint)' }}>
                    <span style={{ fontSize: '0.9rem' }}>Projected Savings:</span>
                    <strong>{projection.savings} kg CO₂/month</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-neon-mint)' }}>
                    <span style={{ fontSize: '0.9rem' }}>Reduction:</span>
                    <strong>{projection.percentage}%</strong>
                  </div>
                </div>
              </div>

              {/* Challenges */}
              <div className="gamification-section" style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <h4 style={{ color: '#FFD166', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={16} /> Reduction Challenges & Eco-Rewards
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.05)', padding: '10px 15px', borderRadius: '6px' }}>
                    <span style={{ fontSize: '0.9rem' }}><strong>Weekly:</strong> Zero-Waste Grocery Run</span>
                    <span style={{ fontSize: '0.85rem', color: '#FFD166' }}>+500 Coins</span>
                  </div>
                </div>

                <div className="badges-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="badge-item earned active" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-neon-mint)' }}>
                    <Award size={24} color="var(--color-neon-mint)" style={{ marginBottom: '5px' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Carbon Saver</span>
                  </div>
                  <div className="badge-item earned" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px' }}>
                    <Award size={24} color="#FFD166" style={{ marginBottom: '5px' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Eco Warrior</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.section>

      </div>
    </motion.main>
  );
};

export default Dashboard;
