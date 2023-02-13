/* eslint-disable new-cap */
const assert = require('assert');

Feature('Unliking Restaurants');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('unliking one restaurant', async ({ I }) => {
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
    I.amOnPage('/');

    I.waitForElement('.post-item__title', 10);
    I.seeElement('.post-item__title a');
    I.click(locate('.post-item__title a').first());

    I.waitForElement('#likeButton', 10);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.see('Restaurant Not Found', '.restaurant-item__not__found');
});
