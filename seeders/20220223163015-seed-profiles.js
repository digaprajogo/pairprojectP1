'use strict';

const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const data = JSON.parse(fs.readFileSync('./data/profiles.json', 'UTF-8'))
     data.forEach(el => {
       el.createdAt = new Date()
       el.updatedAt = new Date()
     });
      // console.log(data);
     return queryInterface.bulkInsert('Profiles', data , {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Profiles', null, {});
  }
};
