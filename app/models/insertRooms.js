const mongoose = require('mongoose');
const Room = require('./Room'); 

mongoose.connect('mongodb://localhost:27017/room-booking-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const rooms = [
  {
    name: 'Room 1',
    availability: {
      startDate: new Date('2023-06-01T00:00:00.000Z'),
      endDate: new Date('2024-06-30T23:59:59.999Z'),
    },
    bookings: [],
  },
  {
    name: 'Room 2',
    availability: {
      startDate: new Date('2023-06-01T00:00:00.000Z'),
      endDate: new Date('2024-06-30T23:59:59.999Z'),
    },
    bookings: [],
  },
];

Room.insertMany(rooms)
  .then(() => {
    console.log('Rooms added');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error adding rooms:', error);
    mongoose.connection.close();
  });
