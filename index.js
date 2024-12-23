const express = require('express');
require('dotenv').config({ path: ".env" });
const cors = require('cors');
const { StatusCodes } = require('http-status-codes');
const connectDB = require('./dbconfig');
const userRoutes = require('./user_route');
const PORT = process.env.PORT || 4400;

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Index controller
app.get('/', async (req, res) => {
    try {
        res.json({ msg: "Welcome to CRUD API" });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
});

// Routes
app.use('/api', userRoutes);
// default route
app.all('*', (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ msg: `Can't find ${req.originalUrl} on this server` });
});

// Server listener
app.listen(PORT, () => {
    connectDB().then(() => {
        console.log('MongoDB connected');
    }).catch(err => console.log(err));
    console.log(`Server is running at http://localhost:${PORT}`);
});
