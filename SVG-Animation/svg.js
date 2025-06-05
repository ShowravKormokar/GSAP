//---------------------------- Optimized Code ---------------------------------

// Cache DOM elements
const path = document.querySelector("svg path");
const svg = document.querySelector("svg");
let isActive = false;

// Define paths
const initialPath = "M 20 250 Q 500 250 1060 250";
const finalPath = "M 20 250 Q 500 250 1060 250";

// Mouse enter handler
path.addEventListener("mouseenter", () => {
    isActive = true;
});

// Mouse move handler with throttling
let lastUpdate = 0;
svg.addEventListener("mousemove", (e) => {
    if (!isActive) return;

    // Throttle updates to 60fps
    const now = performance.now();
    if (now - lastUpdate < 16) return; // ~60fps
    lastUpdate = now;

    // Get mouse position relative to SVG
    const point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());

    // Update path with GSAP
    gsap.to(path, {
        attr: {
            d: `M 20 250 Q ${svgPoint.x} ${svgPoint.y} 1060 250`
        },
        duration: 0.2,
        ease: "power2.out"
    });
});

// Mouse leave handler
svg.addEventListener("mouseleave", () => {
    if (!isActive) return;
    isActive = false;

    gsap.to(path, {
        attr: { d: finalPath },
        duration: 1.5,
        ease: "elastic.out(1, 0.1)"
    });
});


//----------------------------------- Step By Step Code to Understand------------------

// let initPath = `M 20 250 Q 500 250 1060 250`;

// let finalPath = `M 20 250 Q 500 250 1060 250`;

// let line = document.querySelector("svg");
// let isTouch = false, isMove = false;

// document.querySelector("svg path").addEventListener("mouseenter", () => {
//     // console.log("Entered!");
//     isTouch = true;

// })

// line.addEventListener("mousemove", (destination) => {
//     isMove = true;
//     if (isTouch && isMove) {
//         initPath = `M 20 250 Q ${destination.x} ${destination.y} 1060 250`;

//         gsap.to("svg path", {
//             attr: {
//                 d: initPath
//             },
//             duration: 1,
//             ease: "power4.out"
//         })
//     }

// });

// line.addEventListener("mouseleave", () => {
//     isMove, isTouch = false;
//     gsap.to("svg path", {
//         attr: {
//             d: finalPath
//         },
//         duration: 1.5,
//         ease: "elastic.out(1,0.1)"
//     });
// })
