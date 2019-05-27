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

    toggleMenuBtn.addEventListener("click", function() {
        navigation.classList.toggle("active");
    });

    navigationItems.forEach(function(navItem) {
        navItem.addEventListener("click", function() {
            navigationItems.forEach(function(item) {
                item.classList.remove("active");
            });
            this.classList.add("active");
        });
    });

    window.addEventListener("scroll", function() {
        if (this.scrollY > 0) {
            document.querySelector(".header").classList.add("scrolled");
        } else {
            document.querySelector(".header").classList.remove("scrolled");            
        }
        document.querySelector(".header-fixed").style.top = this.scrollY + "px";
    });
})();