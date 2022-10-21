import STORE from '../store.js';

function render() {
  const products = STORE.products;
  return `
    <div class="custom-main-cards-container">
      ${products.map(renderProduct).join('')}
    </div>
  `;
}

function renderProduct({ id, name, url_image, price, discount, category }) {
  let discounted_price = null;
  let discounted_price_str = null;
  let price_str = price.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP'
  });
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
  toString() {
    return render();
  },
  addListeners() {}
};

export default Products;
