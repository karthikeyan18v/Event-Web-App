const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  venue: {
    type: String,
    required: true,
    trim: true
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0
  },
  totalSeats: {
    type: Number,
    required: true
  },
  bookings: [{
    userName: String,
    userEmail: String,
    numberOfTickets: {
      type: Number,
      default: 1,
      min: 1
    },
    bookedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for checking if event is fully booked
eventSchema.virtual('isFullyBooked').get(function() {
  return this.availableSeats <= 0;
});

module.exports = mongoose.model('Event', eventSchema);