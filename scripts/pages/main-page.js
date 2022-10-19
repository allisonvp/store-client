import Card from '../components/cards.js';
import STORE from '../store.js';

function render() {
  const products = STORE.products;
  return `
    <div class="main-container">
      <div class="cards-container">
        ${products.map(Card.render).join('')}
      </div>
    </div>
  `;
}

const MainPage = {
  toString() {
    return render();
  },
  addListeners() {}
};

export default MainPage;
