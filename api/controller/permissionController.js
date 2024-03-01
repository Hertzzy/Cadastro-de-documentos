const PermissionService = require('../services/permissionService')
const permissionService = new PermissionService;

class PermissionController {
    // Register Permission
    static async registerPermission(req, res) {
        const {
            permission_name,
            description,
        } = req.body;

        try {
            const permission = await permissionService.registerPermission({
                permission_name,
                description
            })

            res.status(201).send(permission)
            
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    }
    // Search all Permission
    static async searchAllPermission(req, res) {
        const permissions = await permissionService.searchAllPermission()

        res.status(200).json(permissions);
    }
    // Search Permission ID
    static async searchPermissionId(req, res) {
        try {
            const {
                id
            } = req.params;

            const permission = await permissionService.searchPermissionsId(id)

            res.status(200).json(permission);

        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    }
    // Delete Permission ID
    static async deletePermissionId(req, res) {
        const {
            id
        } = req.params;

        try {
            await permissionService.deletePermissionId(id);

            res.status(200).send({
                message: 'Permissão deletada com sucesso!'
            })
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    }
    // Editar Permission
    static async editPermission(req, res) { 
        const {
            id
        } = req.params;

        const {
            permission_name,
            description,
        } = req.body;

        try {
            const permission = await permissionService.editPermission({
                id,
                permission_name,
                description,
            })

            res.status(200).json(permission)

        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    }

}

module.exports = PermissionController