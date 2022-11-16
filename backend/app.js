// app.js

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// routes
const hills = require('./routes/api/hills');
const users = require('./routes/api/users');
const review = require('./routes/api/review');
const discussion = require('./routes/api/discussions');
const fault = require('./routes/api/fault')

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({origin: true, credentials: true}));

// Init Middleware
app.use(express.json({extended: false}));

app.use(cookieParser());

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/hills', hills);
app.use('/api/users', users);
app.use('/api/review', review);
app.use('/api/discussions', discussion)
app.use('/api/fault', fault)

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));