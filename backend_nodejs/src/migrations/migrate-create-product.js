'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.STRING
      },
      nameProduct: {
        type: Sequelize.STRING
      },
      detailHTML: {
        type: Sequelize.TEXT('long')
      },
      detailMarkdown: {
        type: Sequelize.TEXT('long')
      },
      number: {
        type: Sequelize.INTEGER
      },
      priceId: {
        type: Sequelize.STRING
      },
      typeId: {
        type: Sequelize.STRING
      },
      sizeId: {
        type: Sequelize.STRING
      },
      discount: {
        type: Sequelize.INTEGER
      },
      img: {
        type: Sequelize.BLOB('long')
      },
      isLove: {
        type: Sequelize.BOOLEAN,
        defaultValue:false,
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product');
  }
};