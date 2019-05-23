(function() {
    let toggleMenuBtn = document.querySelector("#toggle-menu");
    let navigation = document.querySelector(".header-nav");

    toggleMenuBtn.addEventListener("click", () => {
        navigation.classList.toggle("active");
    });
})();