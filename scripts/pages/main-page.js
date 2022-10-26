import Navbar from '../components/navbar.js';
import Products from '../components/products.js';
import DOMHandler from '../dom-handler.js';
import STORE from '../store.js';

function render() {
  const params = STORE.params;
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
                      name = param.name === 'asc' ? 'A-Z' : 'Z-A';
                      type = 'orden';
                      break;
                    default:
                      name = param.name;
                      type = 'busqueda';
                  }
                  return `<div class="custom-main-filter-option">
                            <p>${type}: ${name}</p>
                            <button data-filter=${param.type}>
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

//A function that listens when the user selects an option from the select html element.
function listenSelectOrder() {
  //stores the select html element with the js-order class in the selectOrder variable
  const selectOrder = document.querySelector('.js-order');
  //listen when the user selects an option from the select html element
  selectOrder.addEventListener('change', async (event) => {
    //stores the value of the option in the opt variable
    const opt = selectOrder.value;
    try {
      //validates whether the STORE's params array has already stored this type of query parameter (ordering)
      if (STORE.params.some((param) => param.type === 'ordering')) {
        //If true, the STORE calls its deleteParam method to remove it from its params array.
        STORE.deleteParam('ordering');
      }
      //the STORE calls its addParam method to add the ordering parameter.
      STORE.addParam('ordering', opt);
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

//Listens when the user clicks on the delete button of any of the filters list that are displayed on the html element div with the js-filter-options class
function listenRemoveFilter() {
  //stores the html element div with the js-filter-options class in the filterOptions variable.
  const filterOptions = document.querySelector('.js-filter-options');
  //listen when the user clicks on the button of any of the filterOptions's child elements.
  filterOptions.addEventListener('click', async (event) => {
    //stores the value of the data-filter attribute of the clicked element (its the type of the query param. Eg: category).
    const filterType = event.target.closest('[data-filter]').dataset.filter;
    try {
      //the STORE calls its deleteParam method to remove the query param from its params array.
      STORE.deleteParam(filterType);
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

const MainPage = {
  //returns the html. The innerHtml will read directly the html.
  toString() {
    return render();
  },
  //Add the main-page's listeners and the navbar's listeners
  addListeners() {
    listenSelectOrder();
    listenRemoveFilter();
    Navbar.addListeners();
  }
};

export default MainPage;
