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
let mysteryTyped = null;
let birthdayLetterTyped = null;
let isFadingAudio = false;
let isReplaying = false;

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
    
    // Smooth reset scroll position when switching page
    document.getElementById(`page${n}`).scrollTop = 0;
    
    // Give DOM time to reflow, then trigger AOS refresh
    setTimeout(() => {
        AOS.refresh();
    }, 100);

    // Lazy-init Typed instances when their page becomes active
    if (n === 2) {
        updateDayCounter();
    }
    if (n === 6 && !letterTyped) {
        letterTyped = new Typed('#letter-text', {
            strings: ['Bé Nấm à,^600<br><br>Anh cũng không ngờ là tụi mình đã đi cùng nhau được <strong>' + getDays() + ' ngày</strong> rồi.^600<br><br>Trong khoảng thời gian đó, có những ngày rất vui, có những lúc buồn,^400<br>có lúc tụi mình hiểu nhau rất nhiều, cũng có lúc chưa hiểu nhau đủ.^600<br><br>Nhưng dù thế nào đi nữa, anh vẫn rất biết ơn vì trong quãng thời gian đó luôn có bé ở bên cạnh anh.^600<br><br>Có thể anh không phải là người hoàn hảo,^400<br>nhưng anh thật sự trân trọng từng ngày có bé trong cuộc sống của mình.^600<br><br>Anh hy vọng rằng sau ' + getDays() + ' ngày này,^400<br>tụi mình vẫn sẽ tiếp tục đi cùng nhau thêm thật nhiều ngày nữa.^600<br><br>Và hôm nay, trong ngày đặc biệt này…^600<br>anh chỉ muốn nói rằng:^600<br><br><strong>Happy Birthday Bé Nấm 🎂</strong>'],
            typeSpeed: isReplaying ? 0 : 25,
            startDelay: isReplaying ? 0 : 500,
            showCursor: false,
            contentType: 'html',
            onComplete: () => {
                const nav = document.getElementById('nav-page6');
                if (nav) nav.style.display = 'flex';
            }
        });
        
        // Show nav immediately if replaying
        if (isReplaying) {
            const nav = document.getElementById('nav-page6');
            if (nav) nav.style.display = 'flex';
        }
    }
    if (n === 7) {
        playMysterySequence();
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

    // Handle AOS on scroll inside the `.page` containers
    document.querySelectorAll('.page').forEach(page => {
        page.addEventListener('scroll', () => AOS.refresh());
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
        typeSpeed: isReplaying ? 0 : 50,
        loop: false,
        showCursor: true,
        onComplete: () => {
            const btn = document.getElementById('start-btn');
            if (btn) btn.style.display = 'inline-block';
        }
    });

    if (isReplaying) {
        const btn = document.getElementById('start-btn');
        if (btn) btn.style.display = 'inline-block';
    }
}

// ─── Birthday surprise (Page 7 Logic) ─────────────────────────────────────────

