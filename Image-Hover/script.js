document.addEventListener("DOMContentLoaded", () => {
    const profileImageCon = document.querySelector(".profile-images");
    const profileImg = document.querySelectorAll(".profile-images .img");
    const nameEle = document.querySelectorAll(".profile-names .name");

    // Function to split text into spans
    function splitTextIntoSpans(element) {
        const text = element.textContent;
        element.innerHTML = '';

        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = text[i];
            span.style.display = 'inline-block';
            span.style.transform = 'translateY(100%)';
            element.appendChild(span);
        }
    }

    // Split all name headings into letters
    const nameHeadings = document.querySelectorAll(".profile-names .name h1");
    nameHeadings.forEach((heading) => {
        splitTextIntoSpans(heading);
    });

    // Get default name letters
    const defaultLetters = nameEle[0].querySelectorAll(".letter");

    // Set initial state for default letters (already hidden by CSS transform)

    // Only run on larger screens
    if (window.innerWidth >= 700) {
        // Create hover effects for each image
        profileImg.forEach((img, index) => {
            // Note: index 0 in profileImg corresponds to nameEle[1] (since nameEle[0] is default)
            const correspondingName = nameEle[index + 1];
            const letters = correspondingName ? correspondingName.querySelectorAll(".letter") : [];

            // Set initial state for these letters (hidden at bottom)
            gsap.set(letters, { y: "100%" });

            img.addEventListener("mouseenter", () => {
                // Enlarge the image
                gsap.to(img, {
                    width: 120,
                    height: 120,
                    duration: 0.5,
                    ease: "power4.out",
                });

                // Animate letters in (from bottom to center)
                gsap.to(letters, {
                    y: "-100%",
                    ease: "power4.out",
                    duration: 0.75,
                    stagger: {
                        each: 0.025,
                        from: "center",
                    }
                });
            });

            img.addEventListener("mouseleave", () => {
                // Shrink the image back
                gsap.to(img, {
                    width: 100,
                    height: 100,
                    duration: 0.5,
                    ease: "power4.out"
                });

                // Animate letters out (from center to bottom)
                gsap.to(letters, {
                    y: "100%",
                    ease: "power4.out",
                    duration: 0.75,
                    stagger: {
                        each: 0.025,
                        from: "center",
                    }
                });
            });
        });

        // Handle mouse enter on the whole image container
        if (profileImageCon) {
            console.log(profileImageCon);
            profileImageCon.addEventListener("mouseenter", () => {
                gsap.to(defaultLetters, {
                    y: "0%",
                    ease: "power4.out",
                    duration: 0.75,
                    stagger: {
                        each: 0.025,
                        from: "center",
                    }
                });
            });

            profileImageCon.addEventListener("mouseleave", () => {
                gsap.to(defaultLetters, {
                    y: "100%",
                    ease: "power4.out",
                    duration: 0.75,
                    stagger: {
                        each: 0.025,
                        from: "center",
                    }
                });
            });
        }
    }

    // Debug: Check if elements exist
    console.log('Profile images:', profileImg.length);
    console.log('Name elements:', nameEle.length);
    console.log('Default letters:', defaultLetters.length);
});