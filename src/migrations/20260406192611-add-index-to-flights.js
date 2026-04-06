'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Why a Composite Index? 
     * Most users search for: "From X to Y within Price Z".
     * This index covers all three fields in one go.
     */
    await queryInterface.addIndex('Flights', ['departureAirportId', 'arrivalAirportId', 'price'], {
      name: 'flights_search_index' // Giving it a name makes it easier to manage/remove later
    });
  },

  async down(queryInterface, Sequelize) {
    // Always provide a way to undo your changes!
    await queryInterface.removeIndex('Flights', 'flights_search_index');
  }
};
