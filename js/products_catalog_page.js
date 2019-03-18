"use strict";

(function(){
    /* Variables */
    let limitProductsCatalog = 12; 
    let productsToRender = getProductsToRender(products, filtersMap, limitProductsCatalog);
    let compiledCatalogProducts = _.template(templateProducts, {productsToRender: productsToRender});
    document.querySelector('#catalog_products_all').innerHTML = compiledCatalogProducts;

    /* Get Products to Render */
    function getProductsToRender(products, filtersMap, limitProductsCatalog) {
        return _.filter(products.slice(0,limitProductsCatalog), 
        function(p) { 
            if(typeof filtersMap.fashion == "undefined" || filtersMap.fashion == 'Not selected') return true;
            else return p.fashion == filtersMap.fashion;
        });
    };

    /* Click Filter Options */
    filterMenu.addEventListener("click", function(event) {
        event.preventDefault();
        if(event.target.tagName == "LI") {
            productsToRender = getProductsToRender(products, filtersMap, limitProductsCatalog);
            compiledCatalogProducts = _.template(templateProducts, {productsToRender: productsToRender});
            document.querySelector('#catalog_products_all').innerHTML = compiledCatalogProducts;
        }
        addCatalogPromoText();
    });

    /* Show More Products */
    let showMore = document.getElementById("show_more_products");
    showMore.addEventListener("click", function(event) {
        productsToRender = getProductsToRender(products, filtersMap, products.length);
        compiledCatalogProducts = _.template(templateProducts, {productsToRender: productsToRender});
        document.querySelector('#catalog_products_all').innerHTML = compiledCatalogProducts;
        addCatalogPromoText();
        showMore.classList.toggle("hide");
    });
})(); 