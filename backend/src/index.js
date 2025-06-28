const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const machineRoutes = require('./routes/machineRoutes');
const materialRoutes = require('./routes/materialRoutes');
const independentMachineRoutes = require('./routes/independentMachineRoutes');
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/users', userRoutes);

// For independent machines
app.use('/api/machines', independentMachineRoutes);
app.use('/api/projects/:projectId/machines', machineRoutes);
app.use('/api/projects/:projectId/materials', materialRoutes);
app.use('/api/materials', materialRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Shree Gopalji Backend API!');
});

// Error handler middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});