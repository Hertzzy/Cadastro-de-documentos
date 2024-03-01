const db = require('../models')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret')

class AuthService {
    async login(dto) {
        const user = await db.users.findOne({
            attributes: ['id', 'user_name', 'address', 'password_hash'],
            where: {
                address: dto.address
            }
        })

        if (!user) {
            throw new Error('Usuario não cadastrado')
        }

        const samePassword = await compare(dto.password_hash, user.password_hash)

        if (!samePassword) {
            throw new Error('Usuario ou senha invalido')
        }

        const accessToken = sign({
            id: user.id,
            address: user.address
        }, jsonSecret.secret, {
            expiresIn: 86400
        })

        return {
            accessToken,
            userId: user.id,
            user_name: user.user_name,
            user_address: user.address
        }

    }
}

module.exports = AuthService