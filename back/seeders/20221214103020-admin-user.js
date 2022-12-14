'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('users', [{
         uuid: 'b607b433-47e1-44cf-bc81-a37a3f6545d9',
         first_name: 'Tommy',
         last_name: 'Moreau',
         email: 'admin@email.com',
         password: '$2b$10$HyNxsIAF/EJnRSXxd9MTneFMpWUJkc5BR6GgOwtknKXjoESKOLtH.',
         icon_url: 'default.png',
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
  }
};
