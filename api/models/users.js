'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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