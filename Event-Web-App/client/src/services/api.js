import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Events API
export const eventsAPI = {
  // Get all events
  getAllEvents: () => api.get('/events'),
  
  // Get events for specific month
  getEventsByMonth: (year, month) => api.get(`/events/month/${year}/${month}`),
  
  // Get single event
  getEvent: (id) => api.get(`/events/${id}`),
  
  // Create new event
  createEvent: (eventData) => api.post('/events', eventData),
  
  // Book a seat
  bookSeat: (id, bookingData) => api.put(`/events/${id}/book`, bookingData),
  
  // Delete event
  deleteEvent: (id) => api.delete(`/events/${id}`),
};

export default api;