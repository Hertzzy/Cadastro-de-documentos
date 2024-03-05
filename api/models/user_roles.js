'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_roles extends Model {
    static associate(models) {
    }
  }
  user_roles.init({
    user_id: DataTypes.STRING,
    role_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_roles',
  });
  return user_roles;
};