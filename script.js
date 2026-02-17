document.addEventListener('DOMContentLoaded', () => {
    // Anno automatico nel footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Smooth scroll con offset header (solo anchor nella stessa pagina)
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

    // Marquee: ON su index & production, OFF su education (.no-marquee)
    const track = document.querySelector('.collab-track');
    const noMarquee = document.body.classList.contains('no-marquee');

    if (track && !noMarquee) {
        if (!track.dataset.duplicated) {
            track.innerHTML += track.innerHTML;
            track.dataset.duplicated = "true";
        }

        const speedPxPerSec = 90;

        requestAnimationFrame(() => {
            const halfWidth = track.scrollWidth / 2;
            const duration = Math.max(18, Math.round(halfWidth / speedPxPerSec));
            track.style.setProperty('--marquee-duration', `${duration}s`);
        });
    }
});
