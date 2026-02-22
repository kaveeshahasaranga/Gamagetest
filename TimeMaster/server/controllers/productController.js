const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
    try {
        const { brand, category, minPrice, maxPrice, sort } = req.query;
        let query = {};

        // Filter by Brand
        if (brand) {
            const brandsArray = brand.split(',');
            query.brand = { $in: brandsArray };
        }

        // Filter by Category
        if (category) {
            const categoriesArray = category.split(',');
            query.category = { $in: categoriesArray };
        }

        // Filter by Price Range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        let mongooseQuery = Product.find(query);

        // Sorting
        if (sort) {
            switch (sort) {
                case 'price_asc':
                    mongooseQuery = mongooseQuery.sort({ price: 1 });
                    break;
                case 'price_desc':
                    mongooseQuery = mongooseQuery.sort({ price: -1 });
                    break;
                case 'newest':
                    mongooseQuery = mongooseQuery.sort({ createdAt: -1 });
                    break;
                default:
                    mongooseQuery = mongooseQuery.sort({ createdAt: -1 });
            }
        } else {
            mongooseQuery = mongooseQuery.sort({ createdAt: -1 }); // Default sort
        }

        const products = await mongooseQuery;
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching products' });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error fetching product' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
    try {
        const product = new Product({
            name: 'Sample name',
            price: 0,
            brand: 'Sample brand',
            category: 'Sample category',
            stockCount: 0,
            description: 'Sample description',
            images: [],
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server error creating product' });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
    try {
        const { name, price, description, images, brand, category, stockCount } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name;
            product.price = price;
            product.description = description;
            product.images = images;
            product.brand = brand;
            product.category = category;
            product.stockCount = stockCount;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error updating product' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await Product.deleteOne({ _id: product._id });
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error deleting product' });
    }
};
