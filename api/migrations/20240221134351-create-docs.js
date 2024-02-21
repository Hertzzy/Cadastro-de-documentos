'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('docs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      documentType: {
        type: Sequelize.ENUM("Prontuario", "Processo"),
        allowNull: false,
      },
      documentCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      documentCpf: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      upload: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('docs');
  }
};