const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const products = [
  // Apple
  {
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    year: 2023,
    ram: '8GB',
    price: 139900,
    originalPrice: 159900,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800',
    category: 'Smartphones',
    description: 'Titanium design, A17 Pro chip, powerful camera system.',
    countInStock: 10,
    isFeatured: true,
    specs: { ram: '8GB', storage: '256GB', battery: '4422 mAh', camera: '48MP Main', processor: 'A17 Pro', screen: '6.7" OLED' }
  },
  {
    name: 'iPhone 14 Pro',
    brand: 'Apple',
    year: 2022,
    ram: '6GB',
    price: 99900,
    originalPrice: 119900,
    image: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?auto=format&fit=crop&q=80&w=800',
    category: 'Smartphones',
    description: 'Dynamic Island, 48MP camera, A16 Bionic.',
    countInStock: 5,
    isFeatured: false,
    specs: { ram: '6GB', storage: '128GB', battery: '3200 mAh', camera: '48MP Main', processor: 'A16 Bionic', screen: '6.1" OLED' }
  },
  // Samsung
  {
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    year: 2024,
    ram: '12GB',
    price: 119999,
    originalPrice: 134999,
    image: 'https://images.unsplash.com/photo-1706111166317-57551046183e?auto=format&fit=crop&q=80&w=800',
    category: 'Smartphones',
    description: 'AI-infused power, 200MP camera, built-in S Pen.',
    countInStock: 15,
    isFeatured: true,
    specs: { ram: '12GB', storage: '512GB', battery: '5000 mAh', camera: '200MP Quad', processor: 'Snapdragon 8 Gen 3', screen: '6.8" AMOLED' }
  },
  {
    name: 'Galaxy S23 FE',
    brand: 'Samsung',
    year: 2023,
    ram: '8GB',
    price: 44999,
    originalPrice: 59999,
    image: 'https://images.unsplash.com/photo-1697528394464-9603be4446c6?auto=format&fit=crop&q=80&w=800',
    category: 'Smartphones',
    description: 'Flagship features at an approachable price.',
    countInStock: 8,
    isFeatured: false,
    specs: { ram: '8GB', storage: '128GB', battery: '4500 mAh', camera: '50MP Triple', processor: 'Exynos 2200', screen: '6.4" AMOLED' }
  },
  // OnePlus
  {
    name: 'OnePlus 12',
    brand: 'OnePlus',
    year: 2024,
    ram: '12GB',
    price: 61999,
    originalPrice: 69999,
    image: 'https://images.unsplash.com/photo-1706692881062-8e1f82729a8a?auto=format&fit=crop&q=80&w=800',
    category: 'Smartphones',
    description: 'Smooth Beyond Belief, Snapdragon 8 Gen 3.',
    countInStock: 12,
    isFeatured: true,
    specs: { ram: '12GB', storage: '256GB', battery: '5400 mAh', camera: '50MP Triple', processor: 'Snapdragon 8 Gen 3', screen: '6.82" AMOLED' }
  },
  // Google
  {
    name: 'Pixel 8 Pro',
    brand: 'Google',
    year: 2023,
    ram: '12GB',
    price: 92999,
    originalPrice: 106999,
    image: 'https://images.unsplash.com/photo-1696541019662-79017688be57?auto=format&fit=crop&q=80&w=800',
    category: 'Smartphones',
    description: 'The magic of Google AI in a flagship phone.',
    countInStock: 6,
    isFeatured: true,
    specs: { ram: '12GB', storage: '128GB', battery: '5050 mAh', camera: '50MP Triple', processor: 'Tensor G3', screen: '6.7" OLED' }
  },
  // Add 40+ more items here for a real marketplace feel
  ...Array.from({ length: 40 }).map((_, i) => ({
    name: `Model ${2020 + (i % 5)} Pro`,
    brand: ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Vivo', 'Oppo'][i % 6],
    year: 2020 + (i % 5),
    ram: ['4GB', '8GB', '12GB', '16GB'][i % 4],
    price: 20000 + (Math.random() * 80000),
    originalPrice: 30000 + (Math.random() * 90000),
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
    category: 'Smartphones',
    description: 'Premium performance, laboratory certified.',
    countInStock: Math.floor(Math.random() * 20),
    isFeatured: false,
    specs: { ram: '8GB', storage: '128GB', battery: '4500 mAh', camera: '48MP', processor: 'Quad Core', screen: '6.5" OLED' }
  }))
];

mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    await Product.insertMany(products);

    console.log('✅ Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    console.log('✅ Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
