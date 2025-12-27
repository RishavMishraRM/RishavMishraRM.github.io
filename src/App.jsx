import React, { useEffect, useState } from 'react';
import ScrollReveal from 'scrollreveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// --- REUSABLE CODE PANEL COMPONENT ---
const CodePanel = () => (
    <div className="home-visual">
        <div className="visual-wrapper">
            <div className="code-card">
                <div className="card-header">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                </div>
                <div className="code-body">
                    <div className="code-line"><span className="keyword">const</span> <span className="variable">engineer</span> = {'{'}</div>
                    <div className="code-line indent">name: <span className="string">'Rishav Kumar Mishra'</span>,</div>
                    <div className="code-line indent">focus: <span className="string">'Data Science & AI'</span>,</div>
                    <div className="code-line indent">status: <span className="string">'Building Future'</span></div>
                    <div className="code-line">{'}'};</div>
                    <div className="code-line"><span className="function">console</span>.<span className="method">log</span>(engineer);</div>
                </div>
            </div>
        </div>
    </div>
);

function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState('dark'); // 'dark' or 'light'

    // --- 1. Initial Logic & Effects ---
    useEffect(() => {
        // --- ScrollReveal ---
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '40px',
            duration: 2000,
            delay: 200,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            scale: 0.98,
        });

        sr.reveal('.home-data');
        sr.reveal('.home-img', { delay: 500 });
        sr.reveal('.home-social', { delay: 600 });
        sr.reveal('.section-title, .section-subtitle', { origin: 'left', interval: 100 });
        sr.reveal('.about-img', { origin: 'left' });
        sr.reveal('.about-data', { origin: 'right' });
        sr.reveal('.about-box', { interval: 200 });
        sr.reveal('.experience-card, .education-card', { interval: 200, origin: 'bottom' });
        sr.reveal('.skills-category-title', { origin: 'left' });
        sr.reveal('.skills-section-container', { origin: 'bottom', delay: 200 });
        sr.reveal('.project-card', { interval: 200, origin: 'bottom' });
        sr.reveal('.contact-content', { origin: 'bottom' });

        // --- GSAP Hero Animation ---
        const heroTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".home",
                start: "top top",
                end: "+=100%",
                pin: true,
                scrub: 1.5,
            }
        });

        heroTimeline
            .to(".hero-left", { x: "-60vw", opacity: 0.2, ease: "power2.inOut" }, "split")
            .to(".hero-right", { x: "60vw", opacity: 0.2, ease: "power2.inOut" }, "split")
            .to(".hero-center-reveal", {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                onStart: () => {
                    document.querySelector('.hero-center-reveal')?.classList.add('active');
                }
            }, "-=0.3");

        // --- Experience Years Calculation ---
        const experienceElement = document.getElementById('experience-years');
        if (experienceElement) {
            const startDate = new Date('2021-01-01');
            const currentDate = new Date();
            const diffTime = Math.abs(currentDate - startDate);
            const yearsExp = diffTime / (1000 * 60 * 60 * 24 * 365.25);
            experienceElement.innerText = yearsExp.toFixed(1) + "+ Years";
        }

        // --- Hacker Text Effect ---
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        document.querySelectorAll(".nav-link").forEach(item => {
            if (!item.dataset.value) return;
            item.onmouseover = event => {
                let iteration = 0;
                clearInterval(item.interval);
                item.interval = setInterval(() => {
                    event.target.innerText = event.target.innerText
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) return event.target.dataset.value[index];
                            return letters[Math.floor(Math.random() * 26)];
                        })
                        .join("");
                    if (iteration >= event.target.dataset.value.length) clearInterval(item.interval);
                    iteration += 1 / 3;
                }, 30);
            }
        });

        // --- Tilt Effect ---
        const tiltElements = document.querySelectorAll('.project-card, .code-card, .experience-card, .education-card, .about-box');
        const handleTilt = (e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        };
        const resetTilt = (e) => {
            e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        };
        tiltElements.forEach(card => {
            card.addEventListener('mousemove', handleTilt);
            card.addEventListener('mouseleave', resetTilt);
        });

        // --- Background Music ---
        const bgMusic = new Audio('./background.mp3');
        bgMusic.loop = true;
        bgMusic.volume = 0.6;
        let isPlaying = false;

        const attemptAutoPlay = () => {
            bgMusic.play().then(() => {
                isPlaying = true;
            }).catch(() => { });
        };
        attemptAutoPlay();

        const unlockAudio = () => {
            if (!isPlaying) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    ['click', 'scroll', 'keydown', 'mousemove', 'touchstart'].forEach(evt =>
                        document.removeEventListener(evt, unlockAudio)
                    );
                }).catch(() => { });
            }
        };
        ['click', 'scroll', 'keydown', 'mousemove', 'touchstart'].forEach(evt =>
            document.addEventListener(evt, unlockAudio)
        );

        // Clean up
        return () => {
            // Kill ScrollTrigger instances to prevent dupes on remount (though usually fine in App)
            ScrollTrigger.getAll().forEach(t => t.kill());
            // Remove Tilt listeners
            tiltElements.forEach(card => {
                card.removeEventListener('mousemove', handleTilt);
                card.removeEventListener('mouseleave', resetTilt);
            });
            ['click', 'scroll', 'keydown', 'mousemove', 'touchstart'].forEach(evt =>
                document.removeEventListener(evt, unlockAudio)
            );
            bgMusic.pause();
        };

    }, []);

    // --- Scroll Header & Active Link Logic ---
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('.header');
            if (window.scrollY >= 80) header?.classList.add('scroll-header');
            else header?.classList.remove('scroll-header');

            // Scroll Spy
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.pageYOffset;
            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute('id');
                const link = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link?.classList.add('active-link');
                } else {
                    link?.classList.remove('active-link');
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- Custom Cursor ---
    useEffect(() => {
        const cursorDot = document.querySelector('[data-cursor-dot]');
        const cursorOutline = document.querySelector('[data-cursor-outline]');
        const moveCursor = (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            if (cursorDot && cursorOutline) {
                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;
                cursorOutline.animate({
                    left: `${posX}px`,
                    top: `${posY}px`
                }, { duration: 500, fill: "forwards" });
            }
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    // Theme Toggle
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.body.classList.toggle('light-theme');
    };

    return (
        <>
            <div className="cursor-dot" data-cursor-dot></div>
            <div className="cursor-outline" data-cursor-outline></div>

            <header className="header" id="header">
                <nav className="nav-container">
                    <a href="#" className="logo">Rishav<span> Mishra</span></a>

                    <div className={`nav-menu ${menuOpen ? 'show-menu' : ''}`} id="nav-menu">
                        <ul className="nav-list">
                            <li className="nav-item"><a href="#home" className="nav-link active-link" data-value="Home" onClick={() => setMenuOpen(false)}>Home</a></li>
                            <li className="nav-item"><a href="#about" className="nav-link" data-value="About" onClick={() => setMenuOpen(false)}>About</a></li>
                            <li className="nav-item"><a href="#experience" className="nav-link" data-value="Experience" onClick={() => setMenuOpen(false)}>Experience</a></li>
                            <li className="nav-item"><a href="#education" className="nav-link" data-value="Education" onClick={() => setMenuOpen(false)}>Education</a></li>
                            <li className="nav-item"><a href="#skills" className="nav-link" data-value="Skills" onClick={() => setMenuOpen(false)}>Skills</a></li>
                            <li className="nav-item"><a href="#projects" className="nav-link" data-value="Projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
                            <li className="nav-item"><a href="#contact" className="nav-link button-styled" data-value="Contact Me" onClick={() => setMenuOpen(false)}>Contact Me</a></li>
                        </ul>
                        <div className="nav-close" id="nav-close" onClick={() => setMenuOpen(false)}>
                            <i className="fas fa-times"></i>
                        </div>
                    </div>

                    <div className="nav-btns">
                        <i className={`fas ${theme === 'light' ? 'fa-sun' : 'fa-moon'} change-theme`} id="theme-button" onClick={toggleTheme}></i>
                        <div className="nav-toggle" id="nav-toggle" onClick={() => setMenuOpen(true)}>
                            <i className="fas fa-bars"></i>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="main">
                {/* HOME SECTION */}
                <section className="home" id="home">
                    <div className="background-globes">
                        <div className="globe globe-1"></div>
                        <div className="globe globe-2"></div>
                    </div>

                    <div className="container home-container">
                        <div className="home-content">
                            <div className="hero-split-wrapper">
                                <h1 className="hero-text hero-left text-gradient">Rishav</h1>
                                <h1 className="hero-text hero-right text-gradient">Mishra</h1>
                            </div>

                            <div className="hero-center-reveal">
                                <span className="home-subtitle">GenAI Engineer | Applied AI & Payments</span>
                                <p className="home-description">
                                    With over 4.5 years of experience in the BFSI and Payments industry, I specialize in Digital and
                                    API Banking, bringing strong domain expertise across the fintech ecosystem. My work spans
                                    end-to-end digital payment journeys, Generative AI, fraud prevention, and go-to-market (GTM)
                                    strategies, enabling scalable and secure financial solutions.
                                </p>
                                <ul className="home-description-list">
                                    <li>4.5+ years in BFSI/Payment Industry</li>
                                    <li>Expertise in End-to-End Digital Payment Journeys</li>
                                </ul>
                                <div className="home-btns">
                                    <a href="#projects" className="button button--flex">
                                        View My Work <i className="fas fa-arrow-right button-icon"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <CodePanel />
                    </div>
                </section>

                {/* ABOUT SECTION */}
                <section className="about section" id="about">
                    <h2 className="section-title">About Me</h2>
                    <span className="section-subtitle">My Introduction</span>

                    <div className="container about-container grid-2-cols">
                        <div className="about-data">
                            <p className="about-description">
                                With over 4.5 years of experience in the BFSI and Payments industry, I specialize in Digital and
                                API Banking, bringing strong domain expertise across the fintech ecosystem. My work spans
                                end-to-end digital payment journeys, Generative AI, fraud prevention, and go-to-market (GTM)
                                strategies, enabling scalable and secure financial solutions.
                                <br /><br />
                                I currently lead the development of Gen AI-powered Projects for Lending and Collections, driving
                                automation, customer engagement, and operational efficiency through intelligent, data-driven
                                experiences.
                            </p>

                            <div className="about-info">
                                <div className="about-box">
                                    <i className="fas fa-award about-icon"></i>
                                    <h3 className="about-title">Experience</h3>
                                    <span className="about-subtitle" id="experience-years">5+ Years</span>
                                </div>
                                <div className="about-box">
                                    <i className="fas fa-graduation-cap about-icon"></i>
                                    <h3 className="about-title">Education</h3>
                                    <span className="about-subtitle">M.Tech '26, IIT</span>
                                </div>
                                <div className="about-box">
                                    <i className="fas fa-brain about-icon"></i>
                                    <h3 className="about-title">Focus</h3>
                                    <span className="about-subtitle">Generative AI, AI, ML,<br /> Data Science, DL, CV, NLP</span>
                                </div>
                            </div>
                        </div>

                        <CodePanel />
                    </div>
                </section>

                {/* EXPERIENCE SECTION */}
                <section className="experience section" id="experience">
                    <h2 className="section-title">Experience</h2>
                    <span className="section-subtitle">My professional journey</span>

                    <div className="container">
                        <div className="education-content">
                            {/* Exp Card 1 */}
                            <div className="education-card">
                                <div className="education-icon">
                                    <i className="fas fa-briefcase"></i>
                                </div>
                                <div className="education-data">
                                    <h3 className="education-degree">Analyst - Full time</h3>
                                    <span className="education-school">HDFC Bank</span>
                                    <span className="education-year"><i className="far fa-calendar-alt"></i> Jul 2022 - Present</span>
                                    <span className="education-grade">Skills: Data Analytics, ML</span>
                                </div>
                            </div>

                            {/* Exp Card 2 */}
                            <div className="education-card">
                                <div className="education-icon">
                                    <i className="fas fa-laptop-code"></i>
                                </div>
                                <div className="education-data">
                                    <h3 className="education-degree">Data Analyst Intern</h3>
                                    <span className="education-school">HighRadius</span>
                                    <span className="education-year"><i className="far fa-calendar-alt"></i> Aug 2021 - Aug 2022</span>
                                </div>
                            </div>

                            {/* Exp Card 3 */}
                            <div className="education-card">
                                <div className="education-icon">
                                    <i className="fas fa-laptop-code"></i>
                                </div>
                                <div className="education-data">
                                    <h3 className="education-degree">Intern</h3>
                                    <span className="education-school">Wipro</span>
                                    <span className="education-year"><i className="far fa-calendar-alt"></i> Mar 2022 - Jun 2022</span>
                                </div>
                            </div>

                            {/* Exp Card 4 */}
                            <div className="education-card">
                                <div className="education-icon">
                                    <i className="fas fa-microscope"></i>
                                </div>
                                <div className="education-data">
                                    <h3 className="education-degree">Research Intern</h3>
                                    <span className="education-school">NIT Patna</span>
                                    <span className="education-year"><i className="far fa-calendar-alt"></i> Mar 2021 - Jun 2021</span>
                                </div>
                            </div>

                            {/* Exp Card 5 */}
                            <div className="education-card">
                                <div className="education-icon">
                                    <i className="fas fa-brain"></i>
                                </div>
                                <div className="education-data">
                                    <h3 className="education-degree">Data Science Intern</h3>
                                    <span className="education-school">MedTourEasy</span>
                                    <span className="education-year"><i className="far fa-calendar-alt"></i> Feb 2021 - Mar 2021</span>
                                </div>
                            </div>

                            {/* Exp Card 6 */}
                            <div className="education-card">
                                <div className="education-icon">
                                    <i className="fas fa-chart-line"></i>
                                </div>
                                <div className="education-data">
                                    <h3 className="education-degree">Data Scientist Intern</h3>
                                    <span className="education-school">The Sparks Foundation</span>
                                    <span className="education-year"><i className="far fa-calendar-alt"></i> Jan 2021 - Feb 2021</span>
                                </div>
                            </div>

                            {/* Exp Card 7 */}
                            <div className="education-card">
                                <div className="education-icon">
                                    <i className="fas fa-chart-line"></i>
                                </div>
                                <div className="education-data">
                                    <h3 className="education-degree">Tech Intern</h3>
                                    <span className="education-school">BVG India LTD.</span>
                                    <span className="education-year"><i className="far fa-calendar-alt"></i> Aug 2020 - Oct 2020</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* EDUCATION SECTION */}
                <section className="education section" id="education">
                    <h2 className="section-title">Education</h2>
                    <span className="section-subtitle">My academic journey</span>

                    <div className="container">
                        <div className="education-content">
                            {/* Edu Card 1 */}
                            <div className="education-card">
                                <div className="education-icon">
                                    <i className="fas fa-user-graduate"></i>
                                </div>
                                <div className="education-data">
                                    <h3 className="education-degree">M.Tech in Artificial Intelligence & Data Science</h3>
                                    <span className="education-school">Indian Institute of Technology, Patna</span>
                                    <span className="education-year"><i className="far fa-calendar-alt"></i> 2024 - 2026</span>
                                    <span className="education-grade">Grade: In Progress</span>
                                </div>
                            </div>

                            {/* Edu Card 2 */}
                            <div className="education-card">
                                <div className="education-icon">
                                    <i className="fas fa-university"></i>
                                </div>
                                <div className="education-data">
                                    <h3 className="education-degree">B.Tech in Computer Science Engineering</h3>
                                    <span className="education-school">SRM Institute of Science and Technology, Chennai</span>
                                    <span className="education-year"><i className="far fa-calendar-alt"></i> 2018 - 2022</span>
                                    <span className="education-grade">Grade: 9 CGPA</span>
                                </div>
                            </div>

                            {/* Edu Card 3 */}
                            <div className="education-card">
                                <div className="education-icon">
                                    <i className="fas fa-university"></i>
                                </div>
                                <div className="education-data">
                                    <h3 className="education-degree">Higher Secondary</h3>
                                    <span className="education-school">Park Mount Public School, Patna <br /> CBSE <br /> Science</span>
                                    <span className="education-year"><i className="far fa-calendar-alt"></i> 2017 - 2018</span>
                                </div>
                            </div>

                            {/* Edu Card 4 */}
                            <div className="education-card">
                                <div className="education-icon">
                                    <i className="fas fa-school"></i>
                                </div>
                                <div className="education-data">
                                    <h3 className="education-degree">Boards</h3>
                                    <span className="education-school">St. Xaviers High School, Patna <br /> ICSE <br /> Computer & Science</span>
                                    <span className="education-year"><i className="far fa-calendar-alt"></i>2015 - 2016</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SKILLS SECTION */}
                <section className="skills section" id="skills">
                    <h2 className="section-title">My Skills</h2>
                    <span className="section-subtitle">What I work with</span>

                    <h3 className="skills-category-title">Tech Skills</h3>
                    <div className="skills-section-container">
                        <div className="skills-track">
                            <div className="skill-tag"><i className="fas fa-magic"></i> Generative AI</div>
                            <div className="skill-tag"><i className="fas fa-robot"></i> AI / ML</div>
                            <div className="skill-tag"><i className="fas fa-atom"></i> Data Science</div>
                            <div className="skill-tag"><i className="fas fa-brain"></i> Machine Learning</div>
                            <div className="skill-tag"><i className="fas fa-headset"></i> GenAI Calling Bots</div>
                            <div className="skill-tag"><i className="fas fa-shield-virus"></i> Guardrails & LLMs</div>
                            <div className="skill-tag"><i className="fas fa-chart-pie"></i> Analytics</div>
                            <div className="skill-tag"><i className="fab fa-python"></i> Python</div>
                            <div className="skill-tag"><i className="fas fa-database"></i> SQL</div>
                            <div className="skill-tag"><i className="far fa-snowflake"></i> Snowflake</div>
                            <div className="skill-tag"><i className="fas fa-filter"></i> ETL Processes</div>
                            <div className="skill-tag"><i className="fas fa-project-diagram"></i> DAGHub</div>
                            <div className="skill-tag"><i className="fab fa-git-alt"></i> Git</div>
                            <div className="skill-tag"><i className="fab fa-github"></i> GitHub</div>
                            <div className="skill-tag"><i className="fab fa-js"></i> JavaScript</div>
                            <div className="skill-tag"><i className="fas fa-server"></i> SOAP / REST APIs</div>
                            <div className="skill-tag"><i className="fas fa-envelope-open-text"></i> Postman</div>
                            <div className="skill-tag"><i className="fab fa-jira"></i> JIRA</div>
                            <div className="skill-tag"><i className="fab fa-confluence"></i> Confluence</div>
                            <div className="skill-tag"><i className="fas fa-mobile-alt"></i> Digital Payments</div>
                            <div className="skill-tag"><i className="far fa-credit-card"></i> Credit Card APIs</div>
                            {/* Duplicates for scrolling */}
                            <div className="skill-tag"><i className="fas fa-magic"></i> Generative AI</div>
                            <div className="skill-tag"><i className="fas fa-robot"></i> AI / ML</div>
                            <div className="skill-tag"><i className="fas fa-atom"></i> Data Science</div>
                            <div className="skill-tag"><i className="fas fa-brain"></i> Machine Learning</div>
                        </div>
                    </div>

                    <h3 className="skills-category-title">Functional Skills</h3>
                    <div className="skills-section-container">
                        <div className="skills-track skills-track-reverse">
                            <div className="skill-tag"><i className="fas fa-tasks"></i> Program Management</div>
                            <div className="skill-tag"><i className="fas fa-project-diagram"></i> Project Management</div>
                            <div className="skill-tag"><i className="fas fa-users"></i> Stakeholder Management</div>
                            <div className="skill-tag"><i className="fas fa-user-friends"></i> Team Management</div>
                            <div className="skill-tag"><i className="fas fa-store-alt"></i> Vendor Management</div>
                            <div className="skill-tag"><i className="fas fa-cogs"></i> System Integration</div>
                            <div className="skill-tag"><i className="fas fa-pencil-ruler"></i> Solution Design</div>
                            {/* Duplicates */}
                            <div className="skill-tag"><i className="fas fa-tasks"></i> Program Management</div>
                            <div className="skill-tag"><i className="fas fa-project-diagram"></i> Project Management</div>
                        </div>
                    </div>
                </section>

                {/* PROJECTS SECTION */}
                <section className="projects section" id="projects">
                    <h2 className="section-title">Projects</h2>
                    <span className="section-subtitle">Most recent work</span>

                    <h3 className="skills-category-title">Official Projects</h3>
                    <div className="container projects-container">
                        <div className="project-card">
                            <div className="project-img-holder">
                                <div className="project-gradient p-grad-1"></div>
                                <i className="fas fa-robot project-icon-overlay"></i>
                            </div>
                            <div className="project-content">
                                <h3 className="project-title">GenAI Conversational Bot</h3>
                                <p className="project-description">Developed a multi-modal Generative AI calling bot for Lending &
                                    Collections, optimizing customer interactions with advanced prompting.</p>
                                <div className="project-tags">
                                    <span>Gen AI</span><span>Prompt Engineering</span><span>LLMs</span><span>Guardrails</span>
                                </div>
                                <span className="project-link-span">HDFC Bank</span>
                            </div>
                        </div>

                        <div className="project-card">
                            <div className="project-img-holder">
                                <div className="project-gradient p-grad-2"></div>
                                <i className="fas fa-shield-alt project-icon-overlay"></i>
                            </div>
                            <div className="project-content">
                                <h3 className="project-title">Fraud Prevention ML</h3>
                                <p className="project-description">Led risk prevention ML initiatives, enhancing the Proactive Risk
                                    Manager (PRM) system and conducting POCs for fraud detection.</p>
                                <div className="project-tags">
                                    <span>Machine Learning</span><span>SQL</span><span>Risk</span>
                                </div>
                                <span className="project-link-span">HDFC Bank</span>
                            </div>
                        </div>

                        <div className="project-card">
                            <div className="project-img-holder">
                                <div className="project-gradient p-grad-3"></div>
                                <i className="fas fa-chart-line project-icon-overlay"></i>
                            </div>
                            <div className="project-content">
                                <h3 className="project-title">GTM Dashboards</h3>
                                <p className="project-description">Created GTM Dashboards for Marketing Team and Sales Team,
                                    ensuring Marketing and Sales strategy alignment.</p>
                                <div className="project-tags">
                                    <span>Tableau</span><span>Salesforce</span><span>Snowflake</span><span>ETL</span>
                                </div>
                                <span className="project-link-span">Highradius</span>
                            </div>
                        </div>

                        <div className="project-card">
                            <div className="project-img-holder">
                                <div className="project-gradient p-grad-2"></div>
                                <i className="fas fa-lock project-icon-overlay"></i>
                            </div>
                            <div className="project-content">
                                <h3 className="project-title">Net Banking & Mobile Banking</h3>
                                <p className="project-description">Led backend credit card core functionality with post issuance and Payments</p>
                                <div className="project-tags">
                                    <span>Net Banking</span><span>Mobile Banking</span><span>Credit Cards</span>
                                </div>
                                <span className="project-link-span">HDFC Bank</span>
                            </div>
                        </div>
                    </div>

                    <h3 className="skills-category-title">Personal Projects</h3>
                    <div className="container projects-container">
                        <div className="project-card">
                            <div className="project-img-holder">
                                <div className="project-gradient p-grad-1"></div>
                            </div>
                            <div className="project-content">
                                <h3 className="project-title">Portfolio Website</h3>
                                <p className="project-description">A personal portfolio hosted on GitHub Pages to showcase my work and skills.</p>
                                <div className="project-tags">
                                    <span>HTML</span><span>CSS</span>
                                </div>
                                <a href="#" className="project-link">
                                    Demo <i className="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                        </div>

                        <div className="project-card">
                            <div className="project-img-holder">
                                <div className="project-gradient p-grad-2"></div>
                            </div>
                            <div className="project-content">
                                <h3 className="project-title">E-Commerce App</h3>
                                <p className="project-description">A full-stack shopping platform with cart and checkout features.</p>
                                <div className="project-tags">
                                    <span>React</span><span>Node</span>
                                </div>
                                <a href="#" className="project-link">
                                    Demo <i className="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CONTACT SECTION */}
                <section className="contact section" id="contact">
                    <h2 className="section-title">Contact Me</h2>
                    <span className="section-subtitle">Get in touch</span>

                    <div className="container contact-container">
                        <div className="contact-content">
                            <h3 className="contact-header">Let's talk about everything!</h3>
                            <p className="contact-text">Don't like forms? Send me an email. 👋</p>

                            <div className="contact-info">
                                <div className="contact-card">
                                    <i className="fas fa-envelope contact-card-icon"></i>
                                    <h3 className="contact-card-title">Email</h3>
                                    <span className="contact-card-data">rishav.mishra.rkm@gmail.com</span>
                                    <a href="mailto:rishav.mishra.rkm@gmail.com" className="contact-button">Write me <i className="fas fa-arrow-right contact-button-icon"></i></a>
                                </div>

                                <div className="contact-card">
                                    <i className="fab fa-linkedin contact-card-icon"></i>
                                    <h3 className="contact-card-title">LinkedIn</h3>
                                    <span className="contact-card-data">Rishav Kumar Mishra</span>
                                    <a href="#" className="contact-button">Connect <i className="fas fa-arrow-right contact-button-icon"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="container footer-container">
                    <h1 className="footer-title">Rishav Mishra</h1>
                    <ul className="footer-list">
                        <li><a href="#about" className="footer-link">About</a></li>
                        <li><a href="#projects" className="footer-link">Projects</a></li>
                        <li><a href="#contact" className="footer-link">Contact</a></li>
                    </ul>
                    <div className="footer-social">
                        <a href="https://github.com/RishavMishraRM" className="footer-social-link" target="_blank"><i className="fab fa-github"></i></a>
                        <a href="#" className="footer-social-link"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="footer-social-link"><i className="fab fa-instagram"></i></a>
                    </div>
                    <span className="footer-copy">&#169; RishavMishraRM. All rights reserved.</span>
                </div>
            </footer>
        </>
    );
}

export default App;
