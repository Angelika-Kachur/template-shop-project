"use strict";

let templateProducts = '<% \
    productsToRender.forEach(function(product) { %> \
    <div class="product"> \
        <a href="item.html?id=<%-product.id%>" class="link"> \
        <div class="image"> \
            <img src="<%-product.thumbnail%>" alt="Image"> \
        </div> \
        <div class="text"> \
            <div class="title"><%-product.title%></div> \
            <div class="info"> \
            <% if(product.hasNew == true) { %> \
                <span class="new">new</span> \
            <% } %> \
            <% if(product.discountedPrice < product.price) { %> \
                <span class="discount"> \
                <span>£<%-product.price%></span> \
                <span>  \
                    -<%-  \
                        100 -(product.discountedPrice / product.price * 100)  \
                    %>% \
                </span> \
                </span> \
            <% } %> \
            <% if(product.discountedPrice != null) { %> \
                <span class="price"><span>£</span><%-product.discountedPrice%></span> \
            <% } %> \
            </div> \
        </div> \
        </a> \
    </div> \
    <% }) %>';


    let templateBagProducts = '<% \
    cartDataArray.forEach(function(product) { %> \
    <div class="item" id="item_<%-product.id%>"> \
        <a href="item.html?id=<%-product.id%>" class="image"> \
            <img src="<%-product.thumbnail%>" alt="Image"> \
        </a> \
        <div class="text"> \
            <div class="title"><%-product.title%></div> \
            <div class="price">£<%-product.discountedPrice%></div> \
            <ul class="info"> \
            <li> \
                <span class="title">Color:</span> \
                <span class="value"><%-product.colorCheck%></span> \
            </li> \
            <li> \
                <span class="title">Size:</span> \
                <span class="value"><%-product.sizeCheck%></span> \
            </li> \
            <li> \
                <span class="title">Quantity:</span> \
                <span class="value"> \
                <button class="minus icon-minus"></button> \
                <span class="quantity"><%-product.count%></span> \
                <button class="plus icon-plus"></button> \
                </span> \
            </li> \
            </ul> \
            <div class="remove"> \
            <a href="#" class="remove_item">Remove item</a> \
            </div> \
        </div> \
        </div> \
    <% }) %>';