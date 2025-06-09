import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: 'All fields are required.' });

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(409).json({ message: 'Email already in use.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ user: { id: user._id, name, email } });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Assuming attendance is a subdocument or a separate model
// For demonstration, let's assume attendance is an array in User model
export const  logAttendance = async (req, res) => {
    try {
        const { userId, status } = req.body;
        if (!userId || !status)
            return res.status(400).json({ message: 'User ID and status are required.' });

        const user = await User.findById(userId);
        if (!user)
            return res.status(404).json({ message: 'User not found.' });

        if (!user.attendance) user.attendance = [];
        user.attendance.push({ date: new Date(), status });
        await user.save();

        res.json({ message: 'Attendance logged.', attendance: user.attendance });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

export const getAttendanceHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select('attendance');
        if (!user)
            return res.status(404).json({ message: 'User not found.' });

        res.json({ attendance: user.attendance || [] });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword)
            return res.status(400).json({ message: 'Email and new password are required.' });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: 'User not found.' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password reset successful.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!req.user || !req.user.id)
            return res.status(401).json({ message: 'Unauthorized.' });

        if (!oldPassword || !newPassword)
            return res.status(400).json({ message: 'Old and new passwords are required.' });

        const user = await User.findById(req.user.id);
        if (!user)
            return res.status(404).json({ message: 'User not found.' });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Old password is incorrect.' });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: 'Password changed successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

