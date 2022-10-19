import DOMHandler from './scripts/dom-handler.js';
import MainPage from './scripts/pages/main-page.js';
import STORE from './scripts/store.js';

async function init() {
  try {
    await STORE.fetchProducts();
    DOMHandler.load(MainPage);
  } catch (error) {
    console.log(error);
  }
}

init();
