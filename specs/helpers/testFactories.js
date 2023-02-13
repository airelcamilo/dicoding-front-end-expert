import FavoriteRestaurant from '../../src/scripts/data/favorite-restaurant';
import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
    await LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurants: FavoriteRestaurant,
        restaurant,
    });
};

export { createLikeButtonPresenterWithRestaurant };
