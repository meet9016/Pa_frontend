import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import ProtectedRoute from './pages/routes/ProtectedRoute'
import AppRoutes from './pages/routes/AppRoutes'
import Toaster from './component/Toaster';
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

function App() {
  useEffect(() => {
    // Initialize Lenis for ultra smooth scroll across all pages
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,         // smoothness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* <Login /> */}
      {/* <Header /> */}
      {/* <SubHeader /> */}
      {/* <SubData /> */}
      {/* <SubDetail />
      <Footer /> */}
      <Toaster />
      <Router>
        <AppRoutes />
      </Router>
    </>
  )
}

export default App














































































