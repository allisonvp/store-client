import STORE from '../store.js';

//The map function iterates through the array of products and has the renderProduct function as a callback to render the product card for each product of the array of products.
function render() {
  const products = STORE.products;
  return `
    <div class="custom-main-cards-container">
      ${products.map(renderProduct).join('')}
    </div>
  `;
}

//Render the product card.
function renderProduct({ id, name, url_image, price, discount, category }) {
  let discounted_price = null;
  let discounted_price_str = null;
  //toLocaleString returns a string with a language-sensitive representation of the price.
  let price_str = price.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP'
  });
  //If there is a discount, calculate de discounted price and stores into the discounted_price variable with the local
  if (discount) {
    discounted_price = price * (1 - discount / 100);
    discounted_price_str = discounted_price.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP'
    });
  }
  return `
  <div class="custom-card-container">
    ${discount ? `<div class="custom-card-discount">-${discount}%</div>` : ''}
    <div class="custom-card-data">
      ${
        url_image
          ? `<div class="custom-card-img-container"><img class="custom-card-img" src=${url_image} alt=${name} /></div>`
          : `<div class="custom-card-img-container"><img class="custom-card-img" src='../../assets/images/photo-coming-soon.jpg' alt='image-unavailable' /></div>`
      }
      <div class="custom-card-price-name">
        <div>
          <div class="custom-card-price-container">${
            discount
              ? `<p class="custom-card-discounted-price">${discounted_price_str}</p> <p class="custom-card-crossed-out-price">${price_str}</p>`
              : `<p class="custom-card-price">${price_str}</p>`
          }</div>
          <p class="custom-card-name">${name}</p>
        </div>
      </div>
    </div>
  </div>
  `;
}

const Products = {
  //returns the html. The innerHtml will read directly the html.
  toString() {
    return render();
  }
};

export default Products;
