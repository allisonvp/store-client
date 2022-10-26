import DOMHandler from './scripts/dom-handler.js';
import MainPage from './scripts/pages/main-page.js';
import STORE from './scripts/store.js';

async function init() {
  try {
    //Load the products and categories as soon as the project is started.
    await STORE.fetchProducts();
    await STORE.fetchCategories();
    //Load the main page where the products and categories are displayed.
    DOMHandler.load(MainPage);
  } catch (error) {
    //In case there was an error in the api request, the error will be displayed.
    console.log(error);
  }
}

//Start the project
init();
