import React, { useState, useEffect, useCallback } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { eventsAPI } from '../../services/api';
import './CalendarView.css';

const CalendarView = ({ onDateSelect, onEventSelect, selectedDate, currentMonth: externalMonth, setCurrentMonth: setExternalMonth }) => {
  const [currentMonth, setCurrentMonth] = useState(externalMonth || new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEventsForMonth = useCallback(async () => {
    setLoading(true);
    try {
      const year = format(currentMonth, 'yyyy');
      const month = format(currentMonth, 'M');
      const response = await eventsAPI.getEventsByMonth(year, month);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
    setLoading(false);
  }, [currentMonth]);

  useEffect(() => {
    fetchEventsForMonth();
  }, [fetchEventsForMonth]);

  const getEventsForDate = (date) => {
    return events.filter(event => isSameDay(new Date(event.date), date));
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
    onDateSelect(new Date());
  };

  const today = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-btn" onClick={() => navigateMonth(-1)}>
          <span>←</span>
        </button>
        <div className="header-center">
          <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
          <button className="today-btn" onClick={goToToday}>Today</button>
        </div>
        <button className="nav-btn" onClick={() => navigateMonth(1)}>
          <span>→</span>
        </button>
      </div>

      <div className="calendar-grid">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={`${day}-${index}`} className="calendar-day-header">{day}</div>
        ))}
        
        {Array((monthStart.getDay() + 6) % 7).fill(null).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-day empty"></div>
        ))}
        
        {calendarDays.map(day => {
          const dayEvents = getEventsForDate(day);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isToday = isSameDay(day, today);
          const isPast = day < today && !isToday;
          
          return (
            <div
              key={day.toISOString()}
              className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${isPast ? 'past' : ''}`}
              onClick={() => onDateSelect(day)}
            >
              <div className="day-number">{format(day, 'd')}</div>
              {dayEvents.length > 0 && (
                <div className="events-indicator">
                  <span className="event-dot"></span>
                  <span className="event-count">{dayEvents.length}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {loading && <div className="loading">Loading events...</div>}
    </div>
  );
};

export default CalendarView;