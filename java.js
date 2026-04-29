gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".sidname",
        start: "top top",
        end: "+=200%",
        scrub: true,        // 🔥 IMPORTANT (must be true for reverse)
        pin: true,
        anticipatePin: 1
    }
});

// 1. Background + text (reversible)
tl.fromTo(".sidname",
    { backgroundColor: "#EDF2EB" },
    { backgroundColor: "#000" },
    0
);

tl.fromTo(".name, .subtitle",
    { color: "#14191a" },
    { color: "#fff" },
    0
);

// 2. Name animation
tl.fromTo(".name",
    { scale: 1.6, opacity: 0.5, filter: "blur(10px)" },
    { scale: 1, opacity: 1, filter: "blur(0px)" },
    0
);

// 3. Name exit
tl.to(".name", {
    y: -150,
    opacity: 0
});

// 4. Subtitle entry
tl.fromTo(".subtitle",
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0 },
    "-=0.3"
);

// 5. Subtitle exit (PUT INSIDE timeline, not separate)
tl.to(".subtitle", {
    scale: 1.5,
    opacity: 0
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
