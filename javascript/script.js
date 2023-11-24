// Navigation Elements
const primaryNavigationEl = document.querySelector(".nav");
const hamburgerIconEl = document.querySelector(".hamburger-icon");
const navCloseIconEl = document.querySelector(".nav__close-icon");

// CART
const cartIconEl = document.querySelector(".cart__icon");
const cartBoxEl = document.querySelector(".cart-box");
const cartBoxContentEl = document.querySelector(".cart-box__content");
const cartCountEl = document.querySelector(".cart__count");

// HERO
const heroImageEl = document.querySelector(".product-container__hero-img");

// THUMBNAILS
const thumbnailContainerEl = document.querySelector(".thumbnail-container");
const thumbnailImgs = document.querySelectorAll(".thumbnail__img");

// QUANTITY SELECTOR
const quantitySelectorEl = document.querySelector(".quantity-selector");
const quantitySelectorCountEl = document.querySelector(
	".quantity-selector__count"
);

// ADD TO CART
const btnAddToCartEl = document.querySelector(".btn--add-to-cart");

const btnPrevEl = document.querySelector(".btn--prev");
const btnNextEl = document.querySelector(".btn--next");

// DATA & VARIABLES
const PRODUCT_PRICE = 125;
const PRODUCT_NAME = "Fall Limited Edition Sneakers";
const THUMBNAIL_BASE_SRC = "images/image-product-1-thumbnail.jpg";

// Constants
const HERO_IMAGES = [
	"images/image-product-1.jpg",
	"images/image-product-2.jpg",
	"images/image-product-3.jpg",
	"images/image-product-4.jpg",
];

// Current state
let currentImageIndex = 1;
let currentQuantity = 0;

function getEmptyCartMessage() {
	return '<h4 class="cart-box__empty-message">Your cart is empty.</h4>';
}

function renderCartItem(
	productName = "Fall Limited Edition Sneakers",
	thumbnailSrc = "images/image-product-1-thumbnail.jpg",
	unitPrice = PRODUCT_PRICE,
	quantity = currentQuantity
) {
	return `
      <div class="cart-item cart-item--hide padding-1-5em">
        <div class="d-flex items-center gap-1 mb-1-5em">
          <img src="${thumbnailSrc}" alt="Product Thumbnail" class="cart-item__img" />
          <div class="cart-item__content">
            <h2 class="cart-item__header mb-5">${productName}</h2>
            <p class="cart-item__price">
              <span class="cart-item__unit-price">&dollar;${unitPrice.toFixed(
					2
				)}</span>
              &times;
              <span class="quantity">${quantity}</span>
              <span class="cart-item__final-price"><strong>&dollar;${(
					unitPrice * quantity
				).toFixed(2)}</strong></span>
            </p>
          </div>
          <button class="btn btn--delete cursor-pointer">
            <img src="./images/icon-delete.svg" alt="Delete Icon" class="delete-icon" />
          </button>
        </div>
        <button class="btn btn--primary btn--lg">Checkout</button>
      </div>
    `;
}

function showEmptyCartMessage(currentQuantity) {
	if (currentQuantity === 0) {
		cartCountEl.classList.add("cart__count--hide");
		cartBoxContentEl.innerHTML = "";
		cartBoxContentEl.insertAdjacentHTML(
			"afterbegin",
			getEmptyCartMessage()
		);
	}
}
showEmptyCartMessage(currentQuantity);

function showCartItem(
	productName = "Fall Limited Edition Sneakers",
	thumbnailSrc = "images/image-product-1-thumbnail.jpg",
	unitPrice = PRODUCT_PRICE,
	quantity = currentQuantity
) {
	cartBoxContentEl.innerHTML = "";
	cartBoxContentEl.insertAdjacentHTML(
		"afterbegin",
		renderCartItem(productName, thumbnailSrc, unitPrice, quantity)
	);
}

showEmptyCartMessage(currentQuantity);

