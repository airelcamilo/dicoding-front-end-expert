/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
    static async listRestaurant() {
        const response = await fetch(API_ENDPOINT.LIST_RESTAURANT);
        const responseJson = await response.json();
        return responseJson.restaurants;
    }

    static async detailRestaurant(id) {
        const response = await fetch(API_ENDPOINT.DETAIL(id));
        const responseJson = await response.json();
        return responseJson.restaurant;
    }

    static async addReview(data) {
        const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseJson = await response.json();
        return responseJson;
    }
}

export default RestaurantSource;
