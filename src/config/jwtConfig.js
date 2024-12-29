const jwt = require('jsonwebtoken');
const JWT_SECRET = "8ff2332b46a7e76aac621bf77a417d5eeaf3ca038829e4e118a36d98824a43855729571f95d1b83371d240fff83e7ddd4e2e650c6838ebce095e6197a8918576";

const jwtAuthentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

module.exports = jwtAuthentication;