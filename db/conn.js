// console.log(process.env.DATABASE_URL);
const Sequelize= require('sequelize');
module.exports = new Sequelize(process.env.DATABASE_URL);
