const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth')
const tokenService = require('../services/tokenService');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'No token provided. (Ref 00x460)' })
    
    let result = { };
    result = tokenService.validatorToken(authHeader);

    if (result.error)
        return res.status(401).send({ error: result.error });

    jwt.verify(result.token, authConfig.secret, (err, decoded) => {
        if (err)
            return res.status(401).send({ error: 'Invalid token provided. (Ref 00x425)' })
        
            req.userID = decoded.id;
            return next();
    })
}