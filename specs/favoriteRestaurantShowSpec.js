import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-show-presenter';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view';
import FavoriteRestaurant from '../src/scripts/data/favorite-restaurant';

describe('Showing all favorite restaurants', () => {
    let view;
    const renderTemplate = () => {
        view = new FavoriteRestaurantSearchView();
        document.body.innerHTML = view.getTemplate();
    };

    beforeEach(() => {
        renderTemplate();
    });

    describe('When no restaurants have been liked', () => {
        it('should render the information that no restaurants have been liked', () => {
            const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurant);
            const presenter = new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants });

            const restaurants = [];
            presenter._displayRestaurants(restaurants);

            expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
        });

        it('should ask for the favorite restaurants', () => {
            const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurant);
            new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants });
            expect(favoriteRestaurants.getAllRestaurant).toHaveBeenCalledTimes(1);
        });

        it('should show the information that no restaurants have been liked', (done) => {
            document.getElementsByClassName('content')[0].addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
                done();
            });

            const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurant);
            favoriteRestaurants.getAllRestaurant.and.returnValues([]);

            new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants });
        });
    });

    describe('When favorite restaurants exist', () => {
        it('should render the restaurants', () => {
            const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurant);
            const presenter = new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants });

            presenter._displayRestaurants([
                {
                    id: 11,
                    name: 'A',
                    city: 'Kota A',
                    rating: 4,
                    description: 'Sebuah restaurant A',
                },
                {
                    id: 22,
                    name: 'B',
                    city: 'Kota B',
                    rating: 3,
                    description: 'Sebuah restaurant B',
                },
            ]);

            expect(document.querySelectorAll('.post-item').length).toEqual(2);
        });

        it('should show the restaurants', (done) => {
            document.getElementById('posts').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.post-item').length).toEqual(2);
                done();
            });
            const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurant, false);
            favoriteRestaurants.getAllRestaurant.and.returnValues([
                {
                    id: 11,
                    name: 'A',
                    city: 'Kota A',
                    rating: 4,
                    description: 'Sebuah restaurant A',
                },
                {
                    id: 22,
                    name: 'B',
                    city: 'Kota B',
                    rating: 3,
                    description: 'Sebuah restaurant B',
                },
            ]);
            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurants,
            });
        });
    });
});
