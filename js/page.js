(function() {
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function(callback, thisArg) {
            thisArg = thisArg || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }

    let toggleMenuBtn = document.querySelector("#toggle-menu");
    let navigation = document.querySelector(".header-nav");
    let navigationItems = document.querySelectorAll(".navigation .navigation-item");
    let galleryItems = document.querySelectorAll(".section-gallery .gallery-item");
    let currentDisplayedImage = 0;
    let slideShowGalleryImage = document.querySelector(".slideshow-gallery--image");
    let slideShow = document.querySelector(".slideshow");
    let slideShowCloseBtn = document.querySelector(".slideshow .slideshow-close");
    let slideShowPrevBtn = document.querySelector(".slideshow-arrow.arrow-prev");
    let slideShowNextBtn = document.querySelector(".slideshow-arrow.arrow-next");

    toggleMenuBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        navigation.classList.toggle("active");
    });

    navigationItems.forEach(function(navItem) {
        navItem.addEventListener("click", function() {
            navigationItems.forEach(function(item) {
                item.classList.remove("active");
            });
            this.classList.add("active");
            navigation.classList.remove("active");
        });
    });

    galleryItems.forEach(function(galleryItem) {
        galleryItem.addEventListener("click", runSlideShow);
    });
    slideShowCloseBtn.addEventListener("click", function() {
        slideShow.classList.remove("showtime");
    });

    slideShowPrevBtn.addEventListener("click", onSlideShowArrowClick);
    slideShowNextBtn.addEventListener("click", onSlideShowArrowClick);

    window.addEventListener("scroll", function() {
        if (this.scrollY > 0) {
            document.querySelector(".header").classList.add("scrolled");
        } else {
            document.querySelector(".header").classList.remove("scrolled");            
        }
        document.querySelector(".header-fixed").style.top = this.scrollY + "px";
    });

    document.querySelector('a[href="' + window.location.hash + '"]').classList.add("active");
    document.body.addEventListener("click", function(e) {
        if (e.target !== toggleMenuBtn && navigation.classList.contains("active")) {
            navigation.classList.remove("active");
        }
    });

    function onSlideShowArrowClick() {
        if (this === slideShowPrevBtn) {
            currentDisplayedImage--;
        } else if (this === slideShowNextBtn) {
            currentDisplayedImage++;
        }
        if (currentDisplayedImage < 0) {
            currentDisplayedImage = galleryItems.length - 1;
        }
        if (currentDisplayedImage > galleryItems.length - 1) {
            currentDisplayedImage = 0;
        }
        showGalleryItem();
    }

    function runSlideShow() {
        currentDisplayedImage = this.dataset.galleryItem;
        showGalleryItem();
    }
    function showGalleryItem() {
        slideShowGalleryImage.src = document.querySelector('.gallery-item[data-gallery-item="' + currentDisplayedImage + '"] .gallery-image').src;
        slideShow.classList.add("showtime");
    }
})();