'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Order, {foreignKey:'userId', as:'userData'})
      User.hasOne(models.Bill, {foreignKey:'userId', as:'userDataBill'})
      }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName:DataTypes.STRING,
    address: DataTypes.STRING,
    phonenumber:DataTypes.STRING,
    roleId:DataTypes.STRING,
    avatar:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true,
  });
  return User;
};