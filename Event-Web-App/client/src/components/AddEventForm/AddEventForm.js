import React, { useState } from 'react';
import { eventsAPI } from '../../services/api';
import './AddEventForm.css';

const AddEventForm = ({ onEventAdded, selectedDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    venue: '',
    description: '',
    totalSeats: 100,
    availableSeats: 100
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await eventsAPI.createEvent(formData);
      onEventAdded();
      setFormData({
        title: '',
        date: '',
        venue: '',
        description: '',
        totalSeats: 100,
        availableSeats: 100
      });
      setIsOpen(false);
      alert('Event created successfully!');
    } catch (error) {
      alert('Failed to create event: ' + (error.response?.data?.message || error.message));
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="add-event-container">
      <button 
        className="add-event-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '− Close Form' : '+ Add New Event'}
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="add-event-form">
          <div className="form-row">
            <div className="form-group">
              <label>Event Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter event title"
              />
            </div>

            <div className="form-group">
              <label>Date & Time *</label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Total Seats *</label>
              <input
                type="number"
                name="totalSeats"
                value={formData.totalSeats}
                onChange={handleChange}
                required
                min="1"
                placeholder="Total number of seats"
              />
            </div>

            <div className="form-group">
              <label>Available Seats *</label>
              <input
                type="number"
                name="availableSeats"
                value={formData.availableSeats}
                onChange={handleChange}
                required
                min="0"
                max={formData.totalSeats}
                placeholder="Initially available seats"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Venue *</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
              placeholder="Enter venue location"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter event description (optional)"
              rows="3"
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Event'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddEventForm;