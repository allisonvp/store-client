import DOMHandler from '../dom-handler.js';
import STORE from '../store.js';

//Render the navbar that include the search input and the sidebar that includes all categories.
function render() {
  const categories = STORE.categories;
  return `
    <div class="navbar custom-navbar-container">
        <nav class="container-fluid custom-navbar-section">
          <button class="custom-navbar-logo-btn js-logo-btn">
            <img class="custom-navbar-logo" src="../../assets/images/bsale-logo.png" alt="bsale-logo" />
          </button>
          <div class="custom-navbar-options">
            <div class="input-text">
              <input class="js-search" id="productName" name="productName" type="text" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <button class="navbar-toggler custom-navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
          <div class="offcanvas offcanvas-end custom-offcanvas" data-bs-scroll="true"  tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div class="offcanvas-header custom-offcanvas-header">
              <h5 class="offcanvas-title custom-offcanvas-title" id="offcanvasWithBothOptionsLabel">Categorias</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body custom-offcanvas-body js-categories">
              ${categories
                .map((ctg) => `<button data-ctg=${ctg.id}>${ctg.name}</button>`)
                .join('')}
            </div>
          </div>    
        </nav>
    </div>
    `;
}

//A function that listens when the user clicks on the logo.
function listenLogoBtn() {
  const logoBtn = document.querySelector('.js-logo-btn');
  logoBtn.addEventListener('click', async (event) => {
    try {
      //the params array stores an empty array to delete its elements (query params).
      STORE.params = [];
      //the STORE calls its fetchProducts method without query params as an argument to update its products array (all products).
      await STORE.fetchProducts();
      //The DOMHandler reloads the MainPage module to re-render it with the updated product list.
      DOMHandler.reload();
    } catch (error) {
      //In case there was an error in the api request, the error will be displayed.
      console.log(error);
    }
  });
}

//A function that listens when the user searches for a product in the input and presses the Enter key.
function listenSearchByName() {
  const searchByName = document.querySelector('.js-search');
  searchByName.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      try {
        //trim() removes blanks at both ends of the string. Eg. '  mani   ' --> 'mani'
        const name = event.target.value.trim();
        //the params array stores an empty array to delete its elements (query params).
        STORE.params = [];
        //the STORE calls its fetchProducts method with the search query param as an argument to update its products array.
        await STORE.fetchProducts({ search: name });
        //The DOMHandler reloads the MainPage module to re-render it with the updated product list.
        DOMHandler.reload();
      } catch (error) {
        //In case there was an error in the api request, the error will be displayed.
        console.log(error);
      }
    }
  });
}

//Listens when the user clicks on any category in the list of categories displayed in the html div element with the js-categories class
function listenFilterByCategory() {
  const categoriesContainer = document.querySelector('.js-categories');
  categoriesContainer.addEventListener('click', async (event) => {
    //stores the value of the data-ctg attribute of the clicked element (Eg: pisco).
    const categoryName = event.target.closest('[data-ctg]').dataset.ctg;
    try {
      //validates whether the STORE's params array has already stored this type of query parameter (category)
      if (STORE.params.some((param) => param.type === 'category')) {
        //If true, the STORE calls its deleteParam method to remove it from its params array.
        STORE.deleteParam('category');
      }
      //the STORE calls its addParam method to add the category param.
      STORE.addParam('category', categoryName);
      //the STORE calls its fetchProducts method with the params array as an argument to update its products array
      await STORE.fetchProducts(STORE.getParams());
      //The DOMHandler reloads the MainPage module to re-render it with the updated product list.
      DOMHandler.reload();
    } catch (error) {
      //In case there was an error in the api request, the error will be displayed.
      console.log(error);
    }
  });
}

const Navbar = {
  //returns the html. The innerHtml will read directly the html.
  toString() {
    return render();
  },
  //Add the navbar's listeners
  addListeners() {
    listenSearchByName();
    listenFilterByCategory();
    listenLogoBtn();
  }
};

export default Navbar;
