/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav-link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const nav = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== CUSTOM CURSOR ====================*/
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot && cursorOutline) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Add a slight delay/easing logic or just move it directly for now (CSS transition handles smoothing for outline)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    }
});

/*==================== DARK/LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme' // We will actually toggle 'light-theme', default is dark
const iconTheme = 'fa-sun' // Icon to show when in Dark Mode (to switch to light)

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains('light-theme') ? 'light' : 'dark'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun'

if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
    document.body.classList[selectedTheme === 'dark' ? 'remove' : 'add']('light-theme')
    themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
if (themeButton) {
    themeButton.addEventListener('click', () => {
        // Add or remove the light / dark theme
        document.body.classList.toggle('light-theme')
        themeButton.classList.toggle(iconTheme)

        // We save the theme and the current icon that the user chose
        localStorage.setItem('selected-theme', getCurrentTheme())
        localStorage.setItem('selected-icon', getCurrentIcon())
    })
}

/*==================== 3D TILT EFFECT ====================*/
document.addEventListener('DOMContentLoaded', () => {
    // Applied to all major box elements for consistent premium feel
    const tiltElements = document.querySelectorAll('.project-card, .code-card, .experience-card, .education-card, .about-box');

    tiltElements.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Get rotation values (max rotation 8deg for subtle, premium feel)
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            // Apply transform
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reset transform
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
});

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true // Animations repeat
})

/* Home */
sr.reveal('.home-data')
sr.reveal('.home-img', { delay: 500 })
sr.reveal('.home-social', { delay: 600 })

/* General Section Titles */
sr.reveal('.section-title, .section-subtitle', { origin: 'left', interval: 100 })

/* About */
sr.reveal('.about-img', { origin: 'left' })
sr.reveal('.about-data', { origin: 'right' })
sr.reveal('.about-box', { interval: 200 })

/* Experience & Education */
sr.reveal('.experience-card, .education-card', { interval: 200, origin: 'bottom' })

/* Skills */
sr.reveal('.skills-category-title', { origin: 'left' })
sr.reveal('.skills-section-container', { origin: 'bottom', delay: 200 })

/* Projects */
sr.reveal('.project-card', { interval: 200, origin: 'bottom' })

/* Contact */
sr.reveal('.contact-content', { origin: 'bottom' })

/*==================== EXPERIENCE YEAR CALCULATION ====================*/
// Calculate experience from Jan 1, 2021
const experienceElement = document.getElementById('experience-years');
if (experienceElement) {
    const startDate = new Date('2021-01-01');
    const currentDate = new Date();

    // Difference in milliseconds
    const diffTime = Math.abs(currentDate - startDate);
    // Convert to years (365.25 days per year to account for leap years)
    const yearsExp = diffTime / (1000 * 60 * 60 * 24 * 365.25);

    // Format to 1 decimal place and add "+"
    experienceElement.innerText = yearsExp.toFixed(1) + "+ Years";
}

/*==================== GSAP HERO ANIMATION ====================*/
// "Parting the Sea" Effect matching art-yakushev.com
document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const heroTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".home",
                start: "top top",
                end: "+=100%", // Pin for 1 screen height
                pin: true,
                scrub: 1.5, // Smooth scrubbing
            }
        });

        // Split the names apart
        heroTimeline
            .to(".hero-left", { x: "-60vw", opacity: 0.2, ease: "power2.inOut" }, "split")
            .to(".hero-right", { x: "60vw", opacity: 0.2, ease: "power2.inOut" }, "split")

            // Reveal central content
            .to(".hero-center-reveal", {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                onStart: () => {
                    document.querySelector('.hero-center-reveal').classList.add('active');
                }
            }, "-=0.3"); // Overlap slightly

        // Additional premium touch: Parallax for the visual wrapper if it exists
        // gsap.to(".visual-wrapper", {
        //     scrollTrigger: {
        //          trigger: ".home",
        //          start: "top top",
        //          scrub: true
        //     },
        //     y: 200,
        //     opacity: 0
        // });
    }
});

/*==================== HACKER TEXT EFFECT (NAV) ====================*/
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

document.querySelectorAll(".nav-link").forEach(item => {
    // Only apply if data-value exists
    if (!item.dataset.value) return;

    item.onmouseover = event => {
        let iteration = 0;

        clearInterval(item.interval);

        item.interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return event.target.dataset.value[index];
                    }

                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");

            if (iteration >= event.target.dataset.value.length) {
                clearInterval(item.interval);
            }

            iteration += 1 / 3;
        }, 30);
    }
});

/*==================== BACKGROUND MUSIC SYSTEM ====================*/
// Using reliable test music source
const bgMusic = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.4;
let isPlaying = false;

// Auto-start attempt
const attemptAutoPlay = () => {
    bgMusic.play().then(() => {
        isPlaying = true;
        console.log("🎶 Background Music Started");
    }).catch(err => {
        console.log("Autoplay waiting for interaction...");
    });
};

// Try immediately on load
attemptAutoPlay();

// Fallback: Unlock on first interaction (Click, Scroll, Key)
const unlockAudio = () => {
    if (!isPlaying) {
        bgMusic.play().then(() => {
            isPlaying = true;
            console.log("🎶 Audio Unlocked via Interaction");
            // Remove listeners once successful
            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('scroll', unlockAudio);
            document.removeEventListener('keydown', unlockAudio);
            document.removeEventListener('mousemove', unlockAudio);
            document.removeEventListener('touchstart', unlockAudio);
        }).catch(err => {
            // Still blocked, keep listeners attached
            console.log("Interaction retry failed");
        });
    }
};

// Aggressive listeners for first user gesture
document.addEventListener('click', unlockAudio);
document.addEventListener('scroll', unlockAudio);
document.addEventListener('keydown', unlockAudio);
document.addEventListener('mousemove', unlockAudio);
document.addEventListener('touchstart', unlockAudio);
