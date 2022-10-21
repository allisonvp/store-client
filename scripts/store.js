import { getCategories } from './services/categories-service.js';
import { getProducts } from './services/products-service.js';

async function fetchProducts(params) {
  const productsList = await getProducts(params);
  this.products = productsList;
}

async function fetchCategories() {
  const categoriesList = await getCategories();
  this.categories = categoriesList;
}

function getParams() {
  return Object.fromEntries(this.params.map(({ type, name }) => [type, name]));
}
function addParam(type, name) {
  this.params.push({ type, name });
}
function deleteParam(type) {
  this.params = this.params.filter((param) => {
    return param.type !== type;
  });
}

const STORE = {
  products: [],
  categories: [],
  params: [],
  fetchProducts,
  fetchCategories,
  getParams,
  addParam,
  deleteParam
};

export default STORE;
