import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useItemsStore } from '../store/itemsStore';
import { Award, Clock, TrendingUp } from 'lucide-react';

export default function Rewards() {
  const user = useAuthStore((state) => state.user);
  const rewardHistory = useItemsStore((state) => state.rewardHistory);

  const userHistory = rewardHistory.filter((h) => h.userId === user?.id);
  const totalPoints = userHistory.reduce((sum, h) => sum + h.points, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your Rewards</h2>
            <p className="text-gray-600">Keep helping others to earn more points!</p>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-8 w-8 text-yellow-500" />
            <span className="text-3xl font-bold">{totalPoints}</span>
            <span className="text-gray-600">points</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold">Reward History</h3>
        </div>
        <div className="divide-y">
          {userHistory.map((history) => (
            <div key={history.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{history.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(history.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +{history.points} points
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}