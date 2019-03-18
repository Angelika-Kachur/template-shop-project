"use strict";

//Render Current Product Details Page
(function(){
    let currentProduct = getProduct(getProductId());
    let productSliderContent = document.querySelector('#productSliderTemplate').textContent;
    let compiledProductSlider = _.template(productSliderContent, {currentProduct: currentProduct});
    document.querySelector('#product_details').innerHTML = compiledProductSlider;
})(); 
