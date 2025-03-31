import React from 'react';
import TripItem from './TripItem';

const TripList = ({ trips, copyToClipboard, handleTagClick }) => {
  return (
    <div className="space-y-4">
      {trips.map((trip) => (
        <TripItem
          key={trip.eid}
          trip={trip}
          copyToClipboard={copyToClipboard}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default TripList;
