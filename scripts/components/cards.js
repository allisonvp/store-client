function render({ id, name, url_image, price, discount, category }) {
  let discounted_price = null;
  if (discount) {
    discounted_price = price * (1 - discount / 100);
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
              ? `<p class="card-discounted-price">${discounted_price} $</p> <p class="card-crossed-out-price">${price} $</p>`
              : `<p class="card-price">${price} $</p>`
          }</div>
          <p class="card-name">${name}</p>
        </div>
      </div>
    </div>
  </div>
  `;
}

const Card = {
  render
};

export default Card;
