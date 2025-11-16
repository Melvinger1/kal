document.addEventListener('DOMContentLoaded', function() {
    const celebrateBtn = document.getElementById('celebrateBtn');
    const confettiContainer = document.getElementById('confettiContainer');
    
    // Array of birthday messages
    const birthdayMessages = [
        "Semoga panjang umur",
        "Sehat selalu",
        "Bahagia selalu",
        "Jangan banyak sedihnya",
        "Semoga apa yang kamu impikan tercapai",
        "Semoga ketemu orang yang tepat buat kamu",
        "Pokonya do'a terbaik lah dari aku buat kamu",
        "Semangatt yaa kuliahnyaaa"
    ];
    
    // Function to generate random confetti
    function createConfetti() {
        confettiContainer.innerHTML = '';
        
        for (let i = 0; i < 150; i++) {
            const confettiPiece = document.createElement('div');
            confettiPiece.classList.add('confetti-piece');
            
            // Random position
            const leftPos = Math.random() * 100;
            confettiPiece.style.left = `${leftPos}vw`;
            
            // Random size
            const size = Math.random() * 10 + 5;
            confettiPiece.style.width = `${size}px`;
            confettiPiece.style.height = `${size}px`;
            
            // Random color
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            confettiPiece.style.backgroundColor = randomColor;
            
            // Random animation duration
            const duration = Math.random() * 3 + 2;
            confettiPiece.style.animationDuration = `${duration}s`;
            
            confettiContainer.appendChild(confettiPiece);
        }
    }
    
    // Function to celebrate birthday
    function celebrateBirthday() {
        // Create confetti
        createConfetti();
        
        // Change greeting message
        const randomMessage = birthdayMessages[Math.floor(Math.random() * birthdayMessages.length)];
        document.querySelector('.message').textContent = randomMessage;
        
        // Add celebration effect
        document.querySelector('.greeting').style.animation = 'none';
        setTimeout(() => {
            document.querySelector('.greeting').style.animation = 'bounce 2s infinite';
        }, 10);
        
        // Play sound effect (if available)
        playCelebrationSound();
    }
    
    // Function to play celebration sound
    function playCelebrationSound() {
        try {
            // Create audio context
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create oscillator and gain node for sound effect
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            // Create a celebratory sound
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
            oscillator.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.3); // C6
            
            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
            
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.5);
        } catch (e) {
            // If audio context is not supported, just continue without sound
            console.log('Audio context not supported');
        }
    }

    
    // Add click event to celebrate button
    celebrateBtn.addEventListener('click', celebrateBirthday);

    // Add keyboard support
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' || event.code === 'Enter') {
            if (event.target.tagName !== 'INPUT') {
                celebrateBirthday();
                event.preventDefault();
            }
        }
    });

    // Add touch support for mobile devices
    document.querySelector('.cake-container').addEventListener('touchstart', function(e) {
        e.preventDefault();
        celebrateBirthday();
    });

    // Add mouse click support to cake
    document.querySelector('.cake-container').addEventListener('click', function(e) {
        if (e.target !== celebrateBtn) {
            celebrateBirthday();
        }
    });
});