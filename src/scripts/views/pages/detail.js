/* eslint-disable no-alert */
/* eslint-disable no-undef */
import { createRestaurantDetail } from '../templates/template-creator';
import RestaurantSource from '../../data/restaurant-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import CONFIG from '../../globals/config';

const Detail = {
  async render() {
    return `
      <div id="contentdetail" class="contentdetail"></div>
      <div id="likeButtonContainer"></div>
      <div id="reviewFormContainer">
        <h2 class="title-review">Tambahkan Review Anda</h2>
        <form id="reviewForm">
          <label for="reviewName">Nama Anda:</label>
          <input type="text" id="reviewName" name="reviewName" required><br><br>
          <label for="reviewText">Masukan Review Anda:</label><br>
          <textarea id="reviewText" name="reviewText" rows="4" required></textarea><br><br>
          <button id="title-button" type="submit">Kirim Ulasan</button>
        </form>
      </div>
   
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const detail = await RestaurantSource.detailRestaurant(url.id);
    const restaurantItem = document.querySelector('#contentdetail');
    restaurantItem.innerHTML = createRestaurantDetail(detail.restaurant);

    const likeButtonContainer = document.querySelector('#likeButtonContainer');
    LikeButtonInitiator.init({
      likeButtonContainer,
      restaurant: {
        id: detail.restaurant.id,
        name: detail.restaurant.name,
        description: detail.restaurant.description,
        backdrop_path: CONFIG.BASE_IMAGE_URL,
        pictureId: detail.restaurant.pictureId,
        rating: detail.restaurant.rating,
        city: detail.restaurant.city,
      },
    });

    const reviewForm = document.getElementById('reviewForm');

    const updateCustomerReviews = (reviews) => {
      const customerReviewsContainer = document.querySelector('.customerReviews');
      customerReviewsContainer.innerHTML = reviews.map((review) => `
        <div class="customerReview">
          <p class="custReview">"${review.review}"</p>
          <p class="custName">${review.name},</p>
          <p class="custDate">${review.date}</p>
        </div>`).join('');
    };

    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const reviewName = document.getElementById('reviewName').value;
      const reviewText = document.getElementById('reviewText').value;

      const response = await fetch('https://restaurant-api.dicoding.dev/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: detail.restaurant.id, name: reviewName, review: reviewText }),
      });

      if (response.ok) {
        const newReview = { name: reviewName, review: reviewText, date: new Date().toLocaleDateString('en-US') };
        detail.restaurant.customerReviews.push(newReview);
        updateCustomerReviews(detail.restaurant.customerReviews);
        reviewForm.reset();
      } else {
        alert('Failed to add review. Please try again.');
      }
    });

    const updateReviews = async () => {
      const response = await fetch(`https://restaurant-api.dicoding.dev/review?id=${detail.restaurant.id}`);
      if (response.ok) {
        const reviewResponse = await response.json();
        detail.restaurant.customerReviews = reviewResponse.customerReviews;
        updateCustomerReviews(detail.restaurant.customerReviews);
      }
    };

    await updateReviews();
  },
};

export default Detail;