function playMysterySequence() {
    // Reset stages
    document.getElementById('mystery-stage').style.display = 'block';
    document.getElementById('ritual-stage').style.display = 'none';
    document.getElementById('celebration-stage').style.display = 'none';
    document.getElementById('message-stage').style.display = 'none';
    document.getElementById('voucher-stage').style.display = 'none';
    document.getElementById('final-stage').style.display = 'none';
    
    // Clear transition classes
    const msgStage = document.getElementById('message-stage');
    const voucherStage = document.getElementById('voucher-stage');
    const nav7 = document.getElementById('nav-page7');
    if (msgStage) msgStage.classList.remove('fade-out-down');
    if (voucherStage) voucherStage.classList.remove('fade-out-down');
    if (nav7) nav7.classList.remove('fade-out-down', 'visible');
    if (nav7) nav7.style.display = 'none';
    
    const finalMsg = document.getElementById('finalMessage');
    if(finalMsg) finalMsg.style.opacity = '0';
    
    const nav7Final = document.getElementById('nav-page7-final');
    if(nav7Final) {
        nav7Final.classList.remove('visible');
        nav7Final.style.display = 'none';
    }
    
    if(rainInterval) clearInterval(rainInterval);
    document.getElementById('wishRainContainer').innerHTML = '';
    
    // Reset voucher card flips and tracks
    flippedCardsSet.clear();
    
    document.getElementById('giftBox').style.display = 'none';
    document.getElementById('giftBox').classList.remove('disabled', 'shake');
    
    document.getElementById('candleFlame').style.display = 'block'; // Reset flame
    document.getElementById('candle').classList.remove('disabled');
    
    // Remove old smoke if exists
    const oldSmoke = document.querySelector('.smoke');
    if (oldSmoke) oldSmoke.remove();

    document.getElementById('vouchers-stack').classList.remove('spread');
    document.getElementById('showVouchersBtn').style.display = 'none';
    
    document.getElementById('giftText').innerHTML = '';
    document.getElementById('birthdayLetter').innerHTML = '';

    // Destroy old Typed instances
    if (mysteryTyped) mysteryTyped.destroy();
    if (birthdayLetterTyped) birthdayLetterTyped.destroy();
    
    // Reset voucher card transforms
    document.querySelectorAll('.voucher-card .card-inner').forEach(inner => {
        inner.style.transform = 'rotateY(0deg)';
    });

    const typeSpeed = isReplaying ? 0 : 50;
    const strings = isReplaying 
        ? ['Bé Nấm ơi...<br>Anh có một món quà nhỏ cho bé.<br>Chạm vào hộp quà để mở nhé 🎁'] 
        : ['Bé Nấm ơi...^1000', 'Anh có một món quà nhỏ cho bé.^1000', 'Chạm vào hộp quà để mở nhé 🎁'];

    // Stage 1 - Mystery (Wait 1s before typing)
    setTimeout(() => {
        mysteryTyped = new Typed('#giftText', {
            strings: strings,
            typeSpeed: typeSpeed,
            showCursor: false,
            onComplete: () => {
                const giftBox = document.getElementById('giftBox');
                giftBox.style.display = 'inline-block';
                giftBox.style.opacity = 0;
                
                // Fade in gift box smooth over 1s
                let opacity = 0;
                const fadeIn = setInterval(() => {
                    opacity += 0.05;
                    giftBox.style.opacity = Math.min(opacity, 1);
                    if (opacity >= 1) {
                        clearInterval(fadeIn);
                        giftBox.classList.add('shake');
                        giftBox.onclick = handleGiftClick;
                    }
                }, 50);
            }
        });
    }, isReplaying ? 0 : 1000);
}

function createParticles() {
    const stage = document.getElementById('mystery-stage');
    if (!stage) return;
    
    // Get gift box rect for center origin
    const giftBox = document.getElementById('giftBox');
    const rect = giftBox.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create 30 pink particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'custom-particle';
        
        // Random angle & distance
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        // Start center
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        
        // Setup CSS transition for fly out
        particle.style.transition = 'transform 0.6s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.6s ease';
        stage.appendChild(particle);
        
        // Give browser frame to apply initial CSS, then explode
        requestAnimationFrame(() => {
            particle.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
            particle.style.opacity = '0';
        });
        
        setTimeout(() => particle.remove(), 600);
    }
}

function handleGiftClick() {
    const giftBox = document.getElementById('giftBox');
    if (giftBox.classList.contains('disabled')) return;
    giftBox.classList.add('disabled');
    
    // Stage 2: Ritual (Cake)
    giftBox.classList.remove('shake');
    
    // 1. Custom Particle burst
    createParticles();
    
    // 2 & 3. Fade out gift box, show cake
    giftBox.style.opacity = '0';
    giftBox.style.transition = 'opacity 0.5s ease';
    
    // Also reset cake styles completely
    const cake = document.getElementById('birthdayCake');
    cake.classList.remove('blur-bg');
    
    setTimeout(() => {
        document.getElementById('mystery-stage').style.display = 'none';
        giftBox.style.opacity = '1'; // reset for later
        
        // Show prompt
        const prompt = document.getElementById('candlePrompt');
        if (prompt) prompt.style.display = 'block';
        
        document.getElementById('ritual-stage').style.display = 'block';
        
        // Setup candle click
        const candle = document.getElementById('candle');
        candle.onclick = handleCandleClick;
    }, 500);
}

