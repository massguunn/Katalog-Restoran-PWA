/* eslint-disable no-shadow */
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItem } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <div class="latest">
        <h2 class="latesthead">Cari Restoran</h2>
    </div>
    <div id="content" class="content"></div>
`;
  },

  async afterRender() {
    // fungsi ini akan di panggil setelah render()
    const restaurant = await RestaurantSource.ListRestaurants();
    const restaurantsContainer = document.querySelector('#content');
    restaurant.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItem(restaurant);
    });
  },
};

export default Home;
