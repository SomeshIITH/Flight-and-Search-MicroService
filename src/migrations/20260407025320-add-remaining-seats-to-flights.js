'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Flights', 'remainingSeats', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0 // We will sync this with totalSeats in the Service layer logic
    });
  },

  async down(queryInterface, Sequelize) {
    // If we need to undo this, we remove the column
    await queryInterface.removeColumn('Flights', 'remainingSeats');
  }
};
