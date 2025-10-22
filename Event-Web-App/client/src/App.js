import React, { useState, useEffect, useCallback } from 'react';
import { eventsAPI } from './services/api';
import { format } from 'date-fns';
import CalendarView from './components/Calendar/CalendarView';
import EventList from './components/EventList/EventList';
import AddEventForm from './components/AddEventForm/AddEventForm.js';
import BookingPanel from './components/BookingPanel/BookingPanel.js';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('date'); // 'date' or 'all'

  const fetchMonthEvents = useCallback(async () => {
    setLoading(true);
    try {
      const year = format(currentMonth, 'yyyy');
      const month = format(currentMonth, 'M');
      const response = await eventsAPI.getEventsByMonth(year, month);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching month events:', error);
    }
    setLoading(false);
  }, [currentMonth]);

  useEffect(() => {
    fetchAllEvents();
    fetchMonthEvents();
  }, [fetchMonthEvents]);

  const fetchAllEvents = async () => {
    try {
      const response = await eventsAPI.getAllEvents();
      setAllEvents(response.data);
    } catch (error) {
      console.error('Error fetching all events:', error);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setViewMode('date');
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleEventAdded = () => {
    fetchAllEvents();
    fetchMonthEvents();
  };

  const handleBookingSuccess = () => {
    fetchAllEvents();
    fetchMonthEvents();
    // Refresh the selected event if it's the one being booked
    if (selectedEvent) {
      eventsAPI.getEvent(selectedEvent._id)
        .then(response => setSelectedEvent(response.data))
        .catch(console.error);
    }
  };

  const handleShowAllEvents = () => {
    setViewMode('all');
    setSelectedDate(null);
    setSelectedEvent(null);
  };

  const displayEvents = viewMode === 'date' && selectedDate ? events : allEvents;

  return (
    <div className="App">
      <header className="app-header">
        <h1>Event Calendar Booking</h1>
        <p>View, Create, and Book Events Seamlessly</p>
      </header>

      <div className="app-controls">
        <AddEventForm 
          onEventAdded={handleEventAdded}
          selectedDate={selectedDate}
        />
      </div>

      <div className="app-content">
        <div className="left-section">
          <div className="calendar-section">
            <CalendarView 
              onDateSelect={handleDateSelect}
              onEventSelect={handleEventSelect}
              selectedDate={selectedDate}
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
            />
          </div>
          
          {selectedEvent && (
            <div className="booking-section-mobile">
              <BookingPanel 
                event={selectedEvent}
                onBookingSuccess={handleBookingSuccess}
                onClose={() => setSelectedEvent(null)}
              />
            </div>
          )}
        </div>

        <div className="right-section">
          <div className="view-toggle">
            <button 
              className={viewMode === 'date' ? 'active' : ''}
              onClick={() => { setViewMode('date'); setSelectedDate(new Date()); }}
            >
              {selectedDate ? format(selectedDate, 'MMM d') : 'Today'}
            </button>
            <button 
              className={viewMode === 'all' ? 'active' : ''}
              onClick={handleShowAllEvents}
            >
              All Events
            </button>
          </div>
          
          <div className="events-section">
            <EventList 
              events={displayEvents}
              selectedDate={viewMode === 'date' ? selectedDate : null}
              onEventSelect={handleEventSelect}
              viewMode={viewMode}
            />
          </div>
        </div>

        <div className="booking-section">
          <BookingPanel 
            event={selectedEvent}
            onBookingSuccess={handleBookingSuccess}
            onClose={() => setSelectedEvent(null)}
          />
        </div>
      </div>

      {loading && (
        <div className="global-loading">
          <div className="loading-spinner">Loading...</div>
        </div>
      )}
    </div>
  );
}

export default App;