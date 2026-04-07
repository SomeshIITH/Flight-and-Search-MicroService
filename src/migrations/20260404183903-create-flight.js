'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightNumber: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {
          "model" : "Airplanes",
          "key" : "id"
        },
        onDelete : "CASCADE"
      },
      departureAirportId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {"model" : "Airports" , "key" : "id"},
        onDelete : "CASCADE"
      },
      arrivalAirportId: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references : {"model" : "Airports" , "key" : "id"},
        onDelete : "CASCADE"
      },
      arrivalTime: {
        type: Sequelize.DATE,
        allowNull : false
      },
      departureTime: {
        type: Sequelize.DATE,
        allowNull : false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      boardingGate: {
        type: Sequelize.STRING
      },
      totalSeats: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      remainingSeats: {
        type: Sequelize.INTEGER,
        allowNull : false,
        defaultValue : 0
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
    // Add Composite Index after creating table
    await queryInterface.addIndex('Flights', ['departureAirportId', 'arrivalAirportId', 'price'], {
      name: 'flights_search_index'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  }
};