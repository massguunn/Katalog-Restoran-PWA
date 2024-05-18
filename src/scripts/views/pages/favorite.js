import FavoriteRestoranIdb from '../../data/favorite-restoran-idb';
import { createRestaurantItem } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
    <div class="latest">
        <h2 class="latesthead">Restoran Yang Disukai</h2>
    </div>
    <div id="content" class="content"></div>
    `;
  },

  async afterRender() {
    const resto = await FavoriteRestoranIdb.getAllRestaurant();
    const restaurantContainer = document.querySelector('#content');

    resto.forEach((restos) => {
      restaurantContainer.innerHTML += createRestaurantItem(restos);
    });
  },
};

export default Favorite;
