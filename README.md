# Event-Web-App
A full-stack event management and booking application with calendar view, event creation, and seat booking functionality.
✨ Features
📅 Calendar View - Monthly calendar with event indicators
🎫 Event Management - Create, view, and delete events
🪑 Seat Booking - Book seats with user details
📱 Responsive Design - Works on desktop and mobile
🔄 Real-time Updates - Instant seat availability updates
📊 Booking History - View all bookings for each event
🎨 Modern UI - Clean and intuitive interface

🛠️ Tech Stack
Frontend
React - UI framework

CSS3 - Styling

Axios - HTTP client

date-fns - Date manipulation

Backend
Node.js - Runtime environment

Express.js - Web framework

MongoDB - Database

Mongoose - ODM

CORS - Cross-origin resource sharing

event-calendar-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Calendar/       # Calendar components
│   │   │   ├── EventList/      # Event listing components
│   │   │   ├── AddEventForm/   # Event creation form
│   │   │   └── BookingPanel/   # Booking interface
│   │   ├── services/           # API services
│   │   ├── styles/             # Global styles
│   │   └── App.js              # Main App component
│   ├── package.json
│   └── .env                   # Frontend environment variables
├── server/                 # Express backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── package.json
│   └── server.js           # Server entry point
└── README.md

1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/event-calendar-app.git
cd event-calendar-app
```
2.Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```
Configure server/.env:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eventcalendar
NODE_ENV=development
```
Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```
3. Frontend Setup
```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```
Configure client/.env:
```bash
REACT_APP_API_URL=http://localhost:5000/api

# TO start the server
npm start
```
