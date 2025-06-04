// Register ScrollTrigger plugin (REQUIRED)
// gsap.registerPlugin(ScrollTrigger);

// Animation for Page 1
gsap.from("#p-1 .box", {
    scale: 0,
    duration: 2,
    rotate: 360
});

// Animation for Page 2 (with ScrollTrigger)
gsap.from("#p-2 #b-2", {
    scale: 0,
    duration: 3,
    y: 20,
    scrollTrigger: {
        trigger: "#p-2 #b-2",
        scroller: "body", // Optional (default is document)
        markers: true, // Debug markers
        start: "top 100%", // When the trigger hits 50% from the top of the viewport
        end: "top 53%",
        scrub: 2,
        // pin: true
    }
});


// Page-3 Animation

gsap.to("#p-3 h1", {
    transform: "translateX(-80%)",
    opacity: 2,
    scrollTrigger: {
        trigger: "#p-3",
        scroller: "body",
        markers: true,
        start: "top 0%",
        end: "top -200%",
        scrub: 2,
        pin: true
    }
})

// let tl = gsap.timeline();
// tl.from(".contents h1", {
//     y: 30,
//     duration: 2,
//     opacity: 0,
//     scrollTrigger: {
//         trigger: ".contents h1",
//         scroller: "body",
//         markers: true,
//         start: "top 90%",
//         end: "top 53%",
//         scrub: 3
//     }
// })
//     .from(".contents p", {
//         y: 40,
//         duration: 1,
//         opacity: 0,
//         scrollTrigger: {
//             trigger: ".contents p",
//             scroller: "body",
//             markers: true,
//             start: "top 93%",
//             end: "top 53%",
//             scrub: 3
//         }

//     })
//     .from(".contents h4", {
//         y: 50,
//         duration: 2,
//         opacity: 0,
//         scrollTrigger: {
//             trigger: ".contents h4",
//             scroller: "body",
//             markers: true,
//             start: "top 95%",
//             end: "top 53%",
//             scrub: 3
//         }

//     })