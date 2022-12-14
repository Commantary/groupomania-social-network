'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      uuid: '39de87b2-7bb6-11ed-a1eb-0242ac120002',
      first_name: 'Joe',
      last_name: 'Doer',
      email: 'joe@email.com',
      password: '$2b$10$Sv0Vlm6Vm9VDxZVqRxBqWujSatmDmGTINaGS0HQxGyqkdCbkCEx2O',
      icon_url: 'default.png',
      role: 'user',
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
  }
};
