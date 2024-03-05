const db = require('../models')
const Sequelize = require('sequelize')

const permissionsRoles = (permissionsList) => {
    return async (req, res, next) => {
        const {
            userId
        } = req

        const user = await db.users.findOne({
            include: [{
                model: database.roles,
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

        Object.values(user.user_roles).map((role) => {
            listaRolesId.push(role.id)
        })

        if (rolesListId.length == 0) {
            return res.status(401).send('Usuario não possui acesso a essa rota')
        }

        const roles = await db.roles.findAll({
            include: [{
                model: db.permissoes,
                as: 'roles_das_permissions',
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
            possuiPermissao = role.roles_das_permissions
                .map((permissions) => permission.permission_name)
                .some((permissions) => listaPermissoes.includes(permissions))
        })


        if (!hasPermissao) {
            return res.status(401).send('Usuario não tem acesso a essa rota')
        }

        return next()
    }
}

module.exports = permissionsRoles