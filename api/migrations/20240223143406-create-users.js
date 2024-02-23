'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID
      },
      user_name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      password_hash: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM("Ativo", "Inativo", "Pendente", "Banido")
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};