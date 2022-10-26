//The store uses the services functions to load the data into its variables.
import { getCategories } from './services/categories-service.js';
import { getProducts } from './services/products-service.js';

//Loads the list of products in its products array.
async function fetchProducts(params) {
  const productsList = await getProducts(params);
  this.products = productsList;
}

//Loads the list of categories in its categories array.
async function fetchCategories() {
  const categoriesList = await getCategories();
  this.categories = categoriesList;
}

/** Query params: functions that manipulate the params array to filter products by two requirements (category or ordering) at the same time and display the applied filters on screen */
//Convert [{ type: 'category', name: 'pisco' },{ type: 'ordering', name: 'desc' }] to --> [[category,pisco],[ordering,desc]] to --> {'category': 'pisco', 'ordering': 'desc'} to be a valid argument for the URLSearchParams object.
function getParams() {
  return Object.fromEntries(this.params.map(({ type, name }) => [type, name]));
}

//Add a query parameter to the params array
function addParam(type, name) {
  this.params.push({ type, name });
}

//Remove a query parameter from the params array
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
