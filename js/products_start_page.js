"use strict";

//Render Products on Start Page
(function(){
    let productsToRender = products.slice(0, 4);
    let compiledCatalogProducts = _.template(templateProducts, {productsToRender: productsToRender});
    document.querySelector('#products_new_arrivals').innerHTML = compiledCatalogProducts;
})(); 