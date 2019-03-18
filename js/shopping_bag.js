"use strict";

//Variables
let storage = localStorage;
let currentProduct = getProduct(getProductId());
let cartData = {};
let cartDataArray = [];

//Get Total Price
function getTotalPrice() {
    let totalPrice = 0;
    if(storage.getItem("productsOrder")) {
        let items = storage.getItem("productsOrder");
        items = JSON.parse(items);
        cartDataArray = items.products;
        let localPrice = 0;
        cartDataArray.forEach(function(product) {
            localPrice = product.count * parseInt(product.discountedPrice);
            totalPrice += localPrice;
        })
    }
    let parent = document.querySelector('.header_shopping_bag .price');
    let child = document.querySelector('.header_shopping_bag .price .value');
    child.innerHTML = totalPrice.toFixed(2);
    parent.appendChild(child);
    parent.classList.add("show");

    if(document.querySelector('.purchase_control') != null) {
        let parentBag = document.querySelector('.purchase_control .price');
        let childBag = document.querySelector('.purchase_control .price .value');
        childBag.innerHTML = totalPrice.toFixed(2);
        parentBag.appendChild(childBag);
    }
}
getTotalPrice();

//Get Total Count
function getTotalCount() {
    let totalCount = 0;
    if(storage.getItem("productsOrder")) {
        cartDataArray.forEach(function(product) {
            totalCount += parseInt(product.count);
        })
    }
    let parent = document.querySelector('.header_shopping_bag .count');
    let child = document.querySelector('.header_shopping_bag .count .value');
    child.innerHTML = totalCount;
    parent.appendChild(child);
}
getTotalCount();

//Default Checked Firts Size and Color
if(document.body.contains(document.querySelector("#product_details"))) {
    document.querySelector(".size_box").querySelectorAll("input[type=radio]")[0].checked = true;
    document.querySelector(".color_box").querySelectorAll("input[type=radio]")[0].checked = true;
};

//Add To Bag Click
let defaultCount = 1;
if(document.body.contains(document.querySelector("#add_to_bag_btn"))) {
    let addTOBagBtn = document.querySelector('#add_to_bag_btn');
    addTOBagBtn.addEventListener("click", function() {

        currentProduct = getProduct(getProductId());
        currentProduct.count = defaultCount;

        let allSize = document.querySelector(".size_box").querySelectorAll("input[type=radio]");
        let allColor = document.querySelector(".color_box").querySelectorAll("input[type=radio]");

        currentProduct.colorCheck = allSize[0].getAttribute("id");
        currentProduct.sizeCheck = allColor[0].getAttribute("id");
        
        function checkColorFunc(element) {
            if(element.checked) {
                currentProduct.colorCheck = element.getAttribute("id");
            }
        }

        function checkSizeFunc(element) {
            if(element.checked) {
                currentProduct.sizeCheck = element.getAttribute("id");
            }
        }  

        allSize.forEach(checkSizeFunc);
        allColor.forEach(checkColorFunc);

        function findElem(elem) {
            return elem.id == currentProduct.id;
        }

        let findProduct = cartDataArray.find(findElem);

        if(typeof findProduct != "undefined" && currentProduct.id == findProduct.id && currentProduct.sizeCheck == findProduct.sizeCheck && currentProduct.colorCheck == findProduct.colorCheck) {
            findProduct.count = defaultCount;
            defaultCount += 1;
            currentProduct.count = defaultCount;

            cartData = storage.getItem("productsOrder");
            cartData = cartData.replace(JSON.stringify(findProduct), JSON.stringify(currentProduct));
            storage.setItem("productsOrder", cartData);
        } else {
            currentProduct.count = 1;
            if(!storage.getItem("productsOrder")){
                cartData["products"] = [];
                cartData["products"].push(currentProduct);
            } else {        
                cartData = JSON.parse(storage.getItem("productsOrder"));
                cartData["products"].push(currentProduct);
            }
            storage.setItem("productsOrder", JSON.stringify(cartData));
            cartDataArray.push(storage.getItem("productsOrder"));
        }

        getTotalPrice();
        getTotalCount();
    });
};

//Remove All Products From Cart
if(document.body.contains(document.querySelector("#remove_all"))) {
    let removeAllBtn = document.querySelector('#remove_all');
    removeAllBtn.addEventListener("click", function(e) {
        e.preventDefault();

        //get products from local storage
        let cartDataFromLocalStorage = JSON.parse(storage.getItem("productsOrder"));
        cartDataArray = cartDataFromLocalStorage.products;
        cartDataArray.push(cartDataFromLocalStorage);

        //remove html products
        let compiledBagProducts = _.template("", {products: products});
        document.querySelector('#bag_items_box').innerHTML = compiledBagProducts;
    
        //remove localStorage products
        storage.removeItem("productsOrder");

        //change price and count
        getTotalPrice();
        getTotalCount();

        //message after remove
        let textBox = document.createElement("div");
        textBox.classList.add("message_text");
        textBox.innerHTML = "Your shopping bag is empty. Use Catalog to add new items.";
        document.querySelector("#bag_items_box").appendChild(textBox);
    })
}

//Message Text in Bag
if(document.body.contains(document.querySelector("#buy_now"))) {
    document.querySelector("#buy_now").addEventListener("click", function() {
        //get products from local storage
        let cartDataFromLocalStorage = JSON.parse(storage.getItem("productsOrder"));
        cartDataArray = cartDataFromLocalStorage.products;
        cartDataArray.push(cartDataFromLocalStorage);

        //remove html products
        let compiledBagProducts = _.template("", {products: products});
        document.querySelector('#bag_items_box').innerHTML = compiledBagProducts;

        //remove localStorage products
        storage.removeItem("productsOrder");

        //change price and count
        getTotalPrice();
        getTotalCount();

        //message after remove
        let textBox = document.createElement("div");
        textBox.innerHTML = "Thank you for your purchase!";
        textBox.classList.add("message_text");
        document.querySelector("#bag_items_box").appendChild(textBox);
    })
};



function setAmountProduct(sign) {
    let product = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    let productId = product.getAttribute("id").replace("item_", "");

    cartData = storage.getItem("productsOrder");

    function findElem(elem) {
        return elem.id == productId;
    }

    let findProduct = cartDataArray.find(findElem);
    let newProduct = Object.assign({}, findProduct);
    newProduct.count = newProduct.count + sign;
    if(newProduct.count < 0) {
        newProduct.count = 0;
    }
    cartData = cartData.replace(JSON.stringify(findProduct), JSON.stringify(newProduct));
    return(cartData);
}

//Plus One Product in Cart
if(document.body.contains(document.querySelector(".bag_items"))) {
    let bagItemsBox = document.querySelector('.bag_items');
    bagItemsBox.addEventListener("click", function(event) {
        event.preventDefault();

        if(event.target.classList.contains("plus")) {
            
            cartData = setAmountProduct(+1);
            storage.setItem("productsOrder", cartData);
          
            //change price and count
            getTotalPrice();
            getTotalCount();

            let compiledBagProducts = _.template(templateBagProducts, {products: products});
            document.querySelector('#bag_items_box').innerHTML = compiledBagProducts;
        }
    });
}

//Minus One Product in Cart
if(document.body.contains(document.querySelector(".bag_items"))) {
    let bagItemsBox = document.querySelector('.bag_items');
    bagItemsBox.addEventListener("click", function(event) {
        event.preventDefault();

        if(event.target.classList.contains("minus")) {

            cartData = setAmountProduct(-1);
            storage.setItem("productsOrder", cartData);
            
            //change price and count
            getTotalPrice();
            getTotalCount();

            let compiledBagProducts = _.template(templateBagProducts, {products: products});
            document.querySelector('#bag_items_box').innerHTML = compiledBagProducts;
        }
    });
}


// Remove One Product From Cart
if(document.body.contains(document.querySelector(".bag_items"))) {
    let bagItemsBox = document.querySelector('.bag_items');
    bagItemsBox.addEventListener("click", function(event) {
        // event.preventDefault();

        if(event.target.classList.contains("remove_item")) {
            let product = event.target.parentElement.parentElement.parentElement;
            let productId = product.getAttribute("id").replace("item_", "");

            cartData = storage.getItem("productsOrder");

            function findElem(elem) {
                return elem.id == productId;
            }
    
            let findProduct = cartDataArray.find(findElem);
    
            cartData = storage.getItem("productsOrder");
            if(cartData.length > 1) {
                cartData = cartData.replace(JSON.stringify(findProduct)+",", "");
            } else {
                cartData = cartData.replace(JSON.stringify(findProduct), "");
            }
            storage.setItem("productsOrder", cartData);

            let productsBagTemplate = templateBagProducts;
            let compiledBagProducts = _.template(productsBagTemplate, {products: products});
            document.querySelector('#bag_items_box').innerHTML = compiledBagProducts;
        }
    });
}

//Render Products on Shopping Bag Page
if(document.body.contains(document.querySelector("#bag_items_box"))) {
    if(storage.getItem("productsOrder")) {
        let productsBagTemplate = templateBagProducts;
        let compiledBagProducts = _.template(productsBagTemplate, {products: products});
        document.querySelector('#bag_items_box').innerHTML = compiledBagProducts;
    }
};