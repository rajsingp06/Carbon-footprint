import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CarbonProvider } from './context/CarbonContext';

import ParticlesBackground from './components/ParticlesBackground';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Scanner from './pages/Scanner';
import Chat from './pages/Chat';
import './App.css';

/**
 * AnimatedRoutes component that wraps the main routing logic 
 * with Framer Motion's AnimatePresence for smooth page transitions.
 * @returns {JSX.Element} The routes wrapped in AnimatePresence.
 */
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </AnimatePresence>
  );
};

/**
 * Main App component serving as the root of the EcoBuddy AI application.
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  return (
    <BrowserRouter>
      <CarbonProvider>
        <div className="app-container">
          <ParticlesBackground />
          <Navbar />
          <main className="main-content" id="main-content" aria-label="Main Content">
            <AnimatedRoutes />
          </main>
        </div>
      </CarbonProvider>
    </BrowserRouter>
  );
}

export default App;
