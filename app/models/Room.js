const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: String,
  availability: {
    startDate: Date,
    endDate: Date,
  },
  bookings: [{
    date: Date,
    slots: [String],  // Array of booked time slots e.g., ['10:00-10:30', '10:30-11:00']
  }]
});

module.exports = mongoose.models.Room || mongoose.model('Room', RoomSchema);
