/**
 * Mobixa Comprehensive Product Dataset
 * Featuring 40+ real-world models from the last 5 years.
 */

export const products = [
  // --- APPLE (iPhone 15 to 11 + SE) ---
  {
    id: "iphone-15-pro-max",
    name: "Apple iPhone 15 Pro Max",
    brand: "Apple",
    image: "https://m.media-amazon.com/images/I/81Os1SDWpcL._SX679_.jpg", 
    price: 148900,
    originalPrice: 159900,
    discount: "7% OFF",
    condition: "Like New",
    rating: "4.9",
    reviews: 1240,
    isPopular: true,
    isDeal: true,
    category: "Flagship",
    stock: 8,
    ram: "8GB",
    storage: "256GB",
    year: 2023,
    images: [
      "https://m.media-amazon.com/images/I/81Os1SDWpcL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/8167eUr6XzL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71u9s9e-HXL._SX679_.jpg"
    ],
    colors: [
      { name: "Natural Titanium", hex: "#BEBEBE", image: "https://m.media-amazon.com/images/I/81Os1SDWpcL._SX679_.jpg" },
      { name: "Blue Titanium", hex: "#4B5361", image: "https://m.media-amazon.com/images/I/81Sig8S1K-L._SX679_.jpg" }
    ],
    specs: { battery: "4441 mAh", charger: "20W", camera: "48MP Triple", performance: "A17 Pro" },
    technicalSpecs: [{ label: "Weight", value: "221g" }, { label: "Display", value: "6.7-inch OLED" }]
  },
  {
    id: "iphone-14",
    name: "Apple iPhone 14",
    brand: "Apple",
    image: "https://m.media-amazon.com/images/I/61bK6PMOC3L._SX679_.jpg", 
    price: 58999,
    originalPrice: 69900,
    discount: "16% OFF",
    condition: "Excellent",
    rating: "4.7",
    reviews: 540,
    stock: 15,
    ram: "6GB",
    storage: "128GB",
    year: 2022,
    images: [
      "https://m.media-amazon.com/images/I/61bK6PMOC3L._SX679_.jpg",
      "https://m.media-amazon.com/images/I/719f9S7x-DL._SX679_.jpg"
    ],
    specs: { battery: "3279 mAh", charger: "20W", camera: "12MP Dual", performance: "A15 Bionic" }
  },
  {
    id: "iphone-13",
    name: "Apple iPhone 13",
    brand: "Apple",
    image: "https://m.media-amazon.com/images/I/71xb2xkN5qL._SX679_.jpg",
    price: 48999,
    originalPrice: 59900,
    discount: "18% OFF",
    condition: "Good",
    rating: "4.6",
    reviews: 920,
    stock: 22,
    ram: "4GB",
    storage: "128GB",
    year: 2021,
    images: [
      "https://m.media-amazon.com/images/I/71xb2xkN5qL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71657ZmqS5L._SX679_.jpg"
    ]
  },
  {
    id: "iphone-12",
    name: "Apple iPhone 12",
    brand: "Apple",
    image: "https://m.media-amazon.com/images/I/71ZOtNdaZCL._SX679_.jpg",
    price: 36999,
    originalPrice: 49900,
    discount: "26% OFF",
    condition: "Good",
    rating: "4.5",
    reviews: 1450,
    stock: 30,
    ram: "4GB",
    storage: "64GB",
    year: 2020,
    images: [
      "https://m.media-amazon.com/images/I/71ZOtNdaZCL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71wa0VscIqL._SX679_.jpg"
    ]
  },
  {
    id: "iphone-se-2022",
    name: "Apple iPhone SE (2022)",
    brand: "Apple",
    image: "https://m.media-amazon.com/images/I/61TOWf11+jL._SX679_.jpg",
    price: 32900,
    originalPrice: 43900,
    discount: "25% OFF",
    condition: "Excellent",
    rating: "4.4",
    reviews: 280,
    stock: 12,
    ram: "4GB",
    storage: "64GB",
    year: 2022,
    images: [ "https://m.media-amazon.com/images/I/61TOWf11+jL._SX679_.jpg" ]
  },

  // --- SAMSUNG (S24 to S21 + A) ---
  {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    image: "https://m.media-amazon.com/images/I/71RVu7E41LL._SX679_.jpg",
    price: 129999,
    originalPrice: 144999,
    discount: "10% OFF",
    condition: "Like New",
    rating: "4.9",
    reviews: 210,
    isPopular: true,
    category: "Flagship",
    stock: 5,
    ram: "12GB",
    storage: "256GB",
    year: 2024,
    images: [
      "https://m.media-amazon.com/images/I/71RVu7E41LL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71S-TogF7qL._SX679_.jpg"
    ],
    specs: { battery: "5000 mAh", charger: "45W", camera: "200MP Quad", performance: "Snapdragon 8 Gen 3" }
  },
  {
    id: "samsung-s23",
    name: "Samsung Galaxy S23",
    brand: "Samsung",
    image: "https://m.media-amazon.com/images/I/51L8W6d-DNL._SX679_.jpg",
    price: 49999,
    originalPrice: 74999,
    discount: "33% OFF",
    condition: "Excellent",
    rating: "4.7",
    reviews: 380,
    stock: 18,
    ram: "8GB",
    storage: "128GB",
    year: 2023,
    images: [
      "https://m.media-amazon.com/images/I/51L8W6d-DNL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61S9BY069vL._SX679_.jpg"
    ]
  },
  {
    id: "samsung-s22",
    name: "Samsung Galaxy S22",
    brand: "Samsung",
    image: "https://m.media-amazon.com/images/I/71PvDf66LXL._SX679_.jpg",
    price: 34999,
    originalPrice: 52999,
    discount: "34% OFF",
    condition: "Good",
    rating: "4.5",
    reviews: 860,
    stock: 25,
    year: 2022,
    images: [ "https://m.media-amazon.com/images/I/71PvDf66LXL._SX679_.jpg" ]
  },
  {
    id: "samsung-a54",
    name: "Samsung Galaxy A54 5G",
    brand: "Samsung",
    image: "https://m.media-amazon.com/images/I/81I-D7S0V3L._SX679_.jpg",
    price: 28999,
    originalPrice: 38999,
    discount: "25% OFF",
    condition: "Excellent",
    rating: "4.4",
    reviews: 1100,
    stock: 45,
    ram: "8GB",
    storage: "128GB",
    year: 2023,
    images: [ "https://m.media-amazon.com/images/I/81I-D7S0V3L._SX679_.jpg" ]
  },

  // --- GOOGLE ---
  {
    id: "google-pixel-8-pro",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    image: "https://m.media-amazon.com/images/I/71p0Wf4EACL._SX679_.jpg",
    price: 98999,
    originalPrice: 106000,
    discount: "7% OFF",
    condition: "Like New",
    rating: "4.8",
    reviews: 156,
    stock: 4,
    ram: "12GB",
    storage: "128GB",
    year: 2023,
    images: [ "https://m.media-amazon.com/images/I/71p0Wf4EACL._SX679_.jpg" ],
    specs: { battery: "5050 mAh", charger: "30W", camera: "50MP Triple", performance: "Google Tensor G3" }
  },
  {
    id: "google-pixel-7a",
    name: "Google Pixel 7a",
    brand: "Google",
    image: "https://m.media-amazon.com/images/I/51r2nQ2n7UL._SX679_.jpg",
    price: 36999,
    originalPrice: 43999,
    discount: "16% OFF",
    condition: "Like New",
    rating: "4.6",
    reviews: 240,
    stock: 12,
    year: 2023,
    images: [ "https://m.media-amazon.com/images/I/51r2nQ2n7UL._SX679_.jpg" ]
  },

  // --- ONEPLUS ---
  {
    id: "oneplus-12",
    name: "OnePlus 12",
    brand: "OnePlus",
    image: "https://m.media-amazon.com/images/I/71Vf681nSFL._SL1500_.jpg", // Flowy Emerald
    price: 64999,
    originalPrice: 69999,
    discount: "7% OFF",
    condition: "Like New",
    rating: "4.9",
    reviews: 310,
    isPopular: true,
    stock: 7,
    ram: "12GB",
    storage: "256GB",
    year: 2024,
    images: [
      "https://m.media-amazon.com/images/I/71Vf681nSFL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71Gq5G-G7XL._SL1500_.jpg"
    ],
    specs: { battery: "5400 mAh", charger: "80W", camera: "50MP Triple", performance: "Snapdragon 8 Gen 3" }
  },
  {
    id: "oneplus-11-5g",
    name: "OnePlus 11 5G",
    brand: "OnePlus",
    image: "https://m.media-amazon.com/images/I/61amb0CfMGL._SX679_.jpg",
    price: 45999,
    originalPrice: 56999,
    discount: "19% OFF",
    condition: "Excellent",
    rating: "4.7",
    reviews: 620,
    stock: 14,
    year: 2023,
    images: [ "https://m.media-amazon.com/images/I/61amb0CfMGL._SX679_.jpg" ]
  },

  // --- VIVO ---
  {
    id: "vivo-x100-pro",
    name: "Vivo X100 Pro",
    brand: "Vivo",
    image: "https://m.media-amazon.com/images/I/71mmp0V5-EL._SX679_.jpg",
    price: 89999,
    originalPrice: 96999,
    discount: "7% OFF",
    condition: "Like New",
    rating: "4.8",
    reviews: 86,
    stock: 3,
    ram: "16GB",
    storage: "512GB",
    year: 2024,
    images: [ "https://m.media-amazon.com/images/I/71mmp0V5-EL._SX679_.jpg" ],
    specs: { battery: "5400 mAh", charger: "100W", camera: "50MP ZEISS", performance: "Dimensity 9300" }
  },

  // --- iQOO ---
  {
    id: "iqoo-12",
    name: "iQOO 12 5G",
    brand: "iQOO",
    image: "https://m.media-amazon.com/images/I/61mI-gA5uML._SX679_.jpg",
    price: 52999,
    originalPrice: 59999,
    discount: "11% OFF",
    condition: "Like New",
    rating: "4.8",
    reviews: 145,
    stock: 6,
    ram: "12GB",
    storage: "256GB",
    year: 2024,
    images: [ "https://m.media-amazon.com/images/I/61mI-gA5uML._SX679_.jpg" ],
    specs: { battery: "5000 mAh", charger: "120W", camera: "50MP Triple", performance: "Snapdragon 8 Gen 3" }
  },

  // --- OPPO ---
  {
    id: "oppo-reno-11-pro",
    name: "Oppo Reno 11 Pro 5G",
    brand: "Oppo",
    image: "https://m.media-amazon.com/images/I/81R9X-A-tCL._SX679_.jpg",
    price: 37999,
    originalPrice: 44999,
    discount: "15% OFF",
    condition: "Excellent",
    rating: "4.7",
    reviews: 210,
    stock: 10,
    ram: "12GB",
    storage: "256GB",
    year: 2024,
    images: [ "https://m.media-amazon.com/images/I/81R9X-A-tCL._SX679_.jpg" ],
    specs: { battery: "4600 mAh", charger: "80W", camera: "50MP Triple", performance: "Dimensity 8200" }
  },

  // --- REALME ---
  {
    id: "realme-12-pro-plus",
    name: "Realme 12 Pro+ 5G",
    brand: "Realme",
    image: "https://m.media-amazon.com/images/I/816n4uY0d1L._SX679_.jpg",
    price: 29999,
    originalPrice: 36999,
    discount: "19% OFF",
    condition: "Like New",
    rating: "4.6",
    reviews: 350,
    stock: 14,
    ram: "8GB",
    storage: "256GB",
    year: 2024,
    images: [ "https://m.media-amazon.com/images/I/816n4uY0d1L._SX679_.jpg" ],
    specs: { battery: "5000 mAh", charger: "67W", camera: "64MP Periscope", performance: "Snapdragon 7s Gen 2" }
  }
];

export const ALL_BRANDS = ["Apple", "Samsung", "Vivo", "Oppo", "iQOO", "Google", "Xiaomi", "OnePlus", "Nothing", "Realme"];
export default products;
