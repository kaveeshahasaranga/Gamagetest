const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const mockProducts = [
  {
    name: 'Submariner Date',
    brand: 'Rolex',
    description: 'The archetype of the diver’s watch. Oyster, 41 mm, Oystersteel and yellow gold.',
    price: 14500,
    category: 'Men',
    images: ['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800'],
    stockCount: 5,
  },
  {
    name: 'Seamaster Diver 300M',
    brand: 'Omega',
    description: 'Co-Axial Master Chronometer 42 mm. Steel on steel. A legendary dive watch.',
    price: 5600,
    category: 'Men',
    images: ['https://images.unsplash.com/photo-1548171915-e231eefc2727?auto=format&fit=crop&q=80&w=800'],
    stockCount: 12,
  },
  {
    name: 'Nautilus 5711',
    brand: 'Patek Philippe',
    description: 'A classic sports watch reborn in luxury. Stainless steel with a blue dial.',
    price: 125000,
    category: 'Men',
    images: ['https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=800'],
    stockCount: 2,
  },
  {
    name: 'Lady-Datejust',
    brand: 'Rolex',
    description: 'Oyster, 28 mm, Oystersteel, Everose gold and diamonds. The classic watch of reference.',
    price: 18200,
    category: 'Women',
    images: ['https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&q=80&w=800'],
    stockCount: 8,
  },
  {
    name: 'Royal Oak Selfwinding',
    brand: 'Audemars Piguet',
    description: 'Iconic octagonal bezel with "Grande Tapisserie" dial. Steel case, luxury finished.',
    price: 35000,
    category: 'Unisex',
    images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800'],
    stockCount: 3,
  },
  {
    name: 'Speedmaster Moonwatch',
    brand: 'Omega',
    description: 'The iconic chronograph that went to the moon. Professional Master Chronometer.',
    price: 7000,
    category: 'Men',
    images: ['https://images.unsplash.com/photo-1517467139951-f5a925c9f9de?auto=format&fit=crop&q=80&w=800'],
    stockCount: 15,
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/timemaster');
    console.log('MongoDB Connected for Seeding');

    await Product.deleteMany({});
    console.log('Existing products cleared');

    await Product.insertMany(mockProducts);
    console.log('Database seeded with luxury watches successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

seedDatabase();
