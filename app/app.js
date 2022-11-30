// app.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// routes
const hills = require('./routes/api/hills');
const users = require('./routes/api/users');
const reviews = require('./routes/api/reviews');
const discussions = require('./routes/api/discussions');
const faults = require('./routes/api/faults')

const app = express();

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');

// cors
app.use(cors({origin: true, credentials: true}));

// Init Middleware
app.use(express.json({extended: false}));

app.use(cookieParser());

// use Routes
app.use('/api/users', users);
app.use('/api/hills', hills);
app.use('/api/reviews', reviews);
app.use('/api/discussions', discussions)
app.use('/api/faults', faults)

const port = process.env.PORT || 8080;

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => console.log(`Server running on port ${port}`));