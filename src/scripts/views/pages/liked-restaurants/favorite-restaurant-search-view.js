/* eslint-disable require-jsdoc */
import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
    getTemplate() {
        return `
        <div class="content">
            <input id="query" type="text" tabindex="0" placeholder="Search ...">
            <h2 class="posts__title" tabindex="0">Your Favorite Restaurants</h2>
            <div id="posts" class="posts">
            </div>
        </div>
        `;
    }

    showFavoriteRestaurants(restaurants) {
        let html;
        if (restaurants.length) {
            html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
            document.getElementById('posts').innerHTML = html;
            document.getElementById('posts').dispatchEvent(new Event('restaurants:updated'));
        } else {
            html = this._getEmptyRestaurantTemplate();
            document.getElementsByClassName('content')[0].innerHTML = this.getTemplate() + html;
            document.getElementsByClassName('content')[0].dispatchEvent(new Event('restaurants:updated'));
        }
    }

    runWhenUserIsSearching(callback) {
        document.getElementById('query').addEventListener('change', (event) => {
            callback(event.target.value);
        });
    }

    _getEmptyRestaurantTemplate() {
        return '<div class="restaurant-item__not__found">Restaurant Not Found</div>';
    }
}

export default FavoriteRestaurantSearchView;
