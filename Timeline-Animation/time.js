let menuBtn = document.getElementById("menu-btn");
let menuCloseBtn = document.getElementById("menu-close-btn");

let tl = gsap.timeline();

tl.to(".full", {
    right: 0,
    duration: 0.5,
}).from(".full h4", {
    y: 20,
    opacity: 0,
    duration: 0.125,
    stagger: 0.3
}).to(".full i", {
    duration: 0.15,
    rotation: 90,
    repeat: 1,
});

tl.pause();

menuBtn.addEventListener("click", () => {
    tl.play();
})

menuCloseBtn.addEventListener("click", () => {
    tl.reverse();
})
