const db = require('../models')
const {
    v4: uuidv4
} = require('uuid')
const {
    hash
} = require('bcryptjs')

class UserService {

    // Register new User
    async registerUser(dto) {
        const user = await db.users.findOne({
            where: {
                address: dto.address
            }
        });

        if (user) {
            throw new Error("Esse usuário já foi cadastrado");
        }

        try {
            const passwordHash = await hash(dto.password_hash, 8)

            const newUser = await db.users.create({
                id: uuidv4(),
                user_name: dto.user_name,
                address: dto.address,
                password_hash: passwordHash,
                status: dto.status
            })

            return newUser;

        } catch (error) {
            throw new Error('Erro ao cadastrar usuario')
        }
    };
    // Search all Users
    async searchAllUsers(){
        const users = await db.users.findAll()
        
        return users;
    };
    // Search one Users ID
    async searchUsersId(id){
         const user = await db.users.findOne({
             where: {
                 id: id
             }
         });

         if (!user) {
             throw new Error("Esse usuário não existe")
         }

         return user;
    };
    // Delete User ID
    async deleteUserId(id){
        await this.searchUsersId(id);

        try {
            await db.users.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar deletar o usuario! Tente novamente mais tarde')
        }
    }
    // Edit User
    async editUser(dto) {
        const user = await this.searchUsersId
        (dto.id);

        try {
            const passwordHash = await hash(dto.password_hash, 8)
            
            user.user_name = dto.user_name
            user.address = dto.address
            user.password_hash = passwordHash,
            user.status = dto.status
            
            await user.save()

            return user

        } catch (error) {
            throw new Error('Erro ao editar usuario! Tente novamente mais tarde')
        }


    };
}

module.exports = UserService;