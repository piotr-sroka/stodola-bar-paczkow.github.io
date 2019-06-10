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
	let gallery = document.querySelector(".section.section-gallery");
	let slideShowGalleryImage = document.querySelector(".slideshow-gallery--image");
	let slideShow = document.querySelector(".slideshow");
	let slideShowCloseBtn = document.querySelector(".slideshow .slideshow-close");
	let slideShowPrevBtn = document.querySelector(".slideshow-arrow.arrow-prev");
    let slideShowNextBtn = document.querySelector(".slideshow-arrow.arrow-next");
    let startTouchPosX = 0;
    let endTouchPosX = 0;
    let is_touch_device = 'ontouchstart' in window;
    let downEvent = is_touch_device ? 'touchstart' : 'mousedown';
    let upEvent = is_touch_device ? 'touchend' : 'mouseup';
    let backToTop = document.querySelector(".back-to-top");

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
    if (!window.matchMedia("(min-width: 600px)").matches) {
        slideShow.addEventListener(downEvent, function(e) {
            startTouchPosX = is_touch_device ? e.touches[0].clientX : e.clientX;
        });
        slideShow.addEventListener(upEvent, function(e) {
            endTouchPosX = is_touch_device ? e.changedTouches[0].clientX : e.clientX;
            if (endTouchPosX < startTouchPosX) {
                currentDisplayedImage--;
            } else {
                currentDisplayedImage++;
            }
            if (currentDisplayedImage < 0) {
                currentDisplayedImage = galleryItems.length - 1;
            }
            if (currentDisplayedImage > galleryItems.length - 1) {
                currentDisplayedImage = 0;
            }
            showGalleryItem();
        });
    }

	slideShowPrevBtn.addEventListener("click", onSlideShowArrowClick);
    slideShowNextBtn.addEventListener("click", onSlideShowArrowClick);
    backToTop.addEventListener("click", function() {
        window.scrollTo(0, 0);
    })

	window.addEventListener("scroll", function() {
		if (this.scrollY > 0) {
            document.querySelector(".header").classList.add("scrolled");
            backToTop.classList.remove("hidden");
		} else {
            document.querySelector(".header").classList.remove("scrolled");
            backToTop.classList.add("hidden");
		}
		document.querySelector(".header-fixed").style.top = this.scrollY + "px";
    });

	if (window.location.hash) {
        document.querySelector('a[href="' + window.location.hash + '"]').classList.add("active");
    }
	document.body.addEventListener("click", function(e) {
		if (e.target !== toggleMenuBtn && navigation.classList.contains("active")) {
			navigation.classList.remove("active");
		}
	});

	window.addEventListener("resize", onWindowResize);
	onWindowResize();
	function onWindowResize() {
		let maxSize = Math.floor(Math.min(document.body.clientWidth, 1366) / 6);
		galleryItems.forEach(function(galleryItem) {
			galleryItem.style.width = maxSize + "px";
			galleryItem.style.height = maxSize + "px";
		});
	}

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
