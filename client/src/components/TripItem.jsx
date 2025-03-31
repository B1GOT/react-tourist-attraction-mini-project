import React from 'react';
import { Clipboard } from 'lucide-react';

const TripItem = ({ trip, copyToClipboard, handleTagClick }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden flex p-4 w-5xl">
      {trip.photos?.length > 0 && (
        <img src={trip.photos[0]} alt={trip.title} className="w-72 h-48 object-cover rounded-xl" />
      )}
      <div className="flex-1 ml-4">
        <h2 className="text-lg font-bold text-gray-800">
          <a href={trip.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            {trip.title}
          </a>
        </h2>
        <p className="text-gray-700 text-sm mb-2">
          {trip.description.length > 100 ? `${trip.description.substring(0, 100)}...` : trip.description}
        </p>
        <a href={trip.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-sm">
          อ่านต่อ
        </a>

        {/* หมวดหมู่ที่สามารถคลิกได้ */}
        <div className="mt-2 text-sm text-gray-600">
          หมวด: {trip.tags?.map((tag, index) => (
            <span
              key={index}
              className="text-blue-500 hover:underline cursor-pointer mx-1"
              onClick={() => handleTagClick(tag)} // คลิกแล้วค้นหาด้วย tag
            >
              {tag}
            </span>
          ))}
        </div>

        {/* รูปภาพเพิ่มเติม */}
        {trip.photos?.length > 1 && (
          <div className="mt-2 flex gap-2">
            {trip.photos.slice(1, 4).map((photo, index) => (
              <img key={index} src={photo} alt="หมวดหมู่" className="w-16 h-16 object-cover rounded-md" />
            ))}
          </div>
        )}
      </div>
      <button className="ml-auto text-gray-500 hover:text-blue-500" onClick={() => copyToClipboard(trip.url)}>
        <Clipboard size={24} />
      </button>
    </div>
  );
};

export default TripItem;
