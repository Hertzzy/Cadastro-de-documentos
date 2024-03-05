// Verify user role
const db = require('../models')

const roles = (PermissionsList) => {
    return async (req, res, next) => {
        const {
            userId
        } = req;

        const user = await db.users.findOne({
            include: [{
                model: db.permissions,
                as: 'users_permissions',
                attributes: ['id', 'permission_name']
            }],
            where: {
                id: userId
            }
        })

        if (!user) {
            return res.status(401).send('Usuario não cadastrado')
        }

        const registeredPermission = user.users_permissions
            .map((permission) => permission.permission_name)
            .some((permission) => PermissionsList.includes(permission))

        if (!registeredPermission) {
            return res.status(401).send('Usuario não possui acesso a essa rota')
        }

        return next()
    }
}

module.exports = roles