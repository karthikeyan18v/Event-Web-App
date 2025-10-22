import React, { useState } from 'react';
import { format } from 'date-fns';
import { eventsAPI } from '../../services/api';
import './BookingPanel.css';

const BookingPanel = ({ event, onBookingSuccess, onClose }) => {
  const [bookingData, setBookingData] = useState({
    userName: '',
    userEmail: '',
    numberOfTickets: 1
  });
  const [loading, setLoading] = useState(false);

  if (!event) return null;

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await eventsAPI.bookSeat(event._id, bookingData);
      onBookingSuccess();
      setBookingData({ userName: '', userEmail: '', numberOfTickets: 1 });
      alert(`Successfully booked ${bookingData.numberOfTickets} ticket(s)!`);
    } catch (error) {
      alert('Booking failed: ' + (error.response?.data?.message || error.message));
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="booking-panel">
      <div className="panel-header">
        <h3>Book Event</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="event-info">
        <h4>{event.title}</h4>
        <p className="event-date">{format(new Date(event.date), 'MMMM d, yyyy • h:mm a')}</p>
        <p className="event-venue">{event.venue}</p>
        <div className="seats-info">
          <span className={`seats-status ${event.availableSeats === 0 ? 'full' : 'available'}`}>
            {event.availableSeats === 0 ? 'Fully Booked' : `${event.availableSeats} seats available`}
          </span>
        </div>
      </div>

      {event.availableSeats > 0 ? (
        <form onSubmit={handleBooking} className="booking-form">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="userName"
              value={bookingData.userName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="userEmail"
              value={bookingData.userEmail}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Number of Tickets *</label>
            <input
              type="number"
              name="numberOfTickets"
              value={bookingData.numberOfTickets}
              onChange={handleChange}
              required
              min="1"
              max={event.availableSeats}
              placeholder="How many tickets?"
            />
            <small className="helper-text">Max {event.availableSeats} ticket(s) available</small>
          </div>

          <button 
            type="submit" 
            className="book-btn"
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </form>
      ) : (
        <div className="fully-booked">
          <p>This event is fully booked. No more seats available.</p>
        </div>
      )}

      {event.bookings.length > 0 && (
        <div className="bookings-list">
          <h5>Current Bookings ({event.bookings.length})</h5>
          <div className="bookings-container">
            {event.bookings.map((booking, index) => (
              <div key={index} className="booking-item">
                <span className="user-name">{booking.userName}</span>
                <span className="user-email">{booking.userEmail}</span>
                <span className="ticket-count">{booking.numberOfTickets || 1} ticket(s)</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPanel;