'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bill.belongsTo(models.Status , {foreignKey: 'statusId', targetKey:'statusId', as: 'statusData'});
      Bill.belongsTo(models.Order , {foreignKey: 'orderId', targetKey:'orderId', as: 'orderData'});
      Bill.belongsTo(models.User, { foreignKey: 'userId', targetKey:'id',as: 'userDataBill' });
    }
  };
  Bill.init({
    orderId: DataTypes.STRING,
    userId:DataTypes.INTEGER,
    totalPrice:DataTypes.DOUBLE,
    note:DataTypes.STRING,
    paymentMethod:DataTypes.STRING,
    statusId:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Bill',
    freezeTableName: true,
  });
  return Bill;
};