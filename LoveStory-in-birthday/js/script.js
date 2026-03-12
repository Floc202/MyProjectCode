// Image list from images/ folder (easy to reorder/change names)
const images = [
    'image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg',
    'image6.jpg', 'image7.jpg', 'image8.jpg', 'image9.jpg', 'image10.jpg',
    'image11.jpg', 'image12.jpg', 'image13.jpg', 'image14.jpg', 'image15.jpg',
    'IMG_1754230676138_1754231534901.jpg',
    'IMG_20251210_000907.jpg',
    'IMG_20251210_001000.jpg',
    'IMG_20260116_191808.jpg',
    'IMG_UPLOAD_20250808_230844.jpg',
    'IMG_UPLOAD_20250831_194435.jpg',
    'Screenshot_2026-02-11-23-50-52-706_com.miui.videoplayer.jpg',
    '6903352006516.mp4',
    '7057c4b3b8dbc98cb92062833b27a6b4.mp4',
    '7109923122685.mp4',
    'VA.mp4',
    'VIDEO_DOWNLOAD_1750693503054_1750711136053.mp4',
    'VIDEO_DOWNLOAD_1750693756166_1750711146492.mp4',
    'VIDEO_DOWNLOAD_1750739149655_1750739177141.mp4',
    'VIDEO_DOWNLOAD_1773256758092_1773256791088.mp4',
    'VIDEO_DOWNLOAD_1773256758127_1773256793367.mp4'
];

const startDate = new Date('2025-07-15');
const audioBg = new Audio('music/background-music.mp3');
const audioBirthday = new Audio('music/happy-birthday.mp3');
audioBg.loop = true;
audioBg.volume = 0.3;
audioBirthday.volume = 0.5;

let currentPage = 1;
let heartsInterval = null;

// Typed.js instances — lazy initialized so they only run when the page is shown
let welcomeTyped = null;
let letterTyped = null;

// ─── Preloader ───────────────────────────────────────────────────────────────
const preloader = document.getElementById('preloader');
let loadedCount = 0;
const imagePaths = images.map(img => `images/${img}`);

function loadAssets() {
    imagePaths.forEach(src => {
        const img = new Image();
        img.onload = () => { loadedCount++; checkComplete(); };
        img.onerror = () => { loadedCount++; checkComplete(); }; // count errors too
        img.src = src;
    });

    audioBg.load();
    audioBirthday.load();

    // Fallback: hide preloader after 5s regardless
    setTimeout(() => {
        if (preloader.style.display !== 'none') hidePreloader();
    }, 5000);
}

function checkComplete() {
    if (loadedCount >= imagePaths.length) hidePreloader();
}

function hidePreloader() {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.style.display = 'none', 500);
}

loadAssets();

// ─── Day counter ─────────────────────────────────────────────────────────────
function updateDayCounter() {
    const today = new Date();
    const days = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    // Animate counter 0 → days
    let count = 0;
    const el = document.getElementById('day-counter');
    const el2 = document.getElementById('day-count-text');
    const step = Math.ceil(days / 60);
    const interval = setInterval(() => {
        count = Math.min(count + step, days);
        el.textContent = count;
        if (el2) el2.textContent = days;
        if (count >= days) clearInterval(interval);
    }, 30);
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
function createGallery() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    images.forEach(img => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        const isVideo = img.toLowerCase().endsWith('.mp4');
        
        if (isVideo) {
            div.innerHTML = `<video src="images/${img}" muted loop autoplay playsinline></video>`;
            div.querySelector('video').addEventListener('click', function () {
                openLightbox(this.src, true);
            });
        } else {
            div.innerHTML = `<img src="images/${img}" alt="Bé Nấm" loading="lazy">`;
            div.querySelector('img').addEventListener('click', function () {
                openLightbox(this.src, false);
            });
        }
        gallery.appendChild(div);
    });
}
createGallery();

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function openLightbox(src, isVideo = false) {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:1001;cursor:pointer;';
    
    let contentHtml = '';
    if (isVideo) {
        contentHtml = `<video src="${src}" controls autoplay style="max-width:90%;max-height:90%;border-radius:10px;box-shadow:0 0 30px rgba(255,105,180,0.5);"></video>`;
    } else {
        contentHtml = `<img src="${src}" style="max-width:90%;max-height:90%;border-radius:10px;box-shadow:0 0 30px rgba(255,105,180,0.5);">`;
    }
    
    modal.innerHTML = `${contentHtml}
        <span style="position:absolute;top:20px;right:25px;font-size:40px;color:white;cursor:pointer;line-height:1;">&times;</span>`;
    modal.addEventListener('click', (e) => {
        if (e.target.tagName !== 'VIDEO') modal.remove();
    });
    document.body.appendChild(modal);
}

// ─── Page navigation ─────────────────────────────────────────────────────────
const pages = document.querySelectorAll('.page');

