import Navbar from '../components/navbar.js';
import Products from '../components/products.js';
import DOMHandler from '../dom-handler.js';
import STORE from '../store.js';

function render() {
  const params = [...STORE.params];
  const categories = STORE.categories;
  return `
    ${Navbar}
    <div class="custom-main-container">
        <div class="custom-main-options">
          <select class="form-select custom-main-form-select js-order" aria-label="Default select example">
            <option selected>Orden</option>
            <option value="asc">Nombre: A-Z</option>
            <option value="desc">Nombre: Z-A</option>
          </select>
        </div>
        <div class="custom-main-filter-options js-filter-options">
        ${
          params.length !== 0
            ? params
                .map((param) => {
                  let name;
                  let type;
                  switch (param.type) {
                    case 'category':
                      name = categories.find(
                        (ctg) => ctg.id === +param.name
                      ).name;
                      type = 'categoria';
                      break;
                    case 'ordering':
                      name = param.name === 'name' ? 'A-Z' : 'Z-A';
                      type = 'orden';
                      break;
                    default:
                      name = param.name;
                      type = 'busqueda';
                  }
                  return `<div class="custom-main-filter-option" data-filter=${param.type}>
                            <p>${type}: ${name}</p>
                            <button>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>`;
                })
                .join('')
            : ''
        }
        </div>
        ${
          STORE.products.length === 0 || STORE.products === null
            ? `<div class="custom-main-no-products">No products found</div>`
            : Products
        }
    </div>
  `;
}

function listenSelectOrder() {
  const selectOrder = document.querySelector('.js-order');
  selectOrder.addEventListener('change', async (event) => {
    const opt = selectOrder.value;
    let opt_order;
    try {
      opt_order = opt === 'asc' ? 'name' : '-name';
      if (STORE.params.some((param) => param.type === 'ordering')) {
        STORE.deleteParam('ordering');
      }
      STORE.addParam('ordering', opt_order);
      await STORE.fetchProducts(STORE.getParams());
      DOMHandler.reload();
    } catch (error) {
      console.log(error);
    }
  });
}

function listenRemoveFilter() {
  const filterOptions = document.querySelector('.js-filter-options');
  filterOptions.addEventListener('click', async (event) => {
    const filterType = event.target.closest('[data-filter]').dataset.filter;
    try {
      STORE.deleteParam(filterType);
      await STORE.fetchProducts(STORE.getParams());
      DOMHandler.reload();
    } catch (error) {
      console.log(error);
    }
  });
}

const MainPage = {
  toString() {
    return render();
  },
  addListeners() {
    listenSelectOrder();
    listenRemoveFilter();
    Navbar.addListeners();
  }
};

export default MainPage;
