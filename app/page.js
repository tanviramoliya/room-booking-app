'use client'
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RoomList from './components/RoomList';
import RoomDetails from './components/RoomDetails';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Fetch all rooms initially
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await fetch('/api/rooms');
    if (res.ok) {
      const data = await res.json();
      setRooms(data);
    } else {
      console.error('Failed to fetch rooms:', res.statusText);
    }
  };

  const handleSearch = async (date) => {
    setSelectedDate(date);
    const res = await fetch(`/api/rooms?date=${date.toISOString()}`);
    if (res.ok) {
      const data = await res.json();
      setRooms(data);
    } else {
      console.error('Failed to fetch rooms:', res.statusText);
    }
  };

  const handleBookSlot = async (slot) => {
    try {
      if (!selectedDate) {
        toast.error('Please select a date');
        return;
      }
  
      // Construct the booking payload
      const bookingData = {
        roomId: selectedRoom._id,
        date: selectedDate.toISOString().split('T')[0], // Extract the date part
        slot: slot,
      };
  
      // Send a POST request to the backend to book the slot
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
  
      if (res.ok) {
        // Slot booked successfully
        // Refresh the room list to reflect the updated booking status
        fetchRooms();
        toast('Slot booked successfully');
      } else {
        // Handle error response
        const { error } = await res.json();
        console.error('Failed to book slot:', error);
        // Display an error message to the user
        // You can show the error message in a toast or alert
        toast.error(error);
      }
    } catch (error) {
      console.error('Failed to book slot:', error.message);
      // Display an error message to the user
      // You can show the error message in a toast or alert
      toast.error('Failed to book slot');
    }
  };
  
  

  return (
    <div>
     <ToastContainer />
      <SearchBar onSearch={handleSearch} />
      <div style={{ display: 'flex' }}>
        <RoomList rooms={rooms} onSelectRoom={setSelectedRoom} />
        {rooms.length > 0 && selectedRoom && (
          <RoomDetails
            room={selectedRoom}
            selectedDate={selectedDate}
            onBookSlot={handleBookSlot}
          />
        )}
      </div>
    </div>
  );
}
