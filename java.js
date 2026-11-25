
gsap.registerPlugin(ScrollTrigger);


// =====================================
// 1. LANDING PAGE ANIMATION
// =====================================

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".sidname",
        start: "top top",
        end: "+=200%",
        scrub: true,
        pin: true,
        anticipatePin: 1
    }
});


// Background + text colour

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


// Name animation

tl.fromTo(".name",
    {
        scale: 1.6,
        opacity: 0.5,
        filter: "blur(10px)"
    },
    {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)"
    },
    0
);


// Name exit

tl.to(".name", {
    y: -150,
    opacity: 0
});


// Subtitle entry

tl.fromTo(".subtitle",
    {
        opacity: 0,
        y: 40
    },
    {
        opacity: 1,
        y: 0
    },
    "-=0.3"
);


// Subtitle exit

tl.to(".subtitle", {
    scale: 1.5,
    opacity: 0
});



// =====================================
// 2. SCROLL DOWN INDICATOR
// =====================================


// Create scroll indicator

const scrollIndicator = document.createElement("div");

scrollIndicator.innerHTML = `
    <div style="margin-bottom:12px; white-space:nowrap;">
        SCROLL TO EXPLORE
    </div>

    <div style="
        width:23px;
        height:38px;
        border:1px solid currentColor;
        border-radius:20px;
        display:flex;
        justify-content:center;
        padding-top:7px;
        box-sizing:border-box;
        margin:auto;
    ">
        <div class="scroll-wheel" style="
            width:3px;
            height:7px;
            background:currentColor;
            border-radius:5px;
        "></div>
    </div>
`;

document.querySelector(".sidname").appendChild(scrollIndicator);


// Indicator positioning

gsap.set(scrollIndicator, {
    position: "absolute",
    bottom: "35px",
    left: "50%",
    xPercent: -50,
    textAlign: "center",
    fontSize: "10px",
    letterSpacing: "3px",
    color: "#14191a",
    opacity: 0,
    y: 15,
    zIndex: 20,
    pointerEvents: "none"
});


// Animated mouse wheel

gsap.to(".scroll-wheel", {
    y: 12,
    opacity: 0,
    duration: 1.3,
    repeat: -1,
    ease: "power1.in"
});


// Show indicator on page load

gsap.to(scrollIndicator, {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 1,
    ease: "power2.out"
});


// Hide indicator when scrolling down

let indicatorAnimation = gsap.to(scrollIndicator, {
    opacity: 0,
    y: 10,
    duration: 0.3,
    ease: "power2.out",
    paused: true
});


// Detect scroll direction

ScrollTrigger.create({
    trigger: ".sidname",
    start: "top top",
    end: "bottom top",

    onUpdate: (self) => {

        if (self.direction === 1) {
            indicatorAnimation.play();
        }

        if (self.progress === 0) {
            indicatorAnimation.reverse();
        }
    }
});



// =====================================
// 3. CUSTOM MOUSE CURSOR
// =====================================

const cursor = document.createElement("div");
const dot = document.createElement("div");

cursor.classList.add("cursor");
dot.classList.add("cursor-dot");

document.body.appendChild(cursor);
document.body.appendChild(dot);


// Center offset

gsap.set([cursor, dot], {
    xPercent: -50,
    yPercent: -50
});


// Mouse movement

window.addEventListener("mousemove", (e) => {

    // Dot - fast

    gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });


    // Circle - smooth lag

    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out"
    });

});
