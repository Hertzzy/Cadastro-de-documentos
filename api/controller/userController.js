const UserService = require('../services/userService')
const userService = new UserService;

class DocController {
    // Register Doc
    static async registerUser(req, res) {
      const { user_name, address, password_hash, status } = req.body;

      try {
        const user = await userService.registerUser({user_name, address, password_hash, status})

        res.status(201).send(user)
      } catch (error) {
        res.status(400).send({message: error.message})
      }
    }
    // Search all Users
    static async searchAllUsers(req, res) {
        const users = await userService.searchAllUsers()

        res.status(200).json(users);
    }

    static async searchUserId(req, res) {
        try {
            const { id } = req.params
            const user = await userService.searchUsersId(id)

            res.status(200).json(user);
        } catch (error) {
             res.status(400).send({
                 message: error.message
             })
        }
    }

    static async deleteUserId(req, res) {
        const { id } = req.params;
        try {
            await userService.deleteUserId(id);

            res.status(200).send({
                message: 'Usuario deletado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    }

    static async editUser(req, res) {
        const { id } = req.params;
        const {
            user_name,
            address,
            password_hash,
            status
        } = req.body;

        try {
            const user = await userService.editUser({
                id,
                user_name,
                address,
                password_hash,
                status
            })

            res.status(200).json(user)

        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    }

}

module.exports = DocController  