function handleCandleClick() {
    const candle = document.getElementById('candle');
    if (candle.classList.contains('disabled')) return;
    candle.classList.add('disabled');

    // 1. Delay 200ms
    setTimeout(() => {
        // 2. Remove flame
        document.getElementById('candleFlame').style.display = 'none';
        const prompt = document.getElementById('candlePrompt');
        if (prompt) prompt.style.display = 'none';
        
        // 3. Show smoke animation SVG
        const smoke = document.createElement('div');
        smoke.className = 'smoke-container';
        smoke.innerHTML = `
            <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                <path d="M 50 150 Q 20 100 50 50 T 50 0" stroke="rgba(255,255,255,0.6)" stroke-width="8" fill="none" class="smoke-path"/>
            </svg>`;
        candle.appendChild(smoke);
        
        // Audio transition
        transitionAudio();
        
        // Start Celebration flash & fireworks
        setTimeout(startCelebration, 1500); // 1.5s delay to let smoke rise
    }, 200);
}

function transitionAudio() {
    if (isFadingAudio) return;
    isFadingAudio = true;
    
    let vol = audioBg.volume;
    const fadeOut = setInterval(() => {
        if (vol > 0.05) {
            vol -= 0.05;
            audioBg.volume = Math.max(0, vol);
        } else {
            clearInterval(fadeOut);
            audioBg.pause();
            
            // Fade in birthday audio over 2 seconds
            audioBirthday.volume = 0;
            audioBirthday.play().catch(() => {});
            let volIn = 0;
            const fadeIn = setInterval(() => {
                if (volIn < 0.5) {
                    volIn += 0.025; // Slower fade in (approx 2s total)
                    audioBirthday.volume = Math.min(volIn, 0.5);
                } else {
                    clearInterval(fadeIn);
                    isFadingAudio = false;
                }
            }, 100);
        }
    }, 100);
}

function startCelebration() {
    // Stage 3: Celebration Flash
    const overlay = document.getElementById('overlay');
    overlay.classList.add('flash');
    
    // Fade cake into blurred bg
    const cake = document.getElementById('birthdayCake');
    cake.classList.add('blur-bg');
    
    // Quick flash out
    setTimeout(() => {
        overlay.classList.remove('flash');
        
        document.getElementById('celebration-stage').style.display = 'block';
        fireworks();
        
        setTimeout(() => {
            document.getElementById('message-stage').style.display = 'block';
            
            const typeSpeed = isReplaying ? 0 : 25;
            
            // Stage 4: Birthday Message
            birthdayLetterTyped = new Typed('#birthdayLetter', {
                strings: ['Chúc mừng sinh nhật Bé Nấm của anh 🎂^600<br><br>Cảm ơn bé vì 251 ngày vừa qua đã luôn ở bên cạnh anh.^600<br><br>Anh hy vọng chúng mình sẽ còn thật nhiều lần 251 ngày như thế nữa.'],
                typeSpeed: typeSpeed,
                showCursor: false,
                contentType: 'html',
                onComplete: () => {
                    document.getElementById('showVouchersBtn').style.display = 'inline-block';
                }
            });
        }, 1500); // Wait for fireworks to settle a bit
    }, 200); // 0.2s flash
}

function fireworks() {
    const duration = 3000;
    const end = Date.now() + duration;
    
    // Wave 1: center
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#ff69b4', '#e9ddff', '#ffd6e7'] });
    
    (function frame() {
        // Wave 2 & 3: diagonals
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, colors: ['#ff69b4', '#e9ddff', '#ffd6e7'] });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, colors: ['#ff69b4', '#e9ddff', '#ffd6e7'] });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();
}

