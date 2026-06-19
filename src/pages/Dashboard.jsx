import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame, Trophy, TrendingDown, Target, Award, CheckCircle2 } from 'lucide-react';
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

const Dashboard = () => {
  return (
    <motion.div 
      className="dashboard-container container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-gradient">Your Impact</h1>
          <p>You're doing great! Emissions are down 15% this month.</p>
        </div>
        <div className="streak-badge glass-panel">
          <Flame color="#FFD166" size={20} />
          <span>14 Day Eco Streak</span>
        </div>
      </motion.div>

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
          
          <div className="ai-insight">
            <CheckCircle2 size={16} color="var(--color-neon-mint)" />
            <p>AI Insight: Your transport emissions decreased significantly.</p>
          </div>
        </motion.div>

        {/* Trend Graph */}
        <motion.div 
          className="trend-card glass-panel"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="card-header">
            <h3>6-Month Trend</h3>
            <TrendingDown color="var(--color-neon-mint)" size={20} />
          </div>
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
        </motion.div>

        {/* Breakdown */}
        <motion.div 
          className="breakdown-card glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
        </motion.div>

        {/* Gamification */}
        <motion.div 
          className="gamification-card glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="card-header">
            <h3>Achievements</h3>
            <Trophy color="#FFD166" size={20} />
          </div>
          
          <div className="level-progress">
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
            <div className="badge-item locked">
              <Award size={24} />
              <span>Guardian</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
