const db = require('../models');
const Sequelize = require('sequelize');

class SecurityService {
    // Registrar ACL
    async registerAcl(dto) {
        // Verificar se dto.userId está definido
        if (typeof dto.userId === 'undefined') {
            throw new Error('ID do usuário não fornecido. Id do usuário: ' + dto.userId );
        }

        const user = await db.users.findOne({
            include: [{
                    model: db.roles,
                    as: 'users_roles',
                    attributes: ['id', 'role_name', 'description'],
                    through: {
                        attributes: [],
                    }
                },
                {
                    model: db.permissions,
                    as: 'users_permissions',
                    attributes: ['id', 'permission_name', 'description'],
                    through: {
                        attributes: [],
                    }
                }
            ],
            where: {
                id: dto.userId
            }
        });

        if (!user) {
            throw new Error('Usuário não cadastrado');
        }

        const registersRoles = await db.roles.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.roles
                }
            }
        });

        const registersPermissions = await db.permissions.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.permissions
                }
            }
        });

        await user.removeUsers_roles(user.users_roles);
        await user.removeUsers_permissions(user.users_permissions);

        await user.addUsers_roles(registersRoles);
        await user.addUsers_permissions(registersPermissions);

        const newUser = await db.users.findOne({
            include: [{
                    model: db.roles,
                    as: 'users_roles',
                    attributes: ['id', 'role_name', 'description'],
                    through: {
                        attributes: [],
                    }
                },
                {
                    model: db.permissions,
                    as: 'users_permissions',
                    attributes: ['id', 'permission_name', 'description'],
                    through: {
                        attributes: [],
                    }
                }
            ],
            where: {
                id: dto.userId
            }
        });

        return newUser;
    }

    async registerPermissionsRoles(dto){
        const role = await db.roles.findOne({
            include:[
                {
                    model: db.permissions,
                    as: 'roles_das_permissoes',
                    attributes: ['id', 'permission_name', 'description']
                }
            ]
        })

        if(!role) {
            throw new Error('Role não cadastrada')
        }

        const permissionsRegistered = await db.permissions.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.permissions
                }
            }
        })

        await role.removeRoles_das_permissoes(role.roles_das_permissoes)

        await role.addRoles_das_permissoes(permissionsRegistered)

        const newRole = await db.roles.findOne({
            include: [
                {
                    model: db.permissions,
                    as: 'roles_das_permissoes',
                    attributes: ['id', 'permission_name', 'description']
                }
            ],
            where: {
                id: dto.roleId
            }
        })

        return newRole

    }
}

module.exports = SecurityService;
