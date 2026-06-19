import React from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, LayoutDashboard, ScanLine, MessageSquare } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="glass-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Leaf className="brand-icon" size={28} />
          <span className="brand-text text-gradient">EcoBuddy AI</span>
        </div>
        
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>
            Home
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/scanner" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <ScanLine size={18} /> Scanner
          </NavLink>
          <NavLink to="/chat" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <MessageSquare size={18} /> AI Chat
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
