import React from 'react';
import { format, isSameDay, isPast, isFuture, isToday } from 'date-fns';
import './EventList.css';


const EventList = ({ events, selectedDate, onEventSelect, viewMode = 'date' }) => {
  const filteredEvents = selectedDate && viewMode === 'date'
    ? events.filter(event => isSameDay(new Date(event.date), selectedDate))
    : events;

  // Sort events: upcoming first, then past
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    // Future events sorted ascending (soonest first)
    if (isFuture(dateA) && isFuture(dateB)) {
      return dateA - dateB;
    }
    // Past events sorted descending (most recent first)
    if (isPast(dateA) && isPast(dateB)) {
      return dateB - dateA;
    }
    // Future events before past events
    return isFuture(dateA) ? -1 : 1;
  });

  const upcomingEvents = sortedEvents.filter(event => {
    const eventDate = new Date(event.date);
    return isFuture(eventDate) || isToday(eventDate);
  });
  
  const pastEvents = sortedEvents.filter(event => {
    const eventDate = new Date(event.date);
    return isPast(eventDate) && !isToday(eventDate);
  });

  const showSections = viewMode === 'all' && (upcomingEvents.length > 0 || pastEvents.length > 0);

  const getTitle = () => {
    if (viewMode === 'all') {
      return 'All Events';
    }
    if (selectedDate) {
      return `Events on ${format(selectedDate, 'MMMM d, yyyy')}`;
    }
    return 'Select a Date';
  };

  return (
    <div className="event-list">
      <h3>
        {getTitle()}
        <span className="event-count">({filteredEvents.length})</span>
      </h3>
      
      <div className="events-container">
        {filteredEvents.length === 0 ? (
          <div className="no-events">No events found</div>
        ) : showSections ? (
          <>
            {upcomingEvents.length > 0 && (
              <div className="events-section-group">
                <h4 className="section-title">🔜 Upcoming Events ({upcomingEvents.length})</h4>
                {upcomingEvents.map(event => (
                  <EventCard key={event._id} event={event} onEventSelect={onEventSelect} />
                ))}
              </div>
            )}
            
            {pastEvents.length > 0 && (
              <div className="events-section-group">
                <h4 className="section-title">📋 Past Events ({pastEvents.length})</h4>
                {pastEvents.map(event => (
                  <EventCard key={event._id} event={event} onEventSelect={onEventSelect} isPast={true} />
                ))}
              </div>
            )}
          </>
        ) : (
          sortedEvents.map(event => (
            <EventCard key={event._id} event={event} onEventSelect={onEventSelect} />
          ))
        )}
      </div>
    </div>
  );
};

const EventCard = ({ event, onEventSelect, isPast = false }) => {
  return (
    <div 
      className={`event-card ${isPast ? 'past-event' : ''}`}
      onClick={() => onEventSelect(event)}
    >
      <div className="event-header">
        <h4>{event.title}</h4>
        <span className={`status ${event.availableSeats === 0 ? 'full' : 'available'}`}>
          {event.availableSeats === 0 ? 'FULL' : `${event.availableSeats} seats`}
        </span>
      </div>
      <div className="event-details">
        <p className="event-date">{format(new Date(event.date), 'MMM d, yyyy • h:mm a')}</p>
        <p className="event-venue">{event.venue}</p>
        {event.description && (
          <p className="event-description">{event.description}</p>
        )}
      </div>
      <div className="event-footer">
        <span className="bookings-count">
          {event.bookings.length} booking{event.bookings.length !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
};

export default EventList;