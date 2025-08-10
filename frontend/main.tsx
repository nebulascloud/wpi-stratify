import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/index';
import MaturityPage from './pages/maturity';
import './styles/maturity.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maturity" element={<MaturityPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);