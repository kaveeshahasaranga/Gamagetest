const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const makeAdmins = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/timemaster');
        await User.updateMany({}, { role: 'admin' });
        console.log('Successfully elevated all test users to admin role.');
        process.exit(0);
    } catch (error) {
        console.error('Error making admins', error);
        process.exit(1);
    }
};

makeAdmins();
