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
import StudioPage from './pages/StudioPage';
import FeedPage from './pages/FeedPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ContactPage from './pages/ContactPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
        className="flex-grow flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<ProjectDetailPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:slug" element={<ArticleDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white text-foreground relative selection:bg-black selection:text-white">
        {/* Architectural Grid Overlay (Ctrl+G Easter Egg) */}
        <GridOverlay />

        {/* Global Navigation Bar */}
        <Navbar />

        {/* Dynamic Route Content */}
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>

        {/* Global Floating Capybara Assistant */}
        <CapybaraAssistant />

        {/* Global Giant Editorial Footer */}
        <Footer />
      </div>
    </Router>
  );
}
