(function() {
    let toggleMenuBtn = document.querySelector("#toggle-menu");
    let navigation = document.querySelector(".navigation");

    toggleMenuBtn.addEventListener("click", () => {
        navigation.classList.toggle("active");
    });
})();