/* eslint-disable new-cap */
Feature('Review Restaurants');

Before(({ I }) => {
    I.amOnPage('/');
});

Scenario('review one restaurant', async ({ I }) => {
    I.waitForElement('.post-item__title', 10);
    I.seeElement('.post-item__title a');
    I.click(locate('.post-item__title a').first());

    const name = 'John';
    const review = 'Makanan enak';
    I.waitForElement('#name', 10);
    I.fillField('#name', name);
    I.fillField('#review', review);
    I.click('Submit');

    I.see(name, '.review__name');
    I.see(review, 'p');
});
