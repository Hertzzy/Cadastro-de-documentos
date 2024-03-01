'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permissions extends Model {
    static associate(models) {
      permissions.belongsToMany(models.users, {
        through: models.user_permissions,
        as: 'permissions_of_user',
        foreignKey: 'permission_id'
      })

      permissions.belongsToMany(models.roles, {
        through: models.roles_permissions,
        as: 'permissions_of_roles',
        foreignKey: 'permission_id'
      })
    }
  }
  permissions.init({
    permission_name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'permissions',
  });
  return permissions;
};