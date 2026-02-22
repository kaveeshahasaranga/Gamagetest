const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const fixAdminPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/timemaster');

        const adminUser = await User.findOne({ email: 'admin@gamage.com' });

        if (adminUser) {
            // Because the User model has a pre('save') hook that hashes the password automatically,
            // we should NOT hash it manually before saving. Just assign the plain text.
            adminUser.password = 'admin123';
            await adminUser.save();
            console.log('Fixed admin password to admin123');
        } else {
            console.log('Admin user not found. Run createAdmin.js first.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error fixing password', error);
        process.exit(1);
    }
};

fixAdminPassword();
