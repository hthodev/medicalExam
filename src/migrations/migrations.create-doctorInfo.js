"use strict";

const sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("doctorInfo", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      priceId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      provinceId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      paymentId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      addressClinic: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nameClinic: {
        type: Sequelize.STRING,
        allowNull: false
      },
      note: {
        type: Sequelize.STRING,
      },
      count: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 0
      },
      doctorId: {
        type: Sequelize.INTEGER,
      },


      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("doctorInfo");
  },
};
