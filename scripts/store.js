import { getProducts } from './services/products-service.js';

async function fetchProducts(params) {
  const productsList = await getProducts(params);
  this.products = productsList;
}

const STORE = {
  products: [],
  fetchProducts
};

export default STORE;
