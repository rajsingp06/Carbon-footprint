import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame, Trophy, TrendingDown, Award, CheckCircle2 } from 'lucide-react';
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
  { name: 'Transport', value: 45, color: '#00FF9D' },
  { name: 'Energy', value: 30, color: '#00E5FF' },
  { name: 'Food', value: 15, color: '#059669' },
  { name: 'Shopping', value: 10, color: '#FFD166' },
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
        className="dashboard-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 id="dashboard-title" className="text-gradient">Your Impact</h1>
          <p>You're doing great! Emissions are down 15% this month.</p>
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
          
          <div className="ai-insight" aria-live="polite">
            <CheckCircle2 size={16} color="var(--color-neon-mint)" aria-hidden="true" />
            <div>
              <strong>Weekly Sustainability Report</strong>
              <p>AI Insight: Your transport emissions decreased significantly.</p>
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
          <header className="card-header">
            <h3>6-Month Trend</h3>
            <TrendingDown color="var(--color-neon-mint)" size={20} aria-hidden="true" />
          </header>
          <div className="chart-container">
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

        {/* Gamification */}
        <motion.section 
          className="gamification-card glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          aria-label="Gamification and Achievements"
        >
          <header className="card-header">
            <h3>Achievements & AI-Generated Action Plans</h3>
            <Trophy color="#FFD166" size={20} aria-hidden="true" />
          </header>
          
          <div className="level-progress" aria-label="Level Explorer, 1250 out of 2000 XP">
            <div className="level-header">
              <span>Level: <strong className="text-gradient">Explorer</strong></span>
              <span>1,250 / 2,000 XP</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '62%' }}></div>
            </div>
          </div>

          <div className="badges-grid">
            <div className="badge-item earned">
              <Award size={24} />
              <span>Seedling</span>
            </div>
            <div className="badge-item earned">
              <Award size={24} />
              <span>Sprout</span>
            </div>
            <div className="badge-item earned active">
              <Award size={24} />
              <span>Explorer</span>
            </div>
            <div className="badge-item locked" aria-label="Locked Badge: Guardian">
              <Award size={24} aria-hidden="true" />
              <span>Guardian</span>
            </div>
          </div>
          
          <div className="action-plan" style={{ marginTop: '20px' }}>
            <h4 style={{ color: 'var(--color-neon-mint)', marginBottom: '8px' }}>Active Action Plan (Habit Tracking)</h4>
            <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
              <li>Cycle to work 2x this week</li>
              <li>Reduce meat consumption by 1 meal</li>
            </ul>
          </div>
        </motion.section>
      </div>
    </motion.main>
  );
};

export default Dashboard;
