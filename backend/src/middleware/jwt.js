require("dotenv").config()
const jwt = require('jsonwebtoken');

const jwtMiddleware = {
    authenticateJWTUser(req, res, next) {
        const token = req.cookies.token;
        if (!token) {
            return res.status(403).send('Access denied');
        }
        
        jwt.verify(token, process.env.jwt_secret, (err, user) => {
            if (err) {
                return res.status(403).send('Access denied');
            }
            req.user = user;
            next();
        });
    },
    authenticateJWTAdmin(req, res, next) {
        const token = req.cookies.token;
        if (!token) {
            return res.status(403).send('Access denied');
        }
        
        jwt.verify(token, process.env.jwt_secret, (err, user) => {
            if (err) {
                return res.status(403).send('Access denied');
            }
            if (user.role !== 'admin') {
                return res.send('Access denied')
            }
            req.user = user;
            next();
        });
    }
};

module.exports = { ...jwtMiddleware }