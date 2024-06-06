import { NextResponse } from 'next/server';
import connectDb from '../connectDb';
import Room from '../../models/Room';

connectDb();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');

  let rooms;
  if (date) {
    const selectedDate = new Date(date);
    rooms = await Room.find({
      'availability.startDate': { $lte: selectedDate },
      'availability.endDate': { $gte: selectedDate },
    });
  } else {
    rooms = await Room.find({});
  }

  return NextResponse.json(rooms);
}

export async function POST(req) {
  try {
    const { roomId, date, slot } = await req.json();

    // Find the room by ID
    const room = await Room.findById(roomId);

    // Check if the slot is already booked for the selected date
    const existingBooking = room.bookings.find(
      booking => booking.date.toISOString().split('T')[0] === date && booking.slots.includes(slot)
    );

    if (existingBooking) {
      return NextResponse.json({ error: 'Slot already booked' }, { status: 400 });
    }

    // Add the booking to the room's bookings array
    room.bookings.push({ date: new Date(date), slots: [slot] });
    await room.save();

    // Return the updated room object
    return NextResponse.json(room);
  } catch (error) {
    console.error('Failed to book slot:', error);
    // Return an error response
    return NextResponse.error('Failed to book slot');
  }
}

