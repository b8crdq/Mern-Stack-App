const express = require('express');
const connectToMongo = require('./db');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const app = express();
const PORT = process.env.PORT || 5000;
var cors = require('cors');


connectToMongo();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes',notesRoutes);


app.listen(PORT, () => {
    console.log(`INoteBook backend Server running on port ${PORT}`);
});
