require('dotenv').config();
const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize( 
  process.env.DB_DATABASE_NAME, 
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD , 
  {
    host: process.env.DB_HOST,
    dialect:  process.env.DB_DIALECT,
    logging: false,
    query:{
      raw:true,
    },
    timezone: "+07:00",
  }
  
);

let connectDB = async() =>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.' );
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = connectDB;