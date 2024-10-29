'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Size , {foreignKey: 'sizeId', targetKey:'sizeId', as: 'sizeData'});
      Product.belongsTo(models.Price , {foreignKey: 'priceId', targetKey:'priceId', as: 'priceData'});
      Product.belongsTo(models.Type , {foreignKey: 'typeId', targetKey:'typeId', as: 'typeData'});
      Product.hasMany(models.Order, { foreignKey: 'productId', as: 'productData' });
      }
  };
  Product.init({
    productId : DataTypes.STRING,
    nameProduct: DataTypes.STRING,
    detailHTML: DataTypes.TEXT,
    detailMarkdown: DataTypes.TEXT,
    number : DataTypes.INTEGER,
    typeId: DataTypes.STRING,
    priceId: DataTypes.STRING,
    sizeId: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    img: DataTypes.STRING,
    isLove:DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Product',
    freezeTableName: true,
  });
  return Product;
};