// ********************************************** //
function addZIndexClass(element) {
	element.classList.add("z-index-2");
}

function removeZIndexClass(element) {
	element.classList.remove("z-index-2");
}

const toggleNavActive = () => {
	const isNavActive = primaryNavigationEl.classList.contains("nav--active");

	if (isNavActive) {
		primaryNavigationEl.classList.remove("nav--active");
		removeZIndexClass(btnNextEl);
		removeZIndexClass(btnPrevEl);
	} else {
		primaryNavigationEl.classList.add("nav--active");
		addZIndexClass(btnNextEl);
		addZIndexClass(btnPrevEl);
	}
};

function toggleCartBox() {
	cartBoxEl.classList.toggle("cart-box--hide");
}

function updateImage(direction) {
	if (direction === "prev")
		currentImageIndex =
			currentImageIndex === 0
				? HERO_IMAGES.length - 1
				: currentImageIndex - 1;
	else
		currentImageIndex =
			currentImageIndex === HERO_IMAGES.length - 1
				? 0
				: currentImageIndex + 1;

	heroImageEl.src = HERO_IMAGES[currentImageIndex];
}

function handleThumbnailContainerClick(e) {
	const clickedThumbnailImg = e.target.classList.contains("thumbnail__img");

	if (!clickedThumbnailImg) return;

	const thumbnailImg = e.target;
	handleThumbnailClick(thumbnailImg);
}

function handleThumbnailClick(thumbnailImg) {
	const { src } = thumbnailImg.dataset;

	thumbnailImgs.forEach((img) =>
		img.classList.remove("thumbnail__img--active")
	);

	heroImageEl.src = src;

	thumbnailImg.classList.add("thumbnail__img--active");
}

function handleQuantityButtonClick(e) {
	const isAddBtnEl = e.target.classList.contains(
		"quantity-selector__btn--add"
	);
	const isMinusBtnEl = e.target.classList.contains(
		"quantity-selector__btn--minus"
	);

	if (isAddBtnEl) {
		currentQuantity =
			currentQuantity === 10 ? currentQuantity : currentQuantity + 1;
	}

	if (currentQuantity < 1) {
		return showEmptyCartMessage(currentQuantity);
	}

	if (isMinusBtnEl) {
		currentQuantity =
			currentQuantity === 0 ? currentQuantity : currentQuantity - 1;
	}

	showCartItem(
		PRODUCT_NAME,
		THUMBNAIL_BASE_SRC,
		PRODUCT_PRICE,
		currentQuantity
	);
	cartCountEl.classList.remove("cart__count--hide");
	cartCountEl.textContent = currentQuantity;
	quantitySelectorCountEl.textContent = currentQuantity;
	document.querySelector(".cart-item").classList.remove("cart-item--hide");
}

// EVENT LISTENERS
// Navigation
hamburgerIconEl.addEventListener("click", toggleNavActive);
navCloseIconEl.addEventListener("click", toggleNavActive);

// CART
cartIconEl.addEventListener("click", toggleCartBox);

// HERO
btnPrevEl.addEventListener("click", (e) => {
	updateImage("prev");
});

btnNextEl.addEventListener("click", (e) => {
	updateImage("next");
});

// THUMBNAILS
thumbnailContainerEl.addEventListener("click", handleThumbnailContainerClick);

// QUANTITY SELECTOR
quantitySelectorEl.addEventListener("click", handleQuantityButtonClick);

// ADD TO CART
btnAddToCartEl.addEventListener("click", (e) => {
	if (currentQuantity === 0) alert("add an item...");

	showCartItem();
	currentQuantity > 0 && cartCountEl.classList.remove("cart__count--hide");
	currentQuantity > 0 && (cartCountEl.textContent = currentQuantity);
	currentQuantity > 0 &&
		document
			.querySelector(".cart-item")
			.classList.remove("cart-item--hide");
});

quantitySelectorCountEl.textContent = currentQuantity;