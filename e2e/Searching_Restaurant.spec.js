/* eslint-disable new-cap */
const assert = require('assert');

Feature('Searching Restaurants');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('searching restaurants', async ({ I }) => {
    I.see('Restaurant Not Found', '.restaurant-item__not__found');
    I.amOnPage('/');

    const names = [];
    for (let i = 1; i <= 3; i++) {
        I.waitForElement('.post-item__title a', 10);
        I.click(locate('.post-item__title a').at(i));
        I.waitForElement('#likeButton', 10);
        I.seeElement('#likeButton');
        I.click('#likeButton');
        names.push(await I.grabTextFrom('#restaurant__title'));
        I.amOnPage('/');
    }

    I.amOnPage('/#/favorite');
    I.seeElement('#query');

    const searchQuery = names[1].substring(1, 3);
    const matchingRestaurants = names.filter((name) => name.indexOf(searchQuery) !== -1);

    I.fillField('#query', searchQuery);
    I.pressKey('Enter');

    const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.post-item');
    assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants);

    matchingRestaurants.forEach(async (name, index) => {
        const visibleName = await I.grabTextFrom(locate('.post-item__title').at(index + 1));
        assert.strictEqual(name, visibleName);
    });
});
