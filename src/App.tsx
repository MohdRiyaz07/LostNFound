import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Report from './pages/Report';
import Collect from './pages/Collect';
import Rewards from './pages/Rewards';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import { useAuthStore } from './store/authStore';

export default function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {user && (
              <>
                <Route path="/report" element={<Report />} />
                <Route path="/collect" element={<Collect />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile" element={<Profile />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}