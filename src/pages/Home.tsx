import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Award, ClipboardList } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Lost Something on Campus?
        </h1>
        <p className="text-xl text-gray-600">
          Report lost items and help others find their belongings while earning rewards
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="feature-card">
          <Search className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Report Lost Items</h3>
          <p className="text-gray-600">
            Quickly report lost items with details and images to help others find them
          </p>
        </div>

        <div className="feature-card">
          <ClipboardList className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Collection</h3>
          <p className="text-gray-600">
            Browse found items and claim yours through a simple verification process
          </p>
        </div>

        <div className="feature-card">
          <Award className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
          <p className="text-gray-600">
            Get reward points for helping the community by reporting lost items
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/register"
          className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}