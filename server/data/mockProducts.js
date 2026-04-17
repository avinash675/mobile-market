const mockProducts = [
  // Apple
  {
    _id: 'mock_prod_1',
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
    _id: 'mock_prod_2',
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
    _id: 'mock_prod_3',
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
  }
];

module.exports = mockProducts;
