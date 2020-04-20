// const fileManagers = require('./fileManager/fileManager');
const expressApp = require('./express/app');
const dbConnect = require('./_helpers/db');

console.log('Server Initalization');
// Start HttpServer using Express
expressApp.HttpServer();

console.log('Database Initalization');
// Start MongoDB
dbConnect.dbConnection();