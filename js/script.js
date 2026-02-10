document.addEventListener('DOMContentLoaded', () => {
    // === CONFIGURATION ===
    const TARGET_DAY = "4";
    const TARGET_MONTH = "4";
    const TARGET_YEAR = "2012";
    const START_DATE = new Date("2024-12-18T00:00:00");

    // === DOM ELEMENTS ===
    const loginSection = document.getElementById('login-section');
    const mainContent = document.getElementById('main-content');
    const dayInput = document.getElementById('day-input');
    const monthInput = document.getElementById('month-input');
    const yearInput = document.getElementById('year-input');
    const loginBtn = document.getElementById('login-btn');
    const errorMsg = document.getElementById('error-msg');
    const audio = document.getElementById('bg-music');
    const typewriterEl = document.getElementById('typewriter-1');
    const foreverBtn = document.getElementById('forever-btn');
    const toast = document.getElementById('toast');

    // === LOGIN LOGIC ===
    function checkLogin() {
        const d = dayInput.value.trim();
        const m = monthInput.value.trim();
        const y = yearInput.value.trim();

        // Allow checks like "4" or "04"
        const validDay = (d === "4" || d === "04");
        const validMonth = (m === "4" || m === "04");
        const validYear = (y === "2012");

        if (validDay && validMonth && validYear) {
            // Success

            // Play Audio IMMEDIATELY to avoid browser blocking
            audio.play().then(() => {
                isPlaying = true;
                if (musicBtn) musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(e => console.log("Audio play failed:", e));

            loginSection.style.opacity = '0';
            setTimeout(() => {
                loginSection.classList.add('hidden');
                loginSection.classList.remove('active');
                mainContent.classList.remove('hidden');

                // Start Main Content Animations
                setTimeout(() => {
                    mainContent.style.opacity = '1';
                    startTypewriter();
                    observeSections();
                }, 100);
            }, 1000);
        } else {
            // Error
            errorMsg.classList.remove('hidden');
            dayInput.classList.add('shake');
            monthInput.classList.add('shake');
            yearInput.classList.add('shake');
            setTimeout(() => {
                dayInput.classList.remove('shake');
                monthInput.classList.remove('shake');
                yearInput.classList.remove('shake');
            }, 500);
        }
    }

    if (loginBtn) loginBtn.addEventListener('click', checkLogin);

    // Auto-focus logic
    if (dayInput) dayInput.addEventListener('input', (e) => { if (e.target.value.length >= 2) monthInput.focus(); });
    if (monthInput) monthInput.addEventListener('input', (e) => { if (e.target.value.length >= 2) yearInput.focus(); });
    if (yearInput) yearInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') checkLogin(); });

    // === TYPEWRITER EFFECT ===
    const typeString = "في 4 أبريل، لم يكن مجرد يوم.. كان بداية العمر.";

    function startTypewriter() {
        let i = 0;
        typewriterEl.innerHTML = "";
        const interval = setInterval(() => {
            typewriterEl.innerHTML += typeString.charAt(i);
            i++;
            if (i >= typeString.length) clearInterval(interval);
        }, 100);
    }

    // === SCROLL OBSERVER ===
    function observeSections() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.section').forEach(sec => observer.observe(sec));
    }

    // === COUNTER LOGIC ===
    function updateCounter() {
        const now = new Date();

        let years = now.getFullYear() - START_DATE.getFullYear();
        let months = now.getMonth() - START_DATE.getMonth();
        let days = now.getDate() - START_DATE.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        const diffTime = now - START_DATE;
        const totalHelpers = Math.floor(diffTime / 1000);
        const hours = Math.floor((totalHelpers % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalHelpers % 3600) / 60);
        const seconds = totalHelpers % 60;

        document.getElementById('years').innerText = years;
        document.getElementById('months').innerText = months;
        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;

        // Heartbeat Calculation (Approx 80 bpm)
        const totalMinutes = Math.floor(diffTime / 1000 / 60);
        const heartbeats = totalMinutes * 80;
        document.getElementById('heartbeats').innerText = heartbeats.toLocaleString();
    }
    setInterval(updateCounter, 1000);
    updateCounter();

    // === REASONS ROTATOR ===
    const reasons = [
        "عشان ضحكتك بتنسيني هموم الدنيا",
        "عشان قلبك أبيض ومفيش زيه",
        "عشان إنتي الأمان اللي بحس بيه",
        "عشان بتفهميني من غير ما أتكلم",
        "عشان إنتي روحي وحتة مني",
        "عشان وجودك بيحلي أي حاجة"
    ];
    let reasonIndex = 0;
    const reasonText = document.getElementById('reason-text');

    if (reasonText) {
        setInterval(() => {
            reasonText.classList.add('fade-out');
            setTimeout(() => {
                reasonIndex = (reasonIndex + 1) % reasons.length;
                reasonText.innerText = reasons[reasonIndex];
                reasonText.classList.remove('fade-out');
            }, 1000); // Wait for fade out
        }, 4000); // Change every 4s
    }

    // === STARDUST EFFECT ===
    const starContainer = document.getElementById('stardust-container');
    if (starContainer) {
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.5) return;
            const star = document.createElement('div');
            star.classList.add('star-particle');
            star.style.left = `${e.clientX}px`;
            star.style.top = `${e.clientY}px`;
            starContainer.appendChild(star);
            setTimeout(() => star.remove(), 1000);
        });
    }

    // === LOVE METER LOGIC ===
    const fingerprintBtn = document.getElementById('fingerprint-btn');
    const meterBarContainer = document.getElementById('meter-bar-container');
    const meterFill = document.getElementById('meter-fill');
    const meterValue = document.getElementById('meter-value');
    const meterText = document.getElementById('meter-text');

    if (fingerprintBtn) {
        fingerprintBtn.addEventListener('click', () => {
            if (fingerprintBtn.classList.contains('active-scan')) return; // Prevent double click
            fingerprintBtn.classList.add('active-scan', 'scanning');
            meterText.innerText = "جاري الاتصال بالقلب... ❤️";

            // Start Audio if not playing
            if (audio.paused) { audio.play().then(() => { musicBtn.innerHTML = '<i class="fas fa-pause"></i>'; isPlaying = true; }).catch(e => console.log(e)); }

            setTimeout(() => {
                fingerprintBtn.classList.remove('scanning');
                meterBarContainer.classList.remove('hidden');

                // Animate Fill
                setTimeout(() => {
                    meterFill.style.width = "100%";
                    let count = 0;
                    const interval = setInterval(() => {
                        count += 2; // Speed up
                        if (count > 100) count = 100;
                        meterValue.innerText = count + "%";

                        if (count >= 100) {
                            clearInterval(interval);
                            meterValue.innerText = "∞%"; // Infinity
                            meterText.innerText = "حبك عدا المقياس يا جميل! 😍";
                            meterText.style.color = "var(--pink-soft)";
                            createHeartExplosion();
                        }
                    }, 50);
                }, 100);
            }, 2000);
        });
    }

    // === MUSIC CONTROL ===
    const musicBtn = document.getElementById('music-btn');
    let isPlaying = false;

    // Try to play on first interaction anywhere
    document.body.addEventListener('click', () => {
        if (audio.paused && !isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                if (musicBtn) musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(e => console.log("Audio waiting for interaction"));
        }
    }, { once: true });

    if (musicBtn) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Don't trigger body click
            if (!audio.paused) {
                audio.pause();
                musicBtn.innerHTML = '<i class="fas fa-play"></i>';
                isPlaying = false;
            } else {
                audio.play();
                musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
                isPlaying = true;
            }
        });
    }

    // === FOREVER BUTTON ===
    if (foreverBtn) {
        foreverBtn.addEventListener('click', () => {
            toast.classList.remove('hidden');
            createHeartExplosion();
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        });
    }

    // === FLOATING HEARTS BACKGROUND ===
    function createFloatingHeart() {
        const container = document.querySelector('.background-hearts');
        if (!container) return;

        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤';

        // Randomize Color (Gold vs Red/Pink) - User wanted "Romancia Pure"
        if (Math.random() > 0.5) {
            heart.classList.add('heart-red');
        }

        heart.style.left = Math.random() * 90 + 'vw'; // Limit to 90vw to prevent scroll overflow
        heart.style.animationDuration = Math.random() * 3 + 3 + 's'; // Slower float for romance
        heart.style.opacity = Math.random() * 0.7 + 0.3; // More visible
        heart.style.fontSize = Math.random() * 30 + 15 + 'px'; // Varied sizes

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    // Increased frequency: Every 150ms (Lots of hearts!)
    setInterval(createFloatingHeart, 150);

    // === ENVELOPE INTERACTION ===
    window.toggleEnvelope = function (element) {
        element.classList.toggle('open');
        // Play small sound or effect if possible
        if (element.classList.contains('open')) {
            createHeartExplosion();
        }
    }
});

// CSS Injection for Input Shake
const style = document.createElement('style');
style.innerHTML = `
    @keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(-5px); } 50% { transform: translateX(5px); } 75% { transform: translateX(-5px); } 100% { transform: translateX(0); } }
    .shake { animation: shake 0.3s; border-bottom-color: red !important; }
`;
document.head.appendChild(style);
