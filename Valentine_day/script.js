// Valentine Website Script - Interactive Logic

// DOM Elements
const container = document.querySelector('.container');
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const celebrationEl = document.getElementById('celebration');
const typingTextEl = document.getElementById('typing-text');

// Create floating hearts
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
  heart.style.animationDelay = Math.random() * 2 + 's';
  heart.style.animationName = 'float';
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

// Generate hearts periodically
setInterval(createHeart, 300);

// Background music (using free romantic music CDN, autoplay with user gesture fallback)
const music = new Audio('assets/music.mp3');
music.loop = true;
music.volume = 0.3;

// Unlock music on first interaction ANYWHERE
let musicUnlocked = false;
async function unlockMusic(e) {
  if (!musicUnlocked) {
    try {
      await music.play();
      musicUnlocked = true;
      // Once successfully played, we can remove the listeners
      document.removeEventListener('click', unlockMusic);
      document.removeEventListener('touchstart', unlockMusic);
    } catch (err) {
      console.log('Autoplay prevented on this interaction:', err);
      // Do not set musicUnlocked to true here, so it tries again on the next click/touch
    }
  }
}

// Ensure audio plays on any first touch or click
// Removed { once: true } so it keeps trying until successful
document.addEventListener('click', unlockMusic);
document.addEventListener('touchstart', unlockMusic);

// No button run away logic (Bounded and Mobile Friendly)
let noClickCount = 0;

function moveNoBtn(isActualClick = false) {
  if (isActualClick) {
    noClickCount++;
    if (noClickCount >= 3) {
      alert("tym anh đau đấy bé hãy chọn lại đi 😢");
      noClickCount = 0; // Reset after showing
    }
  }

  // Escape the container context to avoid transform/backdrop-filter containing block issues
  if (noBtn.parentElement !== document.body) {
    const rect = noBtn.getBoundingClientRect();
    
    // Append to body so `position: fixed` acts truly relative to the screen viewport
    document.body.appendChild(noBtn);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = rect.left + 'px';
    noBtn.style.top = rect.top + 'px';
    noBtn.style.zIndex = '999'; // Ensure it stays on top
    
    // Small delay to allow element to render at new place before jumping
    setTimeout(jump, 50);
    return;
  }
  jump();
}

function jump() {
  // Use clientWidth/Height of documentElement for better mobile reliability
  const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
  const viewportHeight = document.documentElement.clientHeight || window.innerHeight;
  
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;
  
  // Keep padding from viewport edges so it is comfortably clickable
  const padding = 20;
  
  // Max valid coordinates
  const maxX = Math.max(padding, viewportWidth - btnWidth - padding);
  const maxY = Math.max(padding, viewportHeight - btnHeight - padding);
  
  // Get current position safely
  const currentX = parseInt(noBtn.style.left || 0);
  const currentY = parseInt(noBtn.style.top || 0);

  let randomX, randomY;
  let attempts = 0;
  
  // Force it to jump at least a reasonable distance away
  do {
    randomX = padding + Math.floor(Math.random() * (maxX - padding + 1));
    randomY = padding + Math.floor(Math.random() * (maxY - padding + 1));
    attempts++;
  } while (attempts < 20 && Math.abs(randomX - currentX) < 100 && Math.abs(randomY - currentY) < 100);
  
  noBtn.style.left = randomX + 'px';
  noBtn.style.top = randomY + 'px';
}

// Mobile touch to evade BEFORE a click can register
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault(); // Stop touch from becoming a click
  moveNoBtn(false); 
});

// Desktop hover to evade
noBtn.addEventListener('mouseenter', () => moveNoBtn(false));

// If they somehow manage to click it (keyboard focus, super fast tap)
noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  moveNoBtn(true);
});

// Typing effect logic
const messageToType = "Anh thương Bé Nấm rất nhiều!\nCảm ơn em đã luôn ở bên anh.";
let charIndex = 0;

function typeMessage() {
  if (charIndex < messageToType.length) {
    typingTextEl.innerHTML += messageToType.charAt(charIndex);
    charIndex++;
    setTimeout(typeMessage, 80);
  } else {
    // Remove cursor blinking when done typing
    typingTextEl.style.animation = 'none';
    typingTextEl.style.borderRight = 'transparent';
  }
}

yesBtn.addEventListener('click', () => {
  unlockMusic();
  
  // Hide container
  container.classList.add('hidden');
  
  // Explictly hide noBtn since it might have been moved outside the container to the document body!
  noBtn.classList.add('hidden');
  
  // Show celebration overlay
  celebrationEl.classList.remove('hidden');
  
  // Trigger Canvas Confetti
  if (typeof confetti === 'function') {
    var end = Date.now() + (3 * 1000);
    var colors = ['#ff4b82', '#ff7e9e', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
  
  // Start typing effect
  typeMessage();
});

// Initial fade-ins
window.addEventListener('load', () => {
  // Generate some initial hearts instantly
  for(let i=0; i<5; i++) {
    createHeart();
  }
});
