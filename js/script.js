function makeBurger() {
    const button = document.querySelector(".burger");
    const menu = document.querySelector(".menu");

    button.onclick = () => {
        menu.classList.toggle("is-show");
    }
}

makeBurger();