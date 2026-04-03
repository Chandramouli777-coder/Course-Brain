/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NotesGenerator from './pages/NotesGenerator';
import QuizGenerator from './pages/QuizGenerator';
import CareerRoadmap from './pages/CareerRoadmap';
import CodeExamples from './pages/CodeExamples';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NeuralToolPage from './pages/NeuralToolPage';
import Tools from './pages/Tools';
import LoadingScreen from './components/LoadingScreen';
import WelcomeScreen from './components/WelcomeScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem('visited');
    if (!visited) {
      setShowWelcome(true);
    } else {
      setIsLoading(true);
    }
  }, []);

  const handleWelcomeComplete = () => {
    localStorage.setItem('visited', 'true');
    setShowWelcome(false);
    setIsLoading(true);
  };

  return (
    <div className="font-sans selection:bg-[#ff3b3b]/30 selection:text-[#ff3b3b]">
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen key="welcome" onComplete={handleWelcomeComplete} />
        )}
        {isLoading && !showWelcome && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && !isLoading && (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tools" element={<Tools />} />
            
            {/* AI Tool Routes */}
            <Route path="/video-notes" element={<NotesGenerator />} />
            <Route path="/audio-notes" element={<NotesGenerator />} />
            <Route path="/notes-visual" element={<NotesGenerator />} />
            <Route path="/career-guidance" element={<CareerRoadmap />} />
            <Route path="/summary" element={<NotesGenerator />} />
            <Route path="/prep" element={<NotesGenerator />} />
            <Route path="/quiz" element={<QuizGenerator />} />
            <Route path="/code-examples" element={<CodeExamples />} />
            
            {/* Advanced Tool Routes */}
            <Route path="/mock" element={<NeuralToolPage />} />
            <Route path="/weak-topics" element={<NeuralToolPage />} />
            <Route path="/graph" element={<NeuralToolPage />} />
            <Route path="/algo" element={<NeuralToolPage />} />
            <Route path="/viz" element={<NeuralToolPage />} />
            <Route path="/flashcards" element={<NeuralToolPage />} />
            <Route path="/sync" element={<NeuralToolPage />} />
            <Route path="/focus" element={<NeuralToolPage />} />
            <Route path="/skill-tree" element={<NeuralToolPage />} />
            <Route path="/pulse" element={<NeuralToolPage />} />
            <Route path="/cortex" element={<NeuralToolPage />} />
            
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}
