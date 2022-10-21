import DOMHandler from '../dom-handler.js';
import STORE from '../store.js';

function render() {
  const categories = STORE.categories;
  return `
    <div class="navbar custom-navbar-container">
        <nav class="container-fluid custom-navbar-section">
          <img class="custom-navbar-logo" src="../../assets/images/bsale-logo.png" alt="bsale-logo" />
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

function listenSearchByName() {
  const searchByName = document.querySelector('.js-search');
  searchByName.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      try {
        event.preventDefault();
        const name = event.target.value;
        if (STORE.params.some((param) => param.type === 'search')) {
          STORE.deleteParam('search');
        }
        STORE.addParam('search', name);
        await STORE.fetchProducts(STORE.getParams());
        DOMHandler.reload();
      } catch (error) {
        console.log(error);
      }
    }
  });
}

function listenFilterByCategory() {
  const categoriesContainer = document.querySelector('.js-categories');
  categoriesContainer.addEventListener('click', async (event) => {
    const categoryName = event.target.closest('[data-ctg]').dataset.ctg;
    try {
      if (STORE.params.some((param) => param.type === 'category')) {
        STORE.deleteParam('category');
      }
      STORE.addParam('category', categoryName);
      await STORE.fetchProducts(STORE.getParams());
      DOMHandler.reload();
    } catch (error) {
      console.log(error);
    }
  });
}

const Navbar = {
  toString() {
    return render();
  },
  addListeners() {
    listenSearchByName();
    listenFilterByCategory();
  }
};

export default Navbar;
