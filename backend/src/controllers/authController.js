const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper to generate JWT
const generateToken = (user) => {
    const secret = process.env.JWT_SECRET || 'your_default_jwt_secret';
    if (!secret) {
        throw new Error('JWT secret is not defined');
    }
    return jwt.sign(
        { id: user._id, email: user.email },
        secret,
        { expiresIn: '7d' }
    );
};

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: 'All fields are required.' });

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(409).json({ message: 'Email already in use.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        // console.log(`New user registered: ${user.email}`);
        
        const token = generateToken(user);
        // console.log(`Generated token for user: ${user.email}`);
        res.status(201).json({ user: { id: user._id, name, email }, token });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: 'All fields are required.' });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(401).json({ message: 'Invalid credentials.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid credentials.' });

        const token = generateToken(user);
        res.json({ user: { id: user._id, name: user.name, email }, token });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Get current user profile
exports.getProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: No user information found.' });
        }
        const user = await User.findById(req.user.id).select('-password');
        if (!user)
            return res.status(404).json({ message: 'User not found.' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Logout user (invalidate token)
exports.logout = (req, res) => {
    // Invalidate the token by not sending it back
    res.json({ message: 'Logged out successfully.' });
};