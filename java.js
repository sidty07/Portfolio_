gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".sidname",
        start: "top top",
        end: "+=200%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1   // 🔥 prevents white glitch
    }
});

// 🔥 NO gsap.set() → let timeline handle everything

// 1. INITIAL → light bg + dark text → transition to black
tl.fromTo(".sidname",
    { backgroundColor: "#EDF2EB" },
    { backgroundColor: "#000", duration: 1 },
    0
);

tl.fromTo(".name, .subtitle",
    { color: "#14191a" },
    { color: "#fff", duration: 1 },
    0
);

// 2. Zoom name
tl.fromTo(".name",
    { scale: 1.6, opacity: 0.5, filter: "blur(10px)" },
    { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.5 },
    0
);

// 3. Name exit
tl.to(".name", {
    y: -150,
    opacity: 0,
    duration: 1
});

// 4. Subtitle entry
tl.fromTo(".subtitle",
    { opacity: 0, y: 40 },
    {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out"
    },
    "-=0.3"
);

// 5. Subtitle exit (zoom + fade on scroll out)
gsap.to(".subtitle", {
    scrollTrigger: {
        trigger: ".sidname",
        start: "bottom 60%",
        end: "bottom top",
        scrub: true
    },
    scale: 1.5,
    opacity: 0,
    ease: "none"
});


// CREATE ELEMENTS
const cursor = document.createElement("div");
const dot = document.createElement("div");

cursor.classList.add("cursor");
dot.classList.add("cursor-dot");

document.body.appendChild(cursor);
document.body.appendChild(dot);

// CENTER OFFSET
gsap.set([cursor, dot], { xPercent: -50, yPercent: -50 });

// MOUSE MOVE
window.addEventListener("mousemove", (e) => {

    // DOT (fast)
    gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });

    // CIRCLE (smooth lag)
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out"
    });
});