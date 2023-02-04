import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate, createCategoryItemTemplate, createMenuItemTemplate, createReviewItemTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';


const Detail = {
    async render() {
        return `
        <div id="restaurant__detail" class="restaurant__detail"></div>
        <div id="likeButtonContainer"></div>
        `;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const restaurant = await RestaurantSource.detailRestaurant(url.id);
        const restaurantContainer = document.querySelector('#restaurant__detail');
        restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

        const categoriesContainer = document.querySelector('#restaurant__categories');
        restaurant.categories.forEach((category) => {
            categoriesContainer.innerHTML += createCategoryItemTemplate(category);
        });

        const foodsContainer = document.querySelector('#restaurant__foods');
        restaurant.menus.foods.forEach((food) => {
            foodsContainer.innerHTML += createMenuItemTemplate(food);
        });

        const drinksContainer = document.querySelector('#restaurant__drinks');
        restaurant.menus.drinks.forEach((drink) => {
            drinksContainer.innerHTML += createMenuItemTemplate(drink);
        });

        const reviewsContainer = document.querySelector('#reviews');
        restaurant.customerReviews.forEach((review) => {
            reviewsContainer.innerHTML += createReviewItemTemplate(review);
        });

        document.querySelector('form').addEventListener('submit', async () => {
            const data = {
                id: url.id,
                name: document.querySelector('#name').value,
                review: document.querySelector('#review').value,
            };
            const reviews = await RestaurantSource.addReview(data);

            reviewsContainer.innerHTML = '';
            reviews.customerReviews.forEach((review) => {
                reviewsContainer.innerHTML += createReviewItemTemplate(review);
            });

            document.querySelector('#name').value = '';
            document.querySelector('#review').value = '';
        });

        LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            restaurant: restaurant,
        });
    },
};

export default Detail;