function showPage(n) {
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(`page${n}`).classList.add('active');
    currentPage = n;
    AOS.refresh();

    // Lazy-init Typed instances when their page becomes active
    if (n === 2) {
        updateDayCounter();
    }
    if (n === 6 && !letterTyped) {
        letterTyped = new Typed('#letter-text', {
            strings: ['Bé Nấm à,^1000<br><br>Anh cũng không ngờ là tụi mình đã đi cùng nhau được <strong>' + getDays() + ' ngày</strong> rồi.^1000<br><br>Trong khoảng thời gian đó, có những ngày rất vui, có những lúc buồn,^800<br>có lúc tụi mình hiểu nhau rất nhiều, cũng có lúc chưa hiểu nhau đủ.^1000<br><br>Nhưng dù thế nào đi nữa, anh vẫn rất biết ơn vì trong quãng thời gian đó luôn có bé ở bên cạnh anh.^1000<br><br>Có thể anh không phải là người hoàn hảo,^800<br>nhưng anh thật sự trân trọng từng ngày có bé trong cuộc sống của mình.^1000<br><br>Anh hy vọng rằng sau ' + getDays() + ' ngày này,^800<br>tụi mình vẫn sẽ tiếp tục đi cùng nhau thêm thật nhiều ngày nữa.^1000<br><br>Và hôm nay, trong ngày đặc biệt này…^1000<br>anh chỉ muốn nói rằng:^1000<br><br><strong>Happy Birthday Bé Nấm 🎂</strong>'],
            typeSpeed: 40,
            startDelay: 500,
            showCursor: false,
            contentType: 'html'
        });
    }
}

function getDays() {
    return Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24));
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.prev').forEach(btn => {
        btn.addEventListener('click', () => showPage(Math.max(1, currentPage - 1)));
    });
    document.querySelectorAll('.next').forEach(btn => {
        btn.addEventListener('click', () => showPage(Math.min(7, currentPage + 1)));
    });
});

// ─── Start button ─────────────────────────────────────────────────────────────
document.getElementById('start-btn').addEventListener('click', () => {
    audioBg.play().catch(() => {}); // catch autoplay policy errors gracefully
    createFloatingHearts();
    showPage(2);
});

// Start welcome typing immediately on page load (page 1 is active from the start)
if (!welcomeTyped) {
    welcomeTyped = new Typed('#welcome-text', {
        strings: ['Hôm nay là một ngày đặc biệt.^1000 Vì hôm nay là ngày Bé Nấm được sinh ra.^1000 Trước khi tới quà sinh nhật...^1000 anh muốn bé xem lại hành trình của tụi mình.'],
        typeSpeed: 50,
        loop: false,
        showCursor: true
    });
}

// ─── Birthday surprise ────────────────────────────────────────────────────────
document.getElementById('birthday-btn').addEventListener('click', () => {
    audioBg.pause();
    audioBirthday.play().catch(() => {});
    fireworks();
    const msg = document.getElementById('birthday-msg');
    msg.style.display = 'block';
    msg.style.animation = 'none';
    msg.offsetHeight; // reflow
    msg.style.animation = '';
    document.getElementById('birthday-btn').style.display = 'none';
});

function fireworks() {
    const duration = 3000;
    const end = Date.now() + duration;
    (function frame() {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ff69b4', '#e9ddff', '#ffd6e7'] });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ff69b4', '#e9ddff', '#ffd6e7'] });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();
}

// ─── Replay ───────────────────────────────────────────────────────────────────
function replay() {
    // Stop birthday music, restart bg music
    audioBirthday.pause();
    audioBirthday.currentTime = 0;

    // Re-show the birthday button and hide message
    document.getElementById('birthday-btn').style.display = '';
    document.getElementById('birthday-msg').style.display = 'none';

    // Destroy and re-init Typed instances so they replay cleanly
    if (welcomeTyped) { welcomeTyped.destroy(); welcomeTyped = null; }
    if (letterTyped) { letterTyped.destroy(); letterTyped = null; }
    document.getElementById('welcome-text').innerHTML = '';
    document.getElementById('letter-text').innerHTML = '';

    // Restart welcome typing on page 1
    welcomeTyped = new Typed('#welcome-text', {
        strings: ['Hôm nay là một ngày đặc biệt.^1000 Vì hôm nay là ngày Bé Nấm được sinh ra.^1000 Trước khi tới quà sinh nhật...^1000 anh muốn bé xem lại hành trình của tụi mình.'],
        typeSpeed: 50,
        loop: false,
        showCursor: true
    });

    showPage(1);
}

// ─── Floating hearts ──────────────────────────────────────────────────────────
function createFloatingHearts() {
    if (heartsInterval) return; // Only create once
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'floating-hearts';
    document.body.appendChild(heartsContainer); // Attach to body so it's always visible
    heartsInterval = setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }, 400);
}

// ─── Init AOS ─────────────────────────────────────────────────────────────────
AOS.init({
    duration: 1000,
    once: true
});
