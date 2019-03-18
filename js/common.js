"use strict";

/* Search Animation */
(function () {
    let searchOpenBtn = document.getElementsByClassName("search_open_btn")[0];
    let searchInput = document.getElementsByClassName("search_input_hold")[0];
    let searchBtn = document.getElementsByClassName("search_btn")[0];

    searchOpenBtn.addEventListener("click", function openFunc() {
        searchOpenBtn.classList.toggle("hide");
        searchInput.classList.toggle("show");
    });

    searchBtn.addEventListener("click", function openFunc() {
        searchOpenBtn.classList.toggle("hide");
        searchInput.classList.toggle("show");
    });
})();

/* Burger Menu */
(function () {
    let burgerMenu = document.getElementsByClassName("burger_menu_btn")[0];
    let headerBottom = document.getElementsByClassName("header_bottom")[0];
    let body = document.getElementsByTagName("body")[0];

    burgerMenu.addEventListener("click", function openFunc() {
        burgerMenu.classList.toggle("change");
        headerBottom.classList.toggle("active");
       
        if(!body.classList.contains("filter_open_menu")) {
            body.classList.toggle("open_menu");
        }
    });
})();

/* Get Product Id */
function getProductId() {
    let url = new URL(window.location.href);
    return url.searchParams.get("id");
}

/* Get Product */
function getProduct(id) {
    return _.find(products, function(p) { return p.id==id});
}

/* NodeList/forEach Polyfill */
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

/* Find Polyfill */
if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
        if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
            return value;
        }
        }
        return undefined;
    };
}
