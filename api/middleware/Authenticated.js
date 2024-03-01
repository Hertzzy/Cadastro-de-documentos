const {
    verify,
    decode
} = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization
        console.log(token)

    if (!token) {
        return res.status(401).send('Access token nao informado')
    }

    const [, accessToken] = token.split(" ")

    try {
        verify(accessToken, jsonSecret.secret)

        const {
            id,
            address
        } = await decode(accessToken)

        req.userId = id
        req.address = address

        return next()
    } catch (error) {
        res.status(401).send('Usuario não autenticado')
    }
}