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
  <div class="card-container">
    ${discount ? `<div class="card-discount">-${discount}%</div>` : ''}
    <div class="card-data">
      ${
        url_image
          ? `<div class="card-img-container"><img class="card-img" src=${url_image} alt=${name} /></div>`
          : `<div class="card-img-container"><img class="card-img" src='../../assets/images/photo-coming-soon.jpg' alt='image-unavailable' /></div>`
      }
      <div class="card-price-name">
        <div>
          <div class="card-price-container">${
            discount
              ? `<p class="card-discounted-price">${discounted_price_str}</p> <p class="card-crossed-out-price">${price_str}</p>`
              : `<p class="card-price">${price_str}</p>`
          }</div>
          <p class="card-name">${name}</p>
        </div>
      </div>
    </div>
  </div>
  `;
}

export default renderProduct;
