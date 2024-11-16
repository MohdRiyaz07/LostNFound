import React, { useState } from 'react';
import { Camera, Clock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useItemsStore } from '../store/itemsStore';

export default function Report() {
  const user = useAuthStore((state) => state.user);
  const { items, addItem, addRewardHistory } = useItemsStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    contactNumber: '',
    image: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newItem = {
      id: Date.now().toString(),
      ...formData,
      imageUrl: formData.image ? URL.createObjectURL(formData.image) : '',
      reportedBy: user,
      reportedAt: new Date(),
      status: 'pending' as const,
    };

    addItem(newItem);
    addRewardHistory({
      id: Date.now().toString(),
      userId: user.id,
      points: 10,
      description: `Reported item: ${formData.title}`,
      date: new Date(),
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    setFormData({
      title: '',
      description: '',
      location: '',
      contactNumber: '',
      image: null,
    });
  };

  const recentReports = items.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Report Lost Item</h2>
          
          {showSuccess && (
            <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> Item reported successfully. You earned 10 points!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Item Title
                </label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  required
                  className="form-textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location Found
                </label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="tel"
                  required
                  className="form-input"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Item Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Camera className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Report
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Reports</h2>
          <div className="space-y-4">
            {recentReports.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.location}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(item.reportedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}