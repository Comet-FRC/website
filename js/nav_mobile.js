// const hamMenu = document.querySelector('.ham-menu');

// const offScreenMenu = document.querySelector('.off-screen-menu');

// hamMenu.addEventListener('click', () => {
//     hamMenu.classList.toggle('active');
//     offScreenMenu.classList.toggle('active');
// });

document.getElementById("menu-toggle").addEventListener("click", function () {
    document.getElementById("nav-menu").classList.toggle("show");
});
