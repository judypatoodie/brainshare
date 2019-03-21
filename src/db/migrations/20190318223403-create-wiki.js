'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Wikis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      private: {
        type: Sequelize.BOOLEAN
        allowNull: false,
    	defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      wikiId: {
      type: Sequelize.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Wikis",
        key: "id",
        as: "wikiId",
      },
     }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Wikis');
  }
};
