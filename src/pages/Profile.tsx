import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useItemsStore } from '../store/itemsStore';
import { User, Mail, Award, Calendar } from 'lucide-react';

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const items = useItemsStore((state) => state.items);
  const rewardHistory = useItemsStore((state) => state.rewardHistory);

  const userReports = items.filter((item) => item.reportedBy.id === user?.id);
  const totalPoints = rewardHistory
    .filter((h) => h.userId === user?.id)
    .reduce((sum, h) => sum + h.points, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 sm:p-8 border-b">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <User className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Award className="h-6 w-6 text-indigo-600" />
                <h3 className="text-lg font-semibold">Reward Points</h3>
              </div>
              <p className="text-3xl font-bold text-indigo-600">{totalPoints}</p>
              <p className="text-gray-600 mt-1">Total points earned</p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold">Reports Made</h3>
              </div>
              <p className="text-3xl font-bold text-green-600">{userReports.length}</p>
              <p className="text-gray-600 mt-1">Items reported</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {rewardHistory
                .filter((h) => h.userId === user?.id)
                .slice(0, 5)
                .map((history) => (
                  <div
                    key={history.id}
                    className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{history.description}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(history.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-green-600 font-medium">
                      +{history.points} points
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}