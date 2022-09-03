'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
      uuid: 'b607b433-47e1-44cf-bc81-a37a3f6545d9',
      first_name: 'Tommy',
      last_name: 'Moreau',
      email: 'tommy@email.com',
      password: '$2b$10$5jg8SXoUJ2MJ/eYhbk5nqeJZLqtbOy12fAyjjgvN6mF8JJmFpHmeC',
      socialview: true,
      icon_url: 'http://localhost:3000/images/default.png',
      role: 'admin',
      createdAt: '2022-08-30 02:18:22.849+02',
      updatedAt: '2022-08-30 02:18:22.849+02'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
