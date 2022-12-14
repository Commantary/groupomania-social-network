'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      uuid: 'a607b433-4a37-44cf-bc81-a37a3f6596g7',
      first_name: 'Joe',
      last_name: 'Doer',
      email: 'joe@email.com',
      password: 'JoeDoer1234',
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
