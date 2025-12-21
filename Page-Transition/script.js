document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const href = link.getAttribute("href");

            if (href && !href.startsWith("#") && href !== window.location.pathname) {
                animateTransition().then(() => {
                    window.location.href = href;
                });
            }
        });
    });

    //GSAP style
    gsap.set(".block", {
        visibility: "visible",
        scaleY: 1
    });

    revealTransition().then(() => {
        gsap.set(".block", {
            visibility: "hidden"
        });
    });

    function revealTransition() {
        return new Promise((resolve) => {
            gsap.to(".block", {
                scaleY: 0,
                duration: 1,
                stagger: {
                    each: 0.1,
                    from: "start",
                    grid: [2, 5],
                    axis: "x"
                },
                ease: "power4.inOut",
                onComplete: resolve
            });
        });
    };

    function animateTransition() {
        return new Promise((resolve) => {
            gsap.set(".block", {
                visibility: "visible",
                scaleY: 0
            });
            gsap.to(".block", {
                scaleY: 1,
                duration: 1,
                stagger: {
                    each: 0.1,
                    from: "start",
                    grid: [2, 5],
                    axis: "x"
                },
                ease: "power4.inOut",
                onComplete: resolve
            })
        })
    }
});