'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasOne(models.Bill , {foreignKey: 'orderId', as: 'orderData'});
      Order.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id', as: 'productData' });
      Order.belongsTo(models.User, { foreignKey: 'userId', targetKey:'id',as: 'userData' });
      }
  };
  Order.init({
    orderId:DataTypes.STRING,
    userId:DataTypes.INTEGER,
    productId:DataTypes.STRING,
    count:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
    freezeTableName: true,
  });
  return Order;
};