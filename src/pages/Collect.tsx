import React from 'react';
import { useItemsStore } from '../store/itemsStore';
import { Clock, MapPin, Phone, Check } from 'lucide-react';

export default function Collect() {
  const items = useItemsStore((state) => state.items);
  const updateItemStatus = useItemsStore((state) => state.updateItemStatus);

  const handleCollect = (itemId: string) => {
    updateItemStatus(itemId, 'collected');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Lost Items</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  {item.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="h-4 w-4 mr-2" />
                  {item.contactNumber}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  {new Date(item.reportedAt).toLocaleDateString()}
                </div>
              </div>

              {item.status === 'pending' ? (
                <button
                  onClick={() => handleCollect(item.id)}
                  className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 flex items-center justify-center"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Mark as Collected
                </button>
              ) : (
                <div className="mt-4 text-center text-green-600 font-medium">
                  ✓ Collected
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}