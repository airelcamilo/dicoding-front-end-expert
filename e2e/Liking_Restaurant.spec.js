/* eslint-disable new-cap */
const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
    I.seeElement('#query');
    I.see('Restaurant Not Found', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
    I.see('Restaurant Not Found', '.restaurant-item__not__found');
    I.amOnPage('/');

    I.waitForElement('.post-item__title', 10);
    I.seeElement('.post-item__title a');
    const firstRestaurant = locate('.post-item__title a').first();
    const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.waitForElement('#likeButton', 10);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.seeElement('.post-item');

    const likedRestaurantName = await I.grabTextFrom('.post-item__title');
    assert.strictEqual(firstRestaurantName, likedRestaurantName);
});
