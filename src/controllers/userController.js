const User = require('../models/User');
const { register, login } = require('../services/authService');

const registerUser = async (req, res) =>
{
    try {
        const { username, password, email } = req.body;
        const token = await register(username, password, email);
        res.status(201).json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const loginUser = async (req, res) =>
{
    try {
        const { username, password } = req.body;
        const token = await login(username, password);
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getUser = async (req, res) =>
{
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateUser = async (req, res) =>
{
    try {
        const { username, email } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { username, email }, { new: true });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteUser = async (req, res) =>
{
    try {
        await User.findByIdAndDelete(req.user.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser
};
