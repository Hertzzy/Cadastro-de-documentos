const db = require('../models')
const Sequelize = require('sequelize')

const permissionsRoles = (permissionsList) => {
    return async (req, res, next) => {
        const {
            userId
        } = req

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

        let rolesListId = []

        Object.values(user.users_roles).map((role) => {
            rolesListId.push(role.id)
        })

        if (rolesListId.length == 0) {
            return res.status(401).send('Usuario não possui acesso a essa rota')
        }

        const roles = await db.roles.findAll({
            include: [{
                model: db.permissions,
                as: 'roles_das_permissoes',
                attributes: ['id', 'permission_name']
            }],
            where: {
                id: {
                    [Sequelize.Op.in]: rolesListId
                }
            }
        })

        let hasPermissao = false;

        roles.map((role) => {
            hasPermissao = role.roles_das_permissoes
                .map((permission) => permission.permission_name)
                .some((permission) => permissionsList.includes(permission))
        })


        if (!hasPermissao) {
            return res.status(401).send('Usuario não tem acesso a essa rota')
        }

        return next()
    }
}

module.exports = permissionsRoles