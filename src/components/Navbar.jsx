import { NavLink } from 'react-router-dom';
import { Leaf, LayoutDashboard, ScanLine, MessageSquare } from 'lucide-react';
import './Navbar.css';

/**
 * Navbar component for global site navigation.
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar = () => {
  return (
    <nav className="glass-navbar" aria-label="Main Navigation">
      <div className="navbar-container">
        <div className="navbar-brand" aria-hidden="true">
          <Leaf className="brand-icon" size={28} />
          <span className="brand-text text-gradient">EcoBuddy AI</span>
        </div>
        
        <div className="nav-links" role="menubar">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end role="menuitem" aria-label="Home page">
            Home
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} role="menuitem" aria-label="Dashboard page">
            <LayoutDashboard size={18} aria-hidden="true" /> Dashboard
          </NavLink>
          <NavLink to="/scanner" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} role="menuitem" aria-label="Scanner page">
            <ScanLine size={18} aria-hidden="true" /> Scanner
          </NavLink>
          <NavLink to="/chat" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} role="menuitem" aria-label="AI Chat page">
            <MessageSquare size={18} aria-hidden="true" /> AI Chat
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
