document.addEventListener('DOMContentLoaded', () => {
    // anno automatico nel footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Smooth scroll con offset header (solo per anchor nella stessa pagina)
    const header = document.getElementById('header');

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const target = document.querySelector(a.getAttribute('href'));
            if (!target) return;

            e.preventDefault();
            const headerH = header ? header.offsetHeight : 0;
            const y = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });

    // Marquee loghi nel footer (index)
    const track = document.querySelector('.collab-track');
    if (track) {
        // duplica i loghi per uno scorrimento continuo “senza stacco”
        track.innerHTML += track.innerHTML;

        // durata dinamica in base alla larghezza (più loghi = più tempo)
        const speedPxPerSec = 90; // aumenta = più veloce, diminuisci = più lento

        requestAnimationFrame(() => {
            const halfWidth = track.scrollWidth / 2; // perché abbiamo duplicato
            const duration = Math.max(18, Math.round(halfWidth / speedPxPerSec));
            track.style.setProperty('--marquee-duration', `${duration}s`);
        });
    }
});
