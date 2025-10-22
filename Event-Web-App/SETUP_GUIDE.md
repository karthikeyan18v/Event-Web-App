# 🚀 Complete Setup Guide - Event Calendar Booking System

## Step-by-Step Installation and Setup

### Step 1: Prerequisites Check

Before starting, ensure you have:

```bash
# Check Node.js version (should be v14+)
node --version

# Check npm version
npm --version

# Check if MongoDB is installed (for local setup)
mongod --version
```

If you don't have these installed:
- **Node.js**: Download from https://nodejs.org/
- **MongoDB**: Download from https://www.mongodb.com/try/download/community
  - OR use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

---

### Step 2: MongoDB Setup

#### Option A: Local MongoDB

```bash
# Windows: MongoDB should auto-start after installation
# OR manually start it:
mongod

# Linux/Mac:
sudo systemctl start mongod
# OR
brew services start mongodb-community
```

#### Option B: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a new cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

---

### Step 3: Backend Setup

```bash
# Navigate to the server directory
cd event-Web-app/server

# Install all backend dependencies
npm install

# Create environment file
# Windows PowerShell:
New-Item -Path . -Name ".env" -ItemType "file"

# Mac/Linux:
touch .env
```

**Edit the `.env` file** and add:

```env
# Server Port
PORT=5000

# MongoDB Connection (choose one)

# For Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/event-booking

# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/event-booking?retryWrites=true&w=majority

# Replace YOUR_USERNAME, YOUR_PASSWORD, and YOUR_CLUSTER with your actual values
```

**Start the backend server:**

```bash
# Development mode (auto-restart on changes)
npm run dev

# OR Production mode
npm start
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

---

### Step 4: Frontend Setup

**Open a NEW terminal** (keep the backend running in the first terminal)

```bash
# Navigate to the client directory
cd event-Web-app/client

# Install all frontend dependencies
npm install

# Create environment file
# Windows PowerShell:
New-Item -Path . -Name ".env" -ItemType "file"

# Mac/Linux:
touch .env
```

**Edit the `.env` file** and add:

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:5000/api
```

**Start the React development server:**

```bash
npm start
```

The browser should automatically open to `http://localhost:3000`

---

### Step 5: Verify Installation

1. **Check Backend** - Visit http://localhost:5000/api/events
   - Should show `[]` (empty array) if no events exist
   - OR list of events if database has data

2. **Check Frontend** - Visit http://localhost:3000
   - Calendar should be visible
   - Try clicking dates
   - Try creating an event

---

## 🎯 Testing the Application

### Test 1: Create an Event

1. Click the "**+ ADD NEW EVENT**" button
2. Fill in the form:
   ```
   Title: Tech Meetup
   Date: [Select tomorrow's date]
   Venue: Conference Room A
   Total Seats: 50
   Available Seats: 50
   Description: Monthly tech meetup
   ```
3. Click "**CREATE EVENT**"
4. ✅ Event should appear in the calendar and event list

### Test 2: Book Tickets

1. Click on the event you just created
2. In the booking panel on the right:
   ```
   Name: John Doe
   Email: john@example.com
   Number of Tickets: 3
   ```
3. Click "**CONFIRM BOOKING**"
4. ✅ Available seats should decrease by 3
5. ✅ Booking should appear in the bookings list

### Test 3: View Different Dates

1. Click different dates on the calendar
2. Click "**All Events**" toggle button
3. Click "**Today**" button in calendar header
4. ✅ Event list should update accordingly

---

## 📁 Complete File Structure with Code

### Server Files

#### `server/package.json`
```json
{
  "name": "event-booking-server",
  "version": "1.0.0",
  "description": "Event booking backend API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

#### `server/.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/event-booking
```

#### `server/server.js`
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/events', require('./routes/events'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Event Booking API is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### `server/config/database.js`
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

### Client Files

#### `client/package.json`
```json
{
  "name": "event-booking-client",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-scripts": "5.0.1",
    "axios": "^1.12.2",
    "date-fns": "^4.1.0",
    "react-calendar": "^6.0.0",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

#### `client/.env`
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🔧 Troubleshooting Common Issues

### Issue 1: Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Windows: Find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Issue 2: MongoDB Connection Failed

**Error:** `MongooseServerSelectionError`

**Solutions:**
1. Check if MongoDB service is running
2. Verify MONGODB_URI in .env file
3. For MongoDB Atlas:
   - Check whitelist IP (add 0.0.0.0/0 for testing)
   - Verify username/password
   - Ensure cluster is active

### Issue 3: Cannot GET /api/events

**Error:** `404 Not Found`

**Solutions:**
1. Ensure backend server is running on port 5000
2. Check REACT_APP_API_URL in client/.env
3. Verify routes are correctly imported in server.js

### Issue 4: CORS Error

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solutions:**
1. Ensure `cors` middleware is installed and used in server.js
2. Restart both frontend and backend servers
3. Clear browser cache

---

## 📦 Quick Install Commands

### Complete Setup (Copy & Paste)

```bash
# Backend Setup
cd server
npm install
echo PORT=5000 > .env
echo MONGODB_URI=mongodb://localhost:27017/event-booking >> .env
npm start

# In a new terminal - Frontend Setup
cd client
npm install
echo REACT_APP_API_URL=http://localhost:5000/api > .env
npm start
```

---

## 🎨 Customization Options

### Change Theme Colors

**Location:** `client/src/App.css`

```css
/* Change main gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Change to blue/green */
background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);

/* Change to orange/red */
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

### Change Default Event Settings

**Location:** `client/src/components/AddEventForm/AddEventForm.js`

```javascript
const [formData, setFormData] = useState({
  title: '',
  date: '',
  venue: '',
  description: '',
  totalSeats: 100,      // Change default total seats
  availableSeats: 100   // Change default available seats
});
```

---

## 🚀 Deployment

### Deploy Backend (Heroku)

```bash
cd server
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
git push heroku main
```

### Deploy Frontend (Vercel/Netlify)

```bash
cd client
npm run build

# Vercel
vercel --prod

# Netlify
netlify deploy --prod
```

---

## 📞 Need Help?

- Check browser console for errors (F12)
- Check server terminal for backend errors
- Verify all environment variables are set correctly
- Ensure MongoDB is running and accessible

---

**Happy Coding! 🎉**