document.getElementById('showVouchersBtn').addEventListener('click', function() {
    this.style.display = 'none';
    const stage = document.getElementById('voucher-stage');
    stage.style.display = 'block';
    const stack = document.getElementById('vouchers-stack');
    
    // Initial fly-in exactly stacked
    stack.classList.add('fly-in');
    
    // Wait out the fly-in (0.8s) + a small delay (0.5s overall requested) -> Fan out
    setTimeout(() => {
        stack.classList.add('spread');
        // Removed the nav7 replay button logic here since we show it at the final stage now.
    }, 500);
});

// Mảng chứa danh sách các câu chúc lãng mạn
const wishList = [
    "Thương bé nhất trên đời!", "Bé Nấm của anh giỏi nhất.", "Đừng dỗi anh nữa nhé ❤️",
    "Công chúa nhỏ của anh.", "Bé Nấm cute x1000 lần.", "Muốn ôm bé ngay lúc này...",
    "Ngoan anh thương nhé!", "Em là đồ đáng yêu!", "Yêu em hơn cả lời nói.",
    "Mãi bên nhau như thế này nhé.", "Em là cả thế giới của anh.", "Gặp được em là điều may mắn nhất.",
    "Trái tim này chỉ dành cho em.", "Hạnh phúc là khi có em bên cạnh.", "Cùng nhau đi hết cuộc đời nhé.",
    "Nơi nào có em, nơi đó là nhà.", "Tuổi mới thật rực rỡ nhé em!", "Luôn mỉm cười như thế này nhé.",
    "Mọi điều tốt lành nhất sẽ đến với em.", "Anh sẽ luôn ở phía sau ủng hộ em.", 
    "Yêu em của tuổi 20, 30 và mãi mãi.", "Chúc mừng sinh nhật, My Love ❤️",
    "Cảm ơn em vì đã chọn anh.", "251 ngày và hàng vạn ngày sau nữa..."
];

// Flip voucher cards
const flippedCardsSet = new Set();
let isFinalStageTriggered = false;

document.querySelectorAll('.voucher-card').forEach(card => {
    card.addEventListener('click', function() {
        if (document.getElementById('vouchers-stack').classList.contains('spread') && !isFinalStageTriggered) {
            const inner = this.querySelector('.card-inner');
            const cardIndex = this.style.getPropertyValue('--i');
            
            if (inner.style.transform === 'rotateY(180deg)') {
                inner.style.transform = 'rotateY(0deg)';
                flippedCardsSet.delete(cardIndex);
            } else {
                inner.style.transform = 'rotateY(180deg)';
                flippedCardsSet.add(cardIndex);
                
                // CHeck if all 5 cards are flipped
                if (flippedCardsSet.size === 5) {
                    isFinalStageTriggered = true;
                    // Chờ 1.5 giây để Bé Nấm đọc nội dung
                    setTimeout(triggerFinalStage, 1500);
                }
            }
        }
    });
});

let rainInterval = null;

function triggerFinalStage() {
    // 1. Transition Logic: Fade out message, vouchers, and nav
    document.getElementById('message-stage').classList.add('fade-out-down');
    document.getElementById('voucher-stage').classList.add('fade-out-down');
    
    // 2. The Wish Rain
    // Tăng volume maximum (70% thay vì 100%)
    let vol = audioBirthday.volume;
    const volUpInterval = setInterval(() => {
        if (vol < 0.7) {
            vol += 0.05;
            audioBirthday.volume = Math.min(vol, 0.7);
        } else {
            clearInterval(volUpInterval);
        }
    }, 100);
    
    // Bắt đầu mưa sao / tim
    document.getElementById('final-stage').style.display = 'flex';
    const rainContainer = document.getElementById('wishRainContainer');
    
    rainInterval = setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'wish-particle';
        particle.innerHTML = Math.random() > 0.5 ? '❤️' : '⭐';
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        // Random opacity 0.3 to 0.8
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        // Random duration between 3s and 6s
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        rainContainer.appendChild(particle);
        
        // Remove after animation completes
        setTimeout(() => particle.remove(), 6000);
    }, 300); // Tốc độ tạo hạt mưa
    
    // 4. The Final Message
    setTimeout(() => {
        document.getElementById('finalMessage').style.opacity = '1';
        
        // Hiển thị nút Replay tinh tế sau khi text hiện
        setTimeout(() => {
            const navFinal = document.getElementById('nav-page7-final');
            if(navFinal) {
                navFinal.style.display = 'flex';
                // Trigger reflow
                void navFinal.offsetWidth;
                navFinal.classList.add('visible');
            }
        }, 2000);
    }, 3000);
}

