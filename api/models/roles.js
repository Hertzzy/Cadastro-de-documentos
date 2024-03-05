'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    static associate(models) {
      roles.belongsToMany(models.users, {
        through: models.user_roles,
        as: 'roles_do_usuario',
        foreignKey: 'role_id'
      })

      roles.belongsToMany(models.permissions, {
        through: models.roles_permissions,
        as: 'roles_das_permissoes',
        foreignKey: 'role_id'
      })
    }
  }
  roles.init({
    role_name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'roles',
  });

  return roles;
  
};