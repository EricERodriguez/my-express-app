const { verifyToken } = require('../services/authService');

const authMiddleware = (req, res, next) =>
{
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = verifyToken(token.split(' ')[1]);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;