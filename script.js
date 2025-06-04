let tl = gsap.timeline();
tl
    .from(".nav", {
        y: -200,
        duration: 0.75
    })
    .from(".link", {
        y: -50,
        duration: 0.75,
        stagger: 0.25
    })
    .from(".b-1, .b-2, .b-3", {
        y: 20,
        opacity: 0,
        duration: 0.3,
        scale: 0.2
    }, "-=1.5")
    .to(".b-1", {
        duration: 0.5,
        x: 300,
        y: "-50"
    }) //notice that there's no semicolon!
    .to(".b-2", {
        duration: .5,
        x: "-350",
        y: "100"
    }, "-=0.5")
    .to(".b-3", {
        duration: 1,
        rotation: 360,
        repeat: -1,
    }, "+=0.25")
    .from("body", {
        backgroundColor: "#0f0f0f",
        duration: 1.5
    })
    .from(".title", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        scale: 0.2
    }, "-=2.5")
    .from("p >span", {
        opacity: 0,
        y: 30,
        duration: 2,
        stagger: 1 //This means one by one like h1>p>h4
    })