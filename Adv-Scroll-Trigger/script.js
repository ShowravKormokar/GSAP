document.querySelectorAll(".card").forEach((card) => {
  //GSAP code
  gsap.to(card, {
    scale: 0.7,
    opacity: 0,
    duration: 3,
    scrollTrigger: {
      trigger: card,
      start: "top 10vh",
      end: "bottom 15%",
      scrub: true,
      markers: true,
    },
  });
});