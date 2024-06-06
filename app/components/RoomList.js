import React from 'react';
import { format } from 'date-fns';

const RoomList = ({ rooms, onSelectRoom }) => {
  const formatDate = (date) => {
    return format(new Date(date), 'EEE, MMM dd, yyyy');
  };
  return (
    <div>
      {rooms.length > 0 ? (
        rooms.map(room => (
        <div key={room._id} className="room-card" onClick={() => onSelectRoom(room)}>
          <h3>{room.name}</h3>
          <p>Availability: {formatDate(room.availability.startDate)} - {formatDate(room.availability.endDate)}
          </p>
          {/* Add more details if needed */}
        </div>
      ))
      ) : (
        <div>No rooms available for the selected date</div>
      )}
    </div>
  );
};

export default RoomList;
