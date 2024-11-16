import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useItemsStore } from '../store/itemsStore';
import { Trophy, Award, Medal } from 'lucide-react';

export default function Leaderboard() {
  const user = useAuthStore((state) => state.user);
  const rewardHistory = useItemsStore((state) => state.rewardHistory);

  // Calculate total points for each user
  const userPoints = rewardHistory.reduce((acc, history) => {
    acc[history.userId] = (acc[history.userId] || 0) + history.points;
    return acc;
  }, {} as Record<string, number>);

  // Convert to array and sort by points
  const leaderboard = Object.entries(userPoints)
    .map(([userId, points]) => ({
      userId,
      points,
    }))
    .sort((a, b) => b.points - a.points);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 1:
        return <Award className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-indigo-600 text-white">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-1">Rank</div>
            <div className="col-span-7">User</div>
            <div className="col-span-4 text-right">Points</div>
          </div>
        </div>

        <div className="divide-y">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.userId}
              className={`p-4 hover:bg-gray-50 ${
                entry.userId === user?.id ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-1 flex items-center">
                  {getRankIcon(index) || (
                    <span className="text-gray-600">{index + 1}</span>
                  )}
                </div>
                <div className="col-span-7">
                  <span className="font-medium">
                    {entry.userId === user?.id ? 'You' : `User ${entry.userId}`}
                  </span>
                  {entry.userId === user?.id && (
                    <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                      You
                    </span>
                  )}
                </div>
                <div className="col-span-4 text-right font-semibold">
                  {entry.points} points
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}