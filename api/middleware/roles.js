// Verify user role
const db = require('../models')

const roles = (rolesList) => {
    return async (req, res, next) => {
        const {
            userId
        } = req;

        const user = await db.users.findOne({
            include: [{
                model: db.roles,
                as: 'users_roles',
                attributes: ['id', 'role_name']
            }],
            where: {
                id: userId
            }
        })

        if (!user) {
            return res.status(401).send('Usuario não cadastrado')
        }

        const registeredRoles = user.users_roles
            .map((role) => role.role_name)
            .some((role) => rolesList.includes(role))

        if (!registeredRoles) {
            return res.status(401).send('Usuario não possui acesso a essa rota')
        }

        return next()
    }
}

module.exports = roles