const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth')

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

function validatorToken(authHeader){
    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return { status: 401, error: 'Invalid format for Token. (Ref 00x406)' }
    
    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme))
        return { status: 401, error: 'Prefixed in token is invalid. (Ref 00x407)' }
        
    return { scheme, token }
}

module.exports = {
    generateToken,
    validatorToken
}