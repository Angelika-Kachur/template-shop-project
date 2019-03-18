"use strict";

/* Promo Text */
let catalogPromoTextElem = document.getElementById("catalog_promo_text");
let catalogPromoText = catalogPromoTextElem.cloneNode(true);

/* Add Catalog Promo Text */
function addCatalogPromoText() {
    let i = 4;
    let catalogProducts = document.querySelectorAll("#catalog_products_all .product");
    let calalogProductsElem = document.getElementById("catalog_products_all");
    if(window.innerWidth > 768 && window.innerWidth < 1024) {
        i = 3;
        calalogProductsElem.insertBefore(catalogPromoText, catalogProducts[i]);
    } else if(window.innerWidth < 768) {
        i = 2;
        calalogProductsElem.insertBefore(catalogPromoText, catalogProducts[i]);
    } else {
        i = 4;
        calalogProductsElem.insertBefore(catalogPromoText, catalogProducts[i]);
    }
}

/* Resize Event */
window.addEventListener('resize', function(event){
    addCatalogPromoText();
});

/* Loaded Event */
document.addEventListener('DOMContentLoaded', function(){
    addCatalogPromoText();
});