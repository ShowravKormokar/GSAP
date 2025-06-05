
let main = document.querySelector(".main");
let cursor = document.querySelector("#cursor");
let imgDiv = document.querySelector(".image");

imgDiv.addEventListener("mouseenter", () => {
    cursor.innerHTML = "Details";
    gsap.to(cursor, {
        scale: 4
    })
})
imgDiv.addEventListener("mouseleave", () => {
    cursor.innerHTML = "";
    gsap.to(cursor, {
        scale: 1
    })
})

main.addEventListener("mousemove", (e) => {
    // console.log(e.x);

    gsap.to(cursor, {
        x: e.x,
        y: e.y
    })
})

//------------------------------ Part 1
// let main = document.querySelector(".main");
// let cursor = document.querySelector("#cursor");

// main.addEventListener("mousemove", (e) => {
//     // console.log(e.x);

//     gsap.to(cursor, {
//         x: e.x,
//         y: e.y
//     })
// })