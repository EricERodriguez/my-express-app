const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (user) =>
{
    return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) =>
{
    return jwt.verify(token, process.env.JWT_SECRET);
};

const register = async (username, password, email) =>
{
    const user = new User({ username, password, email });
    await user.save();
    return createToken(user);
};

const login = async (username, password) =>
{
    const user = await User.findOne({ username });
    if (!user || !await user.comparePassword(password)) {
        throw new Error('Invalid username or password');
    }
    return createToken(user);
};

module.exports = {
    register,
    login,
    verifyToken
};
