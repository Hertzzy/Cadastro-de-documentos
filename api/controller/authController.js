const AuthService = require('../services/AuthService');
const authService = new AuthService();

class AuthController {
    static async login(req, res) {
        const { 
            address,
            password_hash
        } = req.body;

        const { userId } = req.body;
        // console.log(userId)

        try {

            const login = await authService.login({
                userId,
                address,
                password_hash
            })

            res.status(200).send(login)

        } catch (error) {

            res.status(401).send({
                message: error.message
            })

        }
    }
};

module.exports = AuthController;