// 3. Touch interaction (Touch & Click)
let lastTouchTime = 0;

function handleTouchSparks(e) {
    if (!isFinalStageTriggered) return; // Only apply during final stage
    
    // Prevent double firing on mobile where touchstart and mousedown both fire
    const now = Date.now();
    if (now - lastTouchTime < 100) return;
    lastTouchTime = now;
    
    // Get coordinates support touch or click
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }
    
    // Create random message Spark
    const spark = document.createElement('div');
    spark.className = 'touch-message';
    spark.style.left = clientX + 'px';
    spark.style.top = clientY + 'px';
    
    const icon = Math.random() > 0.5 ? '🌸' : '❤️';
    const text = wishList[Math.floor(Math.random() * wishList.length)];
    spark.innerHTML = `<span>${icon}</span> <span>${text}</span>`;
    
    document.body.appendChild(spark);
    
    setTimeout(() => spark.remove(), 1500);
}

document.addEventListener('mousedown', handleTouchSparks);
document.addEventListener('touchstart', handleTouchSparks, {passive: true});

// ─── Replay ───────────────────────────────────────────────────────────────────
function replay() {
    isReplaying = true;
    
    // Hide nav buttons again
    const startBtn = document.getElementById('start-btn');
    if(startBtn) startBtn.style.display = 'none';
    const nav6 = document.getElementById('nav-page6');
    if(nav6) nav6.style.display = 'none';
    
    isFinalStageTriggered = false;

    audioBirthday.pause();
    audioBirthday.currentTime = 0;
    audioBg.volume = 0.3;
    audioBg.play().catch(() => {});
    isFadingAudio = false;

    if (welcomeTyped) { welcomeTyped.destroy(); welcomeTyped = null; }
    if (letterTyped) { letterTyped.destroy(); letterTyped = null; }
    if (mysteryTyped) { mysteryTyped.destroy(); mysteryTyped = null; }
    if (birthdayLetterTyped) { birthdayLetterTyped.destroy(); birthdayLetterTyped = null; }
    
    document.getElementById('welcome-text').innerHTML = '';
    document.getElementById('letter-text').innerHTML = '';

    // Reset Page 7 specific displays to ensure clean entering on future visits
    if (document.getElementById('page7')) {
        document.getElementById('mystery-stage').style.display = 'block';
        document.getElementById('ritual-stage').style.display = 'none';
        document.getElementById('celebration-stage').style.display = 'none';
        document.getElementById('message-stage').style.display = 'none';
        document.getElementById('voucher-stage').style.display = 'none';
        document.getElementById('giftBox').style.display = 'none';
        document.getElementById('vouchers-stack').classList.remove('spread');
    }

    welcomeTyped = new Typed('#welcome-text', {
        strings: ['Hôm nay là một ngày đặc biệt. Vì hôm nay là ngày Bé Nấm được sinh ra. Trước khi tới quà sinh nhật... anh muốn bé xem lại hành trình của tụi mình.'],
        typeSpeed: 0,
        loop: false,
        showCursor: true,
        onComplete: () => {
            const btn = document.getElementById('start-btn');
            if (btn) btn.style.display = 'inline-block';
        }
    });
    
    const btn = document.getElementById('start-btn');
    if (btn) btn.style.display = 'inline-block';

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
