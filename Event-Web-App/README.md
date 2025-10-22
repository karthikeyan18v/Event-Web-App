# 📅 Event Calendar Booking System

A modern, full-stack calendar-based event booking application built with React, Node.js, Express, and MongoDB.

## ✨ Features

- **📆 Interactive Calendar View** - Compact, modern calendar showing events with visual indicators
- **📋 Event Management** - Create, view, and manage events with detailed information
- **🎫 Multiple Ticket Booking** - Book multiple seats for events in a single transaction
- **📊 Smart Event Lists** - View events by date or see all upcoming/past events
- **🎨 Modern UI/UX** - Beautiful gradient design with smooth animations
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **🔄 Real-time Updates** - Instant updates when bookings are made
- **📍 Event Details** - Comprehensive event information including venue, date, and available seats

## 🏗️ Project Structure

```
event-Web-app/
├── client/                          # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── Calendar/
│   │   │   │   ├── CalendarView.js       # Compact calendar component
│   │   │   │   └── CalendarView.css      # Calendar styles
│   │   │   ├── EventList/
│   │   │   │   ├── EventList.js          # Event list with sorting
│   │   │   │   └── EventList.css         # Event list styles
│   │   │   ├── AddEventForm/
│   │   │   │   ├── AddEventForm.js       # Event creation form
│   │   │   │   └── AddEventForm.css      # Form styles
│   │   │   └── BookingPanel/
│   │   │       ├── BookingPanel.js       # Multi-ticket booking
│   │   │       └── BookingPanel.css      # Booking panel styles
│   │   ├── services/
│   │   │   └── api.js                    # API service layer
│   │   ├── App.js                        # Main app component
│   │   ├── App.css                       # Global styles
│   │   ├── index.js                      # React entry point
│   │   └── index.css                     # Base styles
│   ├── package.json                      # Frontend dependencies
│   └── .env                              # Environment variables
│
├── server/                          # Node.js Backend
│   ├── models/
│   │   └── Event.js                      # MongoDB Event schema
│   ├── routes/
│   │   └── events.js                     # Event API routes
│   ├── config/
│   │   └── database.js                   # MongoDB connection
│   ├── middleware/
│   │   └── cors.js                       # CORS configuration
│   ├── server.js                         # Express server setup
│   ├── package.json                      # Backend dependencies
│   └── .env                              # Environment variables
│
└── README.md                        # This file

```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher) or MongoDB Atlas account
- npm or yarn package manager

### Installation

#### 1. Clone the repository

```bash
cd event-Web-app
```

#### 2. Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
# Add the following:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/event-booking
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/event-booking

# Start the server
npm start
# Server will run on http://localhost:5000
```

#### 3. Setup Frontend

```bash
# Open new terminal and navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
# Add the following:
# REACT_APP_API_URL=http://localhost:5000/api

# Start the React app
npm start
# App will run on http://localhost:3000
```

## 📦 Dependencies

### Backend Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "nodemon": "^2.0.22"
}
```

### Frontend Dependencies

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-scripts": "5.0.1",
  "axios": "^1.12.2",
  "date-fns": "^4.1.0",
  "react-calendar": "^6.0.0"
}
```

## 🔧 API Endpoints

### Events

- **GET** `/api/events` - Get all events
- **GET** `/api/events/:id` - Get single event
- **GET** `/api/events/month/:year/:month` - Get events for specific month
- **POST** `/api/events` - Create new event
- **PUT** `/api/events/:id/book` - Book seats for an event
- **DELETE** `/api/events/:id` - Delete an event

### API Request/Response Examples

#### Create Event

```bash
POST /api/events
Content-Type: application/json

{
  "title": "Tech Conference 2025",
  "description": "Annual tech conference",
  "date": "2025-11-15T10:00:00",
  "venue": "Convention Center",
  "totalSeats": 500,
  "availableSeats": 500
}
```

#### Book Tickets

```bash
PUT /api/events/:id/book
Content-Type: application/json

{
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "numberOfTickets": 3
}
```

## 🎨 Features Breakdown

### 1. Calendar View
- **Compact Design** - Optimized for space with clear date indicators
- **Event Dots** - Visual indicators showing number of events per day
- **Today Highlight** - Current date prominently displayed
- **Month Navigation** - Easy browsing through different months
- **Quick Today Button** - Jump to current date instantly

### 2. Event Management
- **Create Events** - Simple form with all necessary fields
- **Set Availability** - Configure total and available seats separately
- **View Events** - Filter by date or view all events
- **Smart Sorting** - Upcoming events first, then past events

### 3. Booking System
- **Multiple Tickets** - Book 1 or more seats in single transaction
- **Real-time Availability** - See exact number of available seats
- **Booking History** - View all bookings with ticket counts
- **Validation** - Prevents overbooking

### 4. UI/UX Design
- **Modern Gradient Theme** - Purple/blue gradient throughout
- **Glassmorphism Effects** - Frosted glass UI elements
- **Smooth Animations** - Hover effects and transitions
- **Responsive Layout** - Adapts to all screen sizes

## 🎯 Usage Guide

### Creating an Event

1. Click "**+ ADD NEW EVENT**" button
2. Fill in event details:
   - Title (required)
   - Date & Time (required)
   - Venue (required)
   - Total Seats (required)
   - Available Seats (required)
   - Description (optional)
3. Click "**CREATE EVENT**"

### Booking Tickets

1. Select a date on the calendar or click "**All Events**"
2. Click on an event card
3. In the booking panel:
   - Enter your full name
   - Enter your email
   - Select number of tickets
4. Click "**CONFIRM BOOKING**"

### Viewing Events

- **By Date**: Click any date on the calendar
- **All Events**: Click "All Events" button in the toggle
- **This Month**: Calendar automatically shows current month's events

## 🛠️ Customization

### Changing Colors

Edit the gradient colors in CSS files:

```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Success gradient */
background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
```

### API Base URL

Update in `client/src/services/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

### MongoDB Connection

Update in `server/.env`:

```
MONGODB_URI=your_mongodb_connection_string
```

## 📱 Responsive Breakpoints

- **Desktop**: > 1200px (3-column layout)
- **Tablet**: 768px - 1200px (2-column layout)
- **Mobile**: < 768px (1-column layout with collapsible booking)

## 🐛 Troubleshooting

### Server won't start
- Check if MongoDB is running
- Verify MONGODB_URI in .env file
- Ensure port 5000 is not in use

### Frontend won't connect to backend
- Verify REACT_APP_API_URL in client/.env
- Check if backend server is running
- Check browser console for CORS errors

### Calendar not showing events
- Verify events exist in database
- Check network tab for API responses
- Ensure dates are in correct format

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Made with ❤️ using React, Node.js, Express, and MongoDB**
