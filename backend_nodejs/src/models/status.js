'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Status.hasMany(models.Bill, {foreignKey:'statusId', as:'statusData'})
      }
  };
  Status.init({
    statusId : DataTypes.STRING,
    valueStatus: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Status',
    freezeTableName: true,
  });
  return Status;
};