const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/timemaster');

        // Check if admin exists
        let adminUser = await User.findOne({ email: 'admin@gamage.com' });

        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash('admin123', salt);

        if (!adminUser) {
            adminUser = new User({
                name: 'GAMAGE Admin',
                email: 'admin@gamage.com',
                password: password,
                role: 'admin'
            });
            await adminUser.save({ validateBeforeSave: false }); // bypass pre-save hook since we already hashed
            console.log('Created new Admin user: admin@gamage.com / admin123');
        } else {
            adminUser.password = password;
            adminUser.role = 'admin';
            await adminUser.save({ validateBeforeSave: false });
            console.log('Updated existing Admin user: admin@gamage.com / admin123');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin', error);
        process.exit(1);
    }
};

createAdmin();
