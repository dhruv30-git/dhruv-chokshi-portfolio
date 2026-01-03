// script.js
document.addEventListener('DOMContentLoaded', function() {
    // ========== LOADING SCREEN ==========
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.querySelector('.progress-bar');
    const progressPercentage = document.querySelector('.progress-percentage');
    const milestones = document.querySelectorAll('.milestone');

    const milestonePercentages = [20, 50, 70, 100];
    let currentMilestoneIndex = 0;
    let progress = 0;

    const loadingInterval = setInterval(() => {
        let increment = 0;
        
        if (progress < 20) {
            increment = Math.random() * 5 + 1;
        } else if (progress < 50) {
            increment = Math.random() * 8 + 2;
        } else if (progress < 70) {
            increment = Math.random() * 5 + 1;
        } else {
            increment = Math.random() * 3 + 0.5;
        }
        
        progress += increment;
        
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        progressPercentage.textContent = Math.floor(progress) + '%';
        
        if (currentMilestoneIndex < milestonePercentages.length) {
            const nextMilestone = milestonePercentages[currentMilestoneIndex];
            if (progress >= nextMilestone) {
                milestones[currentMilestoneIndex].classList.add('active');
                playMilestoneSound();
                currentMilestoneIndex++;
            }
        }
        
        if (Math.random() > 0.7 && progress < 90) {
            createBinaryDigit();
        }
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            
            milestones.forEach(milestone => milestone.classList.add('active'));
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                initializePage();
            }, 800);
        }
    }, 100);

    function createBinaryDigit() {
        const binaryBg = document.querySelector('.binary-background') || createBinaryBackground();
        const digit = document.createElement('div');
        digit.className = 'binary-digit';
        digit.textContent = Math.random() > 0.5 ? '1' : '0';
        digit.style.left = Math.random() * 100 + 'vw';
        digit.style.animationDuration = (Math.random() * 5 + 3) + 's';
        digit.style.opacity = Math.random() * 0.2 + 0.05;
        digit.style.fontSize = (Math.random() * 0.8 + 0.8) + 'rem';
        
        binaryBg.appendChild(digit);
        
        setTimeout(() => {
            digit.remove();
        }, 8000);
    }

    function createBinaryBackground() {
        const bg = document.createElement('div');
        bg.className = 'binary-background';
        loadingScreen.appendChild(bg);
        return bg;
    }

    function playMilestoneSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800 + (currentMilestoneIndex * 200);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    setInterval(() => {
        const glitchTexts = document.querySelectorAll('.glitch-text');
        glitchTexts.forEach(text => {
            if (Math.random() > 0.7) {
                text.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
                setTimeout(() => {
                    text.style.filter = '';
                }, 100);
            }
        });
    }, 300);

    // ========== MOBILE NAVIGATION ==========
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Hamburger click
    hamburger.addEventListener('click', toggleMobileMenu);

    // Overlay click
    navOverlay.addEventListener('click', closeMobileMenu);

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
            
            // Smooth scroll to section
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========== INITIALIZE PAGE ==========
    function initializePage() {
        initializeFlipCards();
        setupButtonHandlers();
        setupScrollEffects();
        setupEducationTabs();
        setupVideoFallback();
        
        // Close mobile menu on window resize if it's open
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // ========== FLIP CARDS ==========
    function initializeFlipCards() {
        const flipCards = document.querySelectorAll('.flip-card');
        
        flipCards.forEach(card => {
            // Click for desktop
            card.addEventListener('click', function(e) {
                // Don't flip if clicking a button inside
                if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                    return;
                }
                this.querySelector('.flip-card-inner').classList.toggle('flipped');
            });
            
            // Touch for mobile
            card.addEventListener('touchstart', function(e) {
                if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                    return;
                }
                this.querySelector('.flip-card-inner').classList.toggle('flipped');
            }, { passive: true });
        });
    }

    // ========== EDUCATION TABS ==========
    function setupEducationTabs() {
        const tabs = document.querySelectorAll('.tab');
        
        tabs.forEach(tab => {
            const header = tab.querySelector('.tab-header');
            
            header.addEventListener('click', () => {
                tabs.forEach(t => {
                    t.classList.remove('active');
                });
                tab.classList.add('active');
            });
        });
    }

    // ========== BUTTON HANDLERS ==========
    function setupButtonHandlers() {
        // View Presentation button
        const viewPresentationBtn = document.getElementById('view-presentation-btn');
        if (viewPresentationBtn) {
            viewPresentationBtn.addEventListener('click', function() {
                alert('Presentation will be available for viewing soon!');
            });
        }
        
        // Download PPT button
        const downloadPPTBtn = document.getElementById('download-ppt-btn');
        if (downloadPPTBtn) {
            downloadPPTBtn.addEventListener('click', function() {
                alert('PPT file will be available for download soon!');
            });
        }
        
        // Download Resume button
        const downloadResumeBtn = document.getElementById('download-resume-btn');
        if (downloadResumeBtn) {
            downloadResumeBtn.addEventListener('click', function() {
                alert('Resume PDF will be available for download soon!');
            });
        }
    }

    // ========== SCROLL EFFECTS ==========
    function setupScrollEffects() {
        // Sticky navbar on scroll
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            
            if (window.scrollY > 100) {
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
            }
            
            updateActiveNavLink();
        });
    }

    // Update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== VIDEO FALLBACK ==========
    function setupVideoFallback() {
        const video = document.querySelector('.cyber-video');
        
        if (video) {
            video.load();
            
            video.addEventListener('loadeddata', function() {
                console.log('Video loaded successfully');
            });
            
            video.addEventListener('error', function() {
                console.log('Video failed to load, using fallback background');
                const heroSection = document.querySelector('.hero');
                heroSection.style.background = 'linear-gradient(135deg, #0a192f, #112240)';
                heroSection.style.backgroundImage = 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")';
                heroSection.style.backgroundSize = 'cover';
                heroSection.style.backgroundPosition = 'center';
            });
            
            video.addEventListener('canplay', function() {
                video.play().catch(function(error) {
                    console.log('Video autoplay prevented:', error);
                    
                    const playButton = document.createElement('button');
                    playButton.innerHTML = '<i class="fas fa-play"></i> Play Background';
                    playButton.className = 'video-play-btn';
                    playButton.style.position = 'absolute';
                    playButton.style.bottom = '20px';
                    playButton.style.right = '20px';
                    playButton.style.zIndex = '4';
                    playButton.style.padding = '10px 20px';
                    playButton.style.background = 'var(--accent)';
                    playButton.style.color = 'white';
                    playButton.style.border = 'none';
                    playButton.style.borderRadius = '5px';
                    playButton.style.cursor = 'pointer';
                    
                    playButton.addEventListener('click', function() {
                        video.play();
                        playButton.style.display = 'none';
                    });
                    
                    document.querySelector('.hero').appendChild(playButton);
                });
            });
        }
    }

    // ========== INITIALIZE PAGE AFTER LOADING ==========
    // This will be called when loading is complete
    window.initializePage = initializePage;
});