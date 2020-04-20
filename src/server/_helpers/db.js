const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path')

dotenv.config({ path: './config/config.env' });

module.exports = {
    dbConnection: async function() {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            });

    
            console.log(`mongoDB Connected: ${conn.connection.host}`);
        } catch (err) {
            console.log(`Error: ${err.message}`);
            process.exit(1);
        }
    }
};