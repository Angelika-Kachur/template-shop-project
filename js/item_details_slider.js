"use strict";

/* Product Slider */
(function () {
    //Slider Variables
    let slider = document.getElementById("product_slider");
    let arrSlides = document.getElementsByClassName("product_slide");
    let slidesCount = arrSlides.length;
    let activeSlide = arrSlides[0];
    activeSlide.classList.add("active");

    //Previews Variables
    let previewsElem = document.getElementById("product_slider_previews");
    let arrPreviews = document.getElementsByClassName("preview");
    let activePreview = arrPreviews[0];
    activePreview.classList.add("active");

    for(let i = 0; i < slidesCount; i++) {
        arrSlides[i].setAttribute("number", i);
        arrPreviews[i].setAttribute("number", i);
    }

    //Remove Active Class Slider
    function removeActiveClassSlider() {
        if(activeSlide != undefined) {
            activeSlide.classList.remove("active");
            activePreview.classList.remove("active");
        }
    };

    //Add Active Class Slider
    function addActiveClassSlider() {
        if(activeSlide != undefined) {
            activeSlide.classList.add("active");
            activePreview.classList.add("active");
        }
    };

    //Click Previews
    previewsElem.addEventListener("click", function(event) {
        event.preventDefault();

        if(event.target.classList.contains("preview")) {
           let preview = event.target;

            if(preview.getAttribute("number") != 0 ) {
                arrPreviews[0].classList.remove("active");
            }

            if(!preview.classList.contains("active")) {
                preview.classList.add("active");

                if(activePreview!=undefined) {
                  activePreview.classList.remove("active");
                }
                activePreview = preview;
                
                let num = activePreview.getAttribute("number");
 
                let slide = document.querySelector("div[number=\"" + num +"\"]");
                slide.classList.add("active");
                if(activeSlide!=undefined) {
                    activeSlide.classList.remove("active");
                }
                activeSlide = slide;
            }
        }
    });
})();