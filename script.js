const noBtn = document.getElementById('noBtn');
const tooltip = document.getElementById('tooltip');
const headerText = document.querySelector('.header-text');
const mainGif = document.querySelector('.main-gif');

let moveCount = 0;

function moveButton() {
    // Generate random position within window bounds (with padding)
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 50);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 50);

    // Make button fixed to move freely relative to viewport
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${Math.max(20, x)}px`; // Ensure not too far left
    noBtn.style.top = `${Math.max(20, y)}px`;   // Ensure not too far top

    // Increment count to trigger tooltip
    moveCount++;
    if (moveCount === 1) {
        // Show tooltip on first dodge
        tooltip.classList.add('visible');

        // Hide tooltip after 2 seconds
        setTimeout(() => {
            tooltip.classList.remove('visible');
        }, 2000);
    }
}

function handleYes() {
    // 1. Confetti Explosion
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4081', '#ffc0cb', '#ffffff'] // Pink theme confetti
    });

    // 2. Change Text
    headerText.innerHTML = "Yay! Srish is my Valentine! 🥰💖";

    // 3. Change Image to Hugging Bears
    mainGif.src = "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"; // Keep loop or change to hug

    // 4. Hide Buttons (clean view)
    document.querySelector('.buttons').style.display = 'none';

    // 5. Continual Confetti Rain
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
