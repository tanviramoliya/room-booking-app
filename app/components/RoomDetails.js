import React, { useState } from 'react';
import { toast } from 'react-toastify';

const RoomDetails = ({ room, onBookSlot }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Function to handle slot booking
  const handleBookSlot = async () => {
    if (!selectedSlot) {
      toast.error('Please select a slot');
      return;
    }

    try {
      await onBookSlot(selectedSlot);
      
    } catch (error) {
      console.log(error)
    }
  };

  // Function to handle slot selection
  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  return (
    <div className="room-details">
      <div className="header">
    <h2 className="room-name">Room: {room.name}</h2>
    <button className="book-button" onClick={handleBookSlot}>Book</button>
  </div>
     
      {/* Slot display */}
      <div className="slot-display">
        {/* Render time slots */}
        {Array.from({ length: 10 }, (_, index) => {
          const slot = `${10 + index}:00 - ${10 + index}:30`; // Example slot format
          return (
            <div
              key={index}
              className={`slot ${selectedSlot === slot ? 'selected' : ''}`}
              onClick={() => handleSelectSlot(slot)}
            >
              {slot}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomDetails;
