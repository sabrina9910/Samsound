document.addEventListener('DOMContentLoaded', () => {
    // Anno automatico nel footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());

    // Smooth scroll con offset header (solo anchor nella stessa pagina)
    const header = document.getElementById('header');

    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const target = href ? document.querySelector(href) : null;

            if (!target) return;

            e.preventDefault();

            const headerH = header ? header.offsetHeight : 0;
            const targetTop = target.getBoundingClientRect().top + window.scrollY;

            const y = href === '#home'
                ? 0
                : Math.max(0, Math.round(targetTop - headerH - 16));

            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    });

    // Marquee: calcola durata dinamica
    const noMarquee = document.body.classList.contains('no-marquee');
    const tracks = document.querySelectorAll('.collab-track');

    if (!noMarquee) {
        tracks.forEach((track) => {
            const speedPxPerSec = 75;

            requestAnimationFrame(() => {
                const halfWidth = track.scrollWidth / 2;
                const duration = Math.max(18, Math.round(halfWidth / speedPxPerSec));
                track.style.setProperty('--marquee-duration', `${duration}s`);
            });
        });
    }
});
