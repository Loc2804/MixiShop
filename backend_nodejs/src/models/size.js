'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Size.hasMany(models.Product, {foreignKey:'sizeId', as:'sizeData'})
      }
  };
  Size.init({
    sizeId: DataTypes.STRING,
    valueSize:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Size',
    freezeTableName: true,
  });
  return Size;
};