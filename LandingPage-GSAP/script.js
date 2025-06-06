// Initialize the gsap time line
let tl = gsap.timeline();


// Header Section Animation
tl.from("nav .nav-logo, nav .nav-links .nav-link, nav .nav-links button", {
    y: -30,
    opacity: 0,
    delay: 0.5,
    duration: 0.7,
    stagger: 0.15
}); tl.from(".hero-left h1", {
    x: -500,
    opacity: 0,
    duration: 0.5
}, "-=0.5")
    .from(".hero-left p", {
        x: -400,
        opacity: 0,
        duration: 0.4
    }, "-=0.45")
    .from(".hero-left button", {
        x: -300,
        opacity: 0,
        duration: 0.4
    }, "-=0.45")
    .from(".hero-right img", {
        x: 500,
        opacity: 0,
        duration: 0.4
    }, "-=0.50");


let nav = document.querySelector("nav");
let isNavHidden = false;
window.addEventListener("wheel", (value) => {
    if (value.deltaY > 0 && !isNavHidden) {
        gsap.to(nav, {
            y: -40,
            opacity: 0,
            duration: 1,
            onComplete: () => { isNavHidden = true; }
        });
    } else if (value.deltaY < 0 && isNavHidden) {
        gsap.to(nav, {
            y: 1,
            opacity: 1,
            duration: 0.15,
            onComplete: () => { isNavHidden = false; }
        });
    }
    // console.log(value.deltaY);
});

// Services Animation
let tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: "main",
        scroller: "body",
        // markers: true,
        start: "top 50%",
        end: "top -35%",
        scrub: 4
    }
});

tl2.from(".logos", {
    y: 100,
    opacity: 0,
    duration: 0.4,
}).from(".services .ser-head", {
    y: 40,
    opacity: 0,
    duration: 0.7,
})
tl2.from(".box-1", {
    x: -300,
    opacity: 0,
    duration: 1,
    delay: 0.25
}, "line1")
tl2.from(".box-2", {
    x: 300,
    opacity: 0,
    duration: 1,
    delay: 0.25
}, "line1")
tl2.from(".box-3", {
    x: -300,
    opacity: 0,
    duration: 1,
    delay: 0.25
}, "line2")
tl2.from(".box-4", {
    x: 300,
    opacity: 0,
    duration: 1,
    delay: 0.25
}, "line2");

//Proposal Animation
let tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".proposal",
        scroller: "body",
        // markers: true,
        start: "top 70%",
        end: "top 20%",
        scrub: 2
    }
});

tl3.from(".content h1, .content p,.content button", {
    x: -100,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1
}, "-=1")
    .from(".side-img img", {
        x: 100,
        opacity: 0,
        duration: 0.5
    }, "-=1")


let t4 = gsap.timeline({
    scrollTrigger: {
        trigger: ".case-study",
        scroller: "body",
        // markers: true,
        start: "top 70%",
        end: "top 20%",
        scrub: 2
    }
})
t4.from("#end-trigger, .element", {
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.2
});
