import CONFIG from '../../globals/config';


const createRestaurantDetailTemplate = (restaurant) => `
<img tabindex="0" id="restaurant__image" src="${CONFIG.MEDIUM_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
<div id="restaurant__info">
    <h2 tabindex="0" id="restaurant__title">${restaurant.name}</h2>
    <div id="restaurant__categories"></div>
    <h3 tabindex="0">Address</h3>
    <p tabindex="0">${restaurant.address}, ${restaurant.city}</p>
    <h3 tabindex="0">Rating</h3>
    <p tabindex="0">${restaurant.rating}</p>
    <h3 tabindex="0">Description</h3>
    <p tabindex="0">${restaurant.description} minutes</p>
    <div id="restaurant__menus">
        <div>
            <h3 tabindex="0">Foods Available</h3>
            <ul id="restaurant__foods"></ul>
        </div>
        <div>
            <h3 tabindex="0">Drinks Available</h3>
            <ul id="restaurant__drinks"></ul>
        </div>
    </div>
</div>

<div id="restaurant__add__review">
    <h2 id="add__review__name" tabindex="0">Add Review</h2>
    <form id="add__review" onsubmit="return false">
        <label for="Name" tabindex="0">Name</label>
        <input type="text" id="name" name="name" tabindex="0">
        <label for="Review" tabindex="0">Review</label>
        <textarea type="text" id="review" name="review" tabindex="0"></textarea>
        <input type="submit" value="Submit" tabindex="0">
    </form>
</div>
<div id="restaurant__reviews">
    <h2 tabindex="0">People's Reviews</h2>
    <div id="reviews"></div>
</div>
`;

const createCategoryItemTemplate = (category) => `
<p class="category" tabindex="0">${category.name}</p>
`;

const createMenuItemTemplate = (menu) => `
<li class="menu__name" tabindex="0">${menu.name}</li>
`;

const createReviewItemTemplate = (review) => `
<div class="review__item">
    <h4 class="review__name" tabindex="0">${review.name}</h4>
    <p class="review__date" tabindex="0">${review.date}</p>
    <p tabindex="0">${review.review}</p>
</div>
`;

const createRestaurantItemTemplate = (restaurant) => `
<article class="post-item" id="${restaurant.id}">
    <img class="post-item__thumbnail" tabindex="0" src="${CONFIG.SMALL_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
    <div class="post-item__content">
        <h3 class="post-item__title"  tabindex="0"><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h3>
        <p class="post-item__city"  tabindex="0">${restaurant.city}</p>
        <p class="post-item__rating"  tabindex="0">Rating: ${restaurant.rating}</p>
        <p class="post-item__description"  tabindex="0">${restaurant.description}</p>
    </div>
</article>
`;

const createLikeButtonTemplate = () => `
<button tabindex="0" aria-label="Masukkan ke favorite" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
</button>
`;

const createLikedButtonTemplate = () => `
<button tabindex="0" aria-label="Keluarkan dari favorite" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
</button>
`;

export {
    createRestaurantItemTemplate,
    createRestaurantDetailTemplate,
    createCategoryItemTemplate,
    createMenuItemTemplate,
    createReviewItemTemplate,
    createLikeButtonTemplate,
    createLikedButtonTemplate,
};
