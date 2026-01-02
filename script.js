// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    // Loading Screen
// Loading Screen with Glitch Effect
// Loading Screen with Percentage Milestones
// Loading Screen with Percentage
// Loading Screen with Percentage Milestones
const loadingScreen = document.getElementById('loadingScreen');
const progressBar = document.querySelector('.progress-bar');
const progressPercentage = document.querySelector('.progress-percentage');
const milestones = document.querySelectorAll('.milestone');

// Define percentage milestones
const milestonePercentages = [20, 50, 70, 100];
let currentMilestoneIndex = 0;
let progress = 0;

const loadingInterval = setInterval(() => {
    // Increase progress with random increments
    let increment = 0;
    
    if (progress < 20) {
        increment = Math.random() * 5 + 1; // Slow at start
    } else if (progress < 50) {
        increment = Math.random() * 8 + 2; // Medium speed
    } else if (progress < 70) {
        increment = Math.random() * 5 + 1; // Slow down
    } else {
        increment = Math.random() * 3 + 0.5; // Very slow at end
    }
    
    progress += increment;
    
    // Don't exceed 100%
    if (progress > 100) progress = 100;
    
    // Update progress bar and percentage
    progressBar.style.width = progress + '%';
    progressPercentage.textContent = Math.floor(progress) + '%';
    
    // Check and activate milestones
    if (currentMilestoneIndex < milestonePercentages.length) {
        const nextMilestone = milestonePercentages[currentMilestoneIndex];
        if (progress >= nextMilestone) {
            // Activate the milestone
            milestones[currentMilestoneIndex].classList.add('active');
            
            // Play milestone sound effect (optional)
            playMilestoneSound();
            
            currentMilestoneIndex++;
        }
    }
    
    // Add some randomness to make it feel more realistic
    if (Math.random() > 0.7 && progress < 90) {
        createBinaryDigit();
    }
    
    // Complete loading when reaching 100%
    if (progress >= 100) {
        clearInterval(loadingInterval);
        
        // Ensure all milestones are active
        milestones.forEach(milestone => milestone.classList.add('active'));
        
        // Wait a moment before hiding
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            initializePage();
        }, 800);
    }
}, 100); // Update every 100ms

// Create falling binary digits
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
    
    // Remove after animation
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

// Optional: Sound effect for milestones
function playMilestoneSound() {
    // This is a simple beep sound using Web Audio API
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
        // Audio not supported or user blocked it
        console.log('Audio not supported');
    }
}

// Random glitch intensity
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
    // Initialize flip cards
    function initializeFlipCards() {
        const flipCards = document.querySelectorAll('.flip-card');
        
        flipCards.forEach(card => {
            card.addEventListener('click', function() {
                this.querySelector('.flip-card-inner').classList.toggle('flipped');
            });
            
            // Touch device support
            card.addEventListener('touchstart', function(e) {
                e.preventDefault();
                this.querySelector('.flip-card-inner').classList.toggle('flipped');
            }, { passive: false });
        });
    }
    
    // Setup button click handlers
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
    
    // Setup scroll effects
    function setupScrollEffects() {
        // Sticky navbar on scroll
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            
            if (window.scrollY > 100) {
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
            }
            
            // Update active nav link based on scroll position
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
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});
 // Education Tabs
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        const header = tab.querySelector('.tab-header');
        
        header.addEventListener('click', () => {
            // Close all tabs
            tabs.forEach(t => {
                t.classList.remove('active');
            });
            
            // Open clicked tab
            tab.classList.add('active');
        });
    });
    // Video fallback and loading
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.cyber-video');
    
    if (video) {
        // Try to load the video
        video.load();
        
        // Check if video loads successfully
        video.addEventListener('loadeddata', function() {
            console.log('Video loaded successfully');
        });
        
        // If video fails to load, add fallback background
        video.addEventListener('error', function() {
            console.log('Video failed to load, using fallback background');
            const heroSection = document.querySelector('.hero');
            heroSection.style.background = 'linear-gradient(135deg, #0a192f, #112240)';
            heroSection.style.backgroundImage = 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")';
            heroSection.style.backgroundSize = 'cover';
            heroSection.style.backgroundPosition = 'center';
        });
        
        // Play video when it's ready
        video.addEventListener('canplay', function() {
            video.play().catch(function(error) {
                console.log('Video autoplay prevented:', error);
                // Add play button for user interaction
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
});