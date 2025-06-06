// Get Wheel Y axis value
window.addEventListener("wheel", (value) => {
    if (value.deltaY > 0) {
        gsap.to(".marquee", {
            transform: "translateX(-200%)",
            duration: 6,
            repeat: -1,
            ease: "none"
        });

        gsap.to(".marquee img", {
            rotation: 180,
            duration: 1
        });
    } else {
        gsap.to(".marquee", {
            transform: "translateX(0%)",
            duration: 6,
            repeat: -1,
            ease: "none"
        });
        gsap.to(".marquee img", {
            rotation: 0,
            duration: 1
        });
    }
});

