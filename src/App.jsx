import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Inbox from './pages/Inbox';
import Library from './pages/Library';
import TheLab from './pages/TheLab';
import DeepDive from './pages/DeepDive';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/inbox" replace />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/library" element={<Library />} />
        <Route path="/lab" element={<TheLab />} />
        <Route path="/deepdive/:id" element={<DeepDive />} />
      </Routes>
    </BrowserRouter>
  );
}
