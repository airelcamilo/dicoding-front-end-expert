import FavoriteRestaurant from '../../data/favorite-restaurant';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Like = {
    async render() {
        return `
        <h2 class="posts__title" tabindex="0">Your Favorite Restaurants</h2>
        <div id="posts" class="posts">
        </div>
    `;
    },

    async afterRender() {
        const restaurants = await FavoriteRestaurant.getAllRestaurant();
        const restaurantsContainer = document.querySelector('#posts');
        restaurants.forEach((restaurant) => {
            restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });
    },
};

export default Like;
