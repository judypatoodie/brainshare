'use strict';
const faker = require("faker");

let wikis = [];

for(let i = 1 ; i <= 15 ; i++){
  wikis.push({
    title: faker.hacker.noun(),
    description: faker.hacker.phrase(),
    userId: 55,
    private: false,
    createdAt: new Date(),
    updatedAt: new Date()
  });
}
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert("Wikis", wikis, {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete("Wikis", null, {});
  }
};
