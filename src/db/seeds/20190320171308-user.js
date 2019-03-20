'use strict';
'use strict';
const faker = require("faker");

let users = [{
     id: 10,
     username: faker.name.findName(),
     email: faker.internet.email(),
     password: "password1",
     createdAt: new Date(),
     updatedAt: new Date(),
     role: "standard"
     },
     {
     id: 20,
     username: faker.name.findName(),
     email: faker.internet.email(),
     password: "password2",
     createdAt: new Date(),
     updatedAt: new Date(),
     role: "standard"
     }
]
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete("Users", null, {});
  }
};
