'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.belongsToMany(models.roles, {
        through: models.user_roles,
        as: 'users_roles',
        foreignKey: 'user_id'
      })

      users.belongsToMany(models.permissions, {
          through: models.user_permissions,
          as: 'users_permissions',
          foreignKey: 'user_id'
        })
    }
  }
  users.init({
    user_name: DataTypes.STRING,
    address: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    status: DataTypes.ENUM("Ativo", "Inativo", "Pendente", "Banido"),
  }, {
    sequelize,
    modelName: 'users',
    defaultScope: {
      attributes: {
        exclude: ['password_hash']
      }
    }
  });
  return users;
};