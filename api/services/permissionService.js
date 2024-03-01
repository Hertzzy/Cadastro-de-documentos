const db = require('../models')
const {
    v4: uuidv4
} = require('uuid')

class RoleService {
    // Register new Permissions
    async registerPermission(dto) {
        const role = await db.permissions.findOne({
            where: {
                permission_name: dto.permission_name
            }
        });

        if (role) {
            throw new Error("Esse usuário já foi cadastrado");
        }

        try {
            const newRole = await db.permissions.create({
                id: uuidv4(),
                permission_name: dto.permission_name,
                description: dto.description,
            })

            return newRole;

        } catch (error) {
            throw new Error('Erro ao cadastrar Permissão')
        }
    };
    // Search all Permission
    async searchAllPermission() {
        const permissions = await db.permissions.findAll()

        return permissions;
    };
    // Search one Roles ID
    async searchPermissionsId(id) {
        const permission = await db.permissions.findOne({
            where: {
                id: id
            }
        });

        if (!permission) {
            throw new Error("Essa permissão não existe")
        }

        return permission;
    };
    // Delete Role ID
    async deletePermissionId(id) {
        await this.searchPermissionsId(id);

        try {
            await db.permissions.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar deletar o Permissão! Tente novamente mais tarde')
        }
    }
    // Edit User
    async editPermission(dto) {
        const permission = await this.searchPermissionsId(dto.id);

        try {
            permission.permission_name = dto.permission_name
            permission.description = dto.description

            await permission.save()

            return permission
            
        } catch (error) {
            throw new Error('Erro ao editar usuario! Tente novamente mais tarde')
        }


    };
}

module.exports = RoleService;