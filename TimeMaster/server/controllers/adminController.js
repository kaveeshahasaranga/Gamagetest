const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get Admin Dashboard Statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getAdminStats = async (req, res) => {
    try {
        const orders = await Order.find({});
        const productCount = await Product.countDocuments();
        const userCount = await User.countDocuments();

        const totalSales = orders.reduce((acc, item) => acc + item.totalAmount, 0);
        const activeOrders = orders.filter(order => order.deliveryStatus !== 'Delivered').length;

        res.json({
            totalSales,
            activeOrders,
            totalProducts: productCount,
            totalUsers: userCount
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching admin stats' });
    }
};
