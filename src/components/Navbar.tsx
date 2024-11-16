import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, LogOut, Award, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Search className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-xl">LostNFound</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/report" className="nav-link">Report Item</Link>
                <Link to="/collect" className="nav-link">Collect</Link>
                <Link to="/rewards" className="flex items-center space-x-1">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span>{user.rewardPoints} pts</span>
                </Link>
                <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
                <Link to="/profile" className="nav-link flex items-center space-x-1">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}