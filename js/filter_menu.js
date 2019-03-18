"use strict";

/* Filter Menu Tablet */
(function () {
    let filterMenuLabels = document.getElementsByClassName("filter_menu_labels")[0];
    let filterMenu = document.getElementsByClassName("filter_menu")[0];
    let body = document.getElementsByTagName("body")[0];

    filterMenuLabels.addEventListener("click", function openFunc() {
        filterMenuLabels.classList.toggle("active");
        filterMenu.classList.toggle("active");
        body.classList.toggle("open_menu");
        body.classList.toggle("filter_open_menu");
    });
})();

//Filter variables
let filterSublistLi = document.querySelectorAll(".filter_sublist li");
let filterMenu = document.querySelector(".filter_menu");
let filterActive;
let filtersMap = {}; //TODO name!

//Change Labels Desktop
function changeFiltersLabelsDesk() {
    let filterLabel = filterActive.textContent;
    let filterLabelsTabParentAttr = filterActive.parentElement.getAttribute("data-filter");
    let ativeFilterOptionLi = filterActive.parentElement.parentElement;
    let ativeFilterOptionUl = filterActive.parentElement;

    let targetMenuUl = document.querySelector("ul[data-filter=" + filterLabelsTabParentAttr + "]");

    if(targetMenuUl.parentNode.getElementsByClassName("selected_filter_label")[0]){
        targetMenuUl.parentNode.getElementsByClassName("selected_filter_label")[0].innerText = filterLabel;
    } else {
        if(filtersMap.hasOwnProperty(filterLabelsTabParentAttr)) {
            let span = document.createElement("span");
            span.classList.add("selected_filter_label");
            ativeFilterOptionLi.insertBefore(span, ativeFilterOptionUl);
            span.textContent = filterLabel; 
            targetMenuUl.parentElement.classList.add("selected_filter");
        }
    }

    if(filterLabel == "Not selected") {
        targetMenuUl.parentNode.getElementsByClassName("selected_filter_label")[0].innerText = "";
        targetMenuUl.parentElement.classList.remove("selected_filter");
    }
}

//Change Labels Tablet
function changeFiltersLabelsTab() {
    let filterLabel = filterActive.textContent;
    let filterLabelsTabParentAttr = filterActive.parentElement.getAttribute("data-filter");
    let filterLabelsTabParentElem = document.querySelector("[data-filter=" + filterLabelsTabParentAttr +"]");

    if(filterLabel == "Not selected") {
        let ativeFilterOptionLi = filterActive.parentElement.parentElement;
        let ativeFilterOptionLiText = ativeFilterOptionLi.querySelector("span").textContent;
        filterLabelsTabParentElem.textContent = ativeFilterOptionLiText;
        filterLabelsTabParentElem.classList.remove("selected");
    } else if(filtersMap.hasOwnProperty(filterLabelsTabParentAttr)) {
        filterLabelsTabParentElem.textContent = filterLabel;
        filterLabelsTabParentElem.classList.add("selected");
    }
}

//Click Filters Options
filterMenu.addEventListener("click", function(event) {
    event.preventDefault();

    if(event.target.tagName == "LI") {
        if(filterActive!=undefined) {
            filterActive.classList.remove("active");
        }
        filterActive = event.target;
        filterActive.classList.add("active");

        let key = filterActive.parentElement.getAttribute("data-filter");
        filtersMap[key]  = filterActive.textContent;

        changeFiltersLabelsTab();
        changeFiltersLabelsDesk();
    }
});


