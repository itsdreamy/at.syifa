import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/navigation/Navbar';
import Footer from './components/navigation/Footer';
import CapybaraAssistant from './components/capybara/CapybaraAssistant';
import GridOverlay from './components/common/GridOverlay';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import FeedPage from './pages/FeedPage';
import ArticleDetailPage from './pages/ArticleDetailPage';

// Page wrapper with gentle entrance fade transition
function AnimatedRoutes({ showFeed }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex-grow flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage showFeed={showFeed} />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<ProjectDetailPage />} />
          {showFeed && <Route path="/feed" element={<FeedPage />} />}
          {showFeed && <Route path="/feed/:slug" element={<ArticleDetailPage />} />}
          <Route path="*" element={<HomePage showFeed={showFeed} />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  // Feature flag for Feed section (can be toggled in config)
  const SHOW_FEED = true;

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#F7F7F5] text-[#171717] relative selection:bg-[#171717] selection:text-white">
        {/* Architectural Grid Overlay (Ctrl+G Easter Egg) */}
        <GridOverlay />

        {/* Global Navigation Bar */}
        <Navbar showFeed={SHOW_FEED} />

        {/* Dynamic Route Content */}
        <main className="flex-grow">
          <AnimatedRoutes showFeed={SHOW_FEED} />
        </main>

        {/* Global Floating Capybara Assistant */}
        <CapybaraAssistant />

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}
