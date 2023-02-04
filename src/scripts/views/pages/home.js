import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
    async render() {
        return `
        <div class="hero">
            <div class="hero__inner">
            <h1 class="hero__title" tabindex="0">Bingung cari restoran saat liburan?</h1>
            <p class="hero__tagline" tabindex="0"><strong>Pake Foodies aja!</strong> Foodies adalah aplikasi untuk mencari restoran dengan mudah.</p>
            <p class="hero__tagline" tabindex="0">Ada promo bagi kamu! <strong>Cashback 50%</strong> khusus untuk pendaftar baru.</p>
            </div>
        </div>

        <h2 class="posts__title" tabindex="0">Explore Restaurants</h2>
        <div id="posts" class="posts">
        </div>
        `;
    },

    async afterRender() {
        const restaurants = await RestaurantSource.listRestaurant();
        const restaurantsContainer = document.querySelector('#posts');
        restaurants.forEach((restaurant) => {
            restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });
    },
};

export default Home;
