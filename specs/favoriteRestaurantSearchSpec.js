import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurant from '../src/scripts/data/favorite-restaurant';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view';

describe('Searching restaurants', () => {
    let presenter;
    let favoriteRestaurants;
    let view;

    const searchRestaurants = (query) => {
        const queryElement = document.getElementById('query');
        queryElement.value = query;
        queryElement.dispatchEvent(new Event('change'));
    };

    const setRestaurantSearchContainer = () => {
        view = new FavoriteRestaurantSearchView();
        document.body.innerHTML = view.getTemplate();
    };

    const constructPresenter = () => {
        favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurant);
        presenter = new FavoriteRestaurantSearchPresenter({ favoriteRestaurants, view });
    };

    beforeEach(() => {
        setRestaurantSearchContainer();
        constructPresenter();
    });

    describe('When query is not empty', () => {
        it('should be able to capture the query typed by the user', () => {
            searchRestaurants('restaurant a');
            expect(presenter.latestQuery).toEqual('restaurant a');
        });

        it('should ask the model to search for liked restaurants', () => {
            searchRestaurants('restaurant a');
            expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('restaurant a');
        });

        it('should show the found restaurants', () => {
            presenter._showFoundRestaurants([{ id: 1 }]);
            expect(document.querySelectorAll('.post-item').length).toEqual(1);

            presenter._showFoundRestaurants([{ id: 1, name: 'Satu' }, { id: 2, name: 'Dua' }]);
            expect(document.querySelectorAll('.post-item').length).toEqual(2);
        });

        it('should show the name of the found restaurants', () => {
            presenter._showFoundRestaurants([{ id: 1, name: 'Satu' }]);
            expect(document.querySelectorAll('.post-item__title').item(0).textContent).toEqual('Satu');
        });

        it('should show - when the restaurant returned does not contain a name', (done) => {
            document.getElementById('posts').addEventListener('restaurants:updated', () => {
                const restaurantName = document.querySelectorAll('.post-item__title');
                expect(restaurantName.item(0).textContent).toEqual('-');
                done();
            });

            favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([{ id: 444 }]);

            searchRestaurants('restaurant a');
        });
    });

    describe('When query is empty', () => {
        it('should capture the query as empty', () => {
            searchRestaurants(' ');
            expect(presenter.latestQuery.length).toEqual(0);

            searchRestaurants('    ');
            expect(presenter.latestQuery.length).toEqual(0);

            searchRestaurants('');
            expect(presenter.latestQuery.length).toEqual(0);

            searchRestaurants('\t');
            expect(presenter.latestQuery.length).toEqual(0);
        });

        it('should show all favorite restaurants', () => {
            searchRestaurants('    ');
            expect(favoriteRestaurants.getAllRestaurant).toHaveBeenCalled();
        });
    });

    describe('When no favorite restaurants could be found', () => {
        it('should show the empty message', (done) => {
            document.getElementsByClassName('content')[0].addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
                done();
            });

            favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);

            searchRestaurants('restaurant a');
        });
    });
});
