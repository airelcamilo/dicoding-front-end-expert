import FavoriteRestaurant from '../../data/favorite-restaurant';
// import { createRestaurantItemTemplate } from '../templates/template-creator';
import FavoriteRestaurantSearchView from './liked-restaurants/favorite-restaurant-search-view';
import FavoriteRestaurantSearchPresenter from './liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantShowPresenter from './liked-restaurants/favorite-restaurant-show-presenter';

const view = new FavoriteRestaurantSearchView();

const Like = {
    async render() {
        return view.getTemplate();
    },

    async afterRender() {
        new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurant });
        new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurant });
        // const restaurants = await FavoriteRestaurant.getAllRestaurant();
        // const restaurantsContainer = document.querySelector('#posts');
        // restaurants.forEach((restaurant) => {
        //     restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        // });
    },
};

export default Like;
