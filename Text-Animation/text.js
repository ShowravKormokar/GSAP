let text = document.querySelector(".main h1");
let textValue = text.textContent;
let splitText = textValue.split("");
let clutter = "";

let halftext = Math.floor(splitText.length / 2);

splitText.forEach((element, idx) => {
    if (idx < halftext)
        clutter += `<span class="char1">${element}</span>`;
    else if (idx >= halftext)
        clutter += `<span class="char2">${element}</span>`;
});

text.innerHTML = clutter;

gsap.from(".main h1 .char1", {
    y: 100,
    duration: 0.75,
    opacity: 0,
    stagger: 0.2
})
gsap.from(".main h1 .char2", {
    y: 100,
    duration: 0.75,
    opacity: 0,
    stagger: -0.2
})