"use strict";


/* Home Slider */
(function () {
    //Slider Variables
    let slider = document.getElementById("home_slider");
    let arrSlides = document.getElementsByClassName("home_slide");
    let activeSlide = arrSlides[0];
    activeSlide.classList.add("active");

    //Dots Variables
    let controlsDotsElem = document.getElementById("controls_dots");
    let arrDots = [];
    let activeDot;

    //Prev/Next Variables
    let prevBtn = document.getElementById("home_slider_prev");
    let nextBtn = document.getElementById("home_slider_next");

    //Create Dots
    function Dot(dotNumber) {
        this.dotNumber = dotNumber;
        let dot = document.createElement("span");
        dot.className = "dot";
        dot.setAttribute("number", dotNumber);
        controlsDotsElem.appendChild(dot);
        if(dotNumber == 0) {
            dot.classList.add("active");
            activeDot = dot;
        }
        arrDots.push(dot);
    }
    for(let i = 0; i < arrSlides.length; i++) {
        new Dot(i); 
        arrSlides[i].setAttribute("number", i);
    }

    //Remove Active Class Slider
    function removeActiveClassSlider() {
        if(activeSlide != undefined) {
            activeSlide.classList.remove("active");
            activeDot.classList.remove("active");
        }
    };

    //Add Active Class Slider
    function addActiveClassSlider() {
        if(activeSlide != undefined) {
            activeSlide.classList.add("active");
            activeDot.classList.add("active");
        }
    };

    //Slide To Right
    function slideToRight() {
        slide(arrSlides.length-1, 0, 1);
    }

    //Slide To Left
    function slideToLeft() {
        slide(0, arrSlides.length-1, -1);
    }

    //Slide
    function slide(slideNumber, tickIndex, nextSlideNumber) {
        let activeSlideNumber = activeSlide.getAttribute("number");
        if(activeSlideNumber == slideNumber) sliderTick(tickIndex);
        else sliderTick(parseInt(activeSlideNumber)+nextSlideNumber);
        autoSlide();
    }

    //Slider Tick
    function sliderTick(index) {
        removeActiveClassSlider();
        activeSlide = arrSlides[index];
        activeDot = arrDots[index];
        addActiveClassSlider();
    }

    //Set Interval Animation
    let timerHomeSlider = setInterval(slideToRight, 10000);
    function autoSlide() {
        clearInterval(timerHomeSlider);
        timerHomeSlider = setInterval(slideToRight, 10000);
    }

    //Click Dots
    controlsDotsElem.addEventListener("click", function(event) {
        event.preventDefault();

        if(event.target.classList.contains("dot")) {
           let dot = event.target;

            if(dot.getAttribute("number") != 0 ) {
                arrDots[0].classList.remove("active");
            }

            if(!dot.classList.contains("active")) {
                dot.classList.add("active");

                if(activeDot!=undefined) {
                  activeDot.classList.remove("active");
                  activeSlide.classList.remove("active");
                }
                activeDot = dot;

                let num = activeDot.getAttribute("number");
 
                let slide = document.querySelector("div[number=\"" + num +"\"]");
                slide.classList.add("active");

                activeSlide = slide;
            }
        }
        autoSlide();
    });

    //Click Prev
    prevBtn.addEventListener("click", function(event) {
        event.preventDefault();
        slideToLeft();
    });
    
    //Click Next
    nextBtn.addEventListener("click", function(event) {
        event.preventDefault();
        slideToRight();
    });

})();