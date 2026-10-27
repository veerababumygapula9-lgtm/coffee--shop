export const CATEGORIES = ["All Coffee", "Macchiato", "Latte", "Americano", "Cappuccino"];

export const SIZES = ["S", "M", "L"];
const SIZE_PRICE_OFFSET = { S: -0.5, M: 0, L: 0.75 };

export const DELIVERY_FEE = 2.0;
export const DELIVERY_DISCOUNT = 1.0;

const LONG_DESCRIPTION =
  "A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85 ml of fresh milk the fo.. " +
  "Topped with a velvety layer of microfoam, it is balanced, rich and best enjoyed while it is still warm.";

export const PRODUCTS = [
  { id: 1, name: "Caffe Mocha", subtitle: "Deep Foam", variant: "Ice/Hot", category: "Latte", price: 4.53, rating: 4.8, reviews: 230, image: "/images/coffee-2.png", description: LONG_DESCRIPTION },
  { id: 2, name: "Flat White", subtitle: "Espresso", variant: "Hot", category: "Latte", price: 3.53, rating: 4.8, reviews: 184, image: "/images/coffee-3.png", description: LONG_DESCRIPTION },
  { id: 3, name: "Caffe Macchiato", subtitle: "Espresso Mark", variant: "Ice/Hot", category: "Macchiato", price: 3.95, rating: 4.7, reviews: 142, image: "/images/coffee-1.png", description: LONG_DESCRIPTION },
  { id: 4, name: "Americano", subtitle: "Long Black", variant: "Ice/Hot", category: "Americano", price: 2.95, rating: 4.6, reviews: 312, image: "/images/coffee-4.png", description: LONG_DESCRIPTION },
  { id: 5, name: "Cappuccino", subtitle: "With Oat Milk", variant: "Hot", category: "Cappuccino", price: 4.2, rating: 4.9, reviews: 410, image: "/images/coffee-5.png", description: LONG_DESCRIPTION },
  { id: 6, name: "Vanilla Latte", subtitle: "Creamy Foam", variant: "Ice/Hot", category: "Latte", price: 4.75, rating: 4.7, reviews: 96, image: "/images/coffee-3.png", description: LONG_DESCRIPTION },
];

export const getUnitPrice = (product, size) => product.price + SIZE_PRICE_OFFSET[size];

export const formatPrice = (value) => `$ ${value.toFixed(2)}`;
