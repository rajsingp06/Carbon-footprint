import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame, TrendingDown, CheckCircle2, Target, Sparkles, Award, Coins } from 'lucide-react';
import './Dashboard.css';

const monthlyData = [
  { name: 'Jan', footprint: 400 },
  { name: 'Feb', footprint: 350 },
  { name: 'Mar', footprint: 380 },
  { name: 'Apr', footprint: 310 },
  { name: 'May', footprint: 280 },
  { name: 'Jun', footprint: 250 },
];

const categoryData = [
  { name: '🚗 Transportation', value: 45, color: '#00FF9D' },
  { name: '⚡ Electricity', value: 30, color: '#00E5FF' },
  { name: '🍔 Food', value: 15, color: '#059669' },
  { name: '🛍️ Shopping', value: 10, color: '#FFD166' },
];

/**
 * Dashboard component displaying the user's carbon footprint score, trends,
 * weekly sustainability reports, and AI-generated action plans.
 * @returns {JSX.Element} The rendered Dashboard component.
 */
const Dashboard = () => {
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
        {/* Main Score Card */}
        <motion.div 
          className="score-card glass-panel"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="card-header">
            <h3>Sustainability Score</h3>
            <span className="badge">Excellent</span>
          </div>
          
          <div className="score-ring-container">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[{value: 85}, {value: 15}]}
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
              <h2>85</h2>
              <p>/100</p>
            </div>
          </div>
          
          <div className="ai-insight" aria-live="polite" style={{ marginTop: '10px' }}>
            <CheckCircle2 size={16} color="var(--color-neon-mint)" aria-hidden="true" style={{ marginTop: '4px' }} />
            <div>
              <strong>Weekly Sustainability Report</strong>
              <p style={{ marginTop: '4px' }}>AI Insight: Your transport emissions decreased significantly.</p>
            </div>
          </div>

          <div className="understand-section" style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <button className="glass-button-secondary" style={{ width: '100%', marginBottom: '15px' }}>
              Why is my footprint high?
            </button>
            <div className="ai-explanation" style={{ background: 'rgba(0, 255, 157, 0.1)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(0, 255, 157, 0.2)' }}>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                <strong style={{ color: 'var(--color-neon-mint)' }}>AI Explanation:</strong> Your largest contributor is transportation because you travel 18 km daily by car.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Trend Graph */}
        <motion.section 
          className="trend-card glass-panel"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          aria-label="6-Month Carbon Footprint Trend"
        >
          <header className="card-header" style={{ marginBottom: '15px' }}>
            <h3>6-Month Trend</h3>
            <TrendingDown color="var(--color-neon-mint)" size={20} aria-hidden="true" />
          </header>
          
          <div className="tracking-stats" style={{ display: 'flex', gap: '20px', marginBottom: '20px', background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px' }}>
            <div className="stat-column">
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>January</span>
              <p style={{ fontWeight: '600' }}>420 kg CO₂</p>
            </div>
            <div className="stat-column">
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>February</span>
              <p style={{ fontWeight: '600' }}>380 kg CO₂</p>
            </div>
            <div className="stat-column">
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>March</span>
              <p style={{ fontWeight: '600' }}>340 kg CO₂</p>
            </div>
            <div className="stat-column" style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Overall Progress</span>
              <p style={{ fontWeight: '700', color: 'var(--color-neon-mint)' }}>Reduction: 19%</p>
            </div>
          </div>

          <div className="chart-container" style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: 'rgba(11,15,25,0.9)', border: '1px solid var(--color-border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--color-neon-mint)' }}
                />
                <Line type="monotone" dataKey="footprint" stroke="var(--color-neon-mint)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-deep-navy)', stroke: 'var(--color-neon-mint)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.section>

        {/* Breakdown */}
        <motion.section 
          className="breakdown-card glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          aria-label="Emission Sources Breakdown"
        >
          <h3>Emission Sources</h3>
          <div className="categories-list">
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
        </motion.section>

        {/* AI Action Plan & Goals */}
        <motion.section 
          className="gamification-card glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          aria-label="AI Action Plan and Goals"
        >
          <header className="card-header">
            <h3>AI Action Plan & Goals</h3>
            <Target color="#FFD166" size={20} aria-hidden="true" />
          </header>
          
          {/* Goal-Based Reduction */}
          <div className="goal-section" style={{ marginBottom: '25px', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
            <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)' }}>Goal: Reduce carbon footprint by 20% in 60 days</h4>
            <div className="level-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
              <span>Current Progress:</span>
              <span style={{ color: 'var(--color-neon-mint)', fontWeight: '600' }}>80%</span>
            </div>
            <div className="progress-bar-bg" style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div className="progress-bar-fill" style={{ width: '80%', height: '100%', background: 'linear-gradient(90deg, #059669, #00FF9D)' }}></div>
            </div>
            <div style={{ marginTop: '8px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
              ████████░░ 80%
            </div>
          </div>
          
          {/* AI Action Plan This Week */}
          <div className="action-plan">
            <h4 style={{ color: 'var(--color-neon-mint)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} /> This Week's Plan
            </h4>
            
            <div className="action-items" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="action-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'rgba(0,255,157,0.05)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--color-neon-mint)' }}>
                <CheckCircle2 size={18} color="var(--color-neon-mint)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '4px' }}>Taking the train twice this week</p>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-emerald-green)', fontWeight: '600' }}>Save 8 kg CO₂</span>
                </div>
              </div>
              
              <div className="action-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'rgba(0,255,157,0.05)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--color-neon-mint)' }}>
                <CheckCircle2 size={18} color="var(--color-neon-mint)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '4px' }}>Reduce AC usage by 1 hour/day</p>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-emerald-green)', fontWeight: '600' }}>Save 5 kg CO₂</span>
                </div>
              </div>
              
              <div className="action-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'rgba(0,255,157,0.05)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--color-neon-mint)' }}>
                <CheckCircle2 size={18} color="var(--color-neon-mint)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '4px' }}>Carry reusable bottle</p>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-emerald-green)', fontWeight: '600' }}>Save 2 kg CO₂</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Eco-Rewards & Gamification */}
          <div className="gamification-section" style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <h4 style={{ color: '#FFD166', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={16} /> Eco-Rewards & Gamification
            </h4>
            
            <div className="rewards-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', background: 'rgba(255, 209, 102, 0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255, 209, 102, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Coins color="#FFD166" size={20} />
                <span style={{ fontWeight: '500' }}>Green Coins Earned</span>
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#FFD166' }}>1,250</span>
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
        </motion.section>
      </div>
    </motion.main>
  );
};

export default Dashboard;
