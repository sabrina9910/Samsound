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

            // FIX: se l'anchor non esiste, NON bloccare il comportamento default
            // (così non "rompe" click su link/anchor sbagliati o non presenti)
            if (!target) return;

            e.preventDefault(); // blocca il salto standard, così applichiamo l'offset [web:573]

            const headerH = header ? header.offsetHeight : 0;
            const targetTop = target.getBoundingClientRect().top + window.scrollY; // posizione assoluta [web:507]

            const y = href === '#home'
                ? 0
                : Math.max(0, Math.round(targetTop - headerH - 16));

            window.scrollTo({ top: y, behavior: 'smooth' });
        });
    }); // querySelectorAll ritorna una NodeList statica [web:501]

    // Marquee: duplica automaticamente ogni track (se non .no-marquee)
    const noMarquee = document.body.classList.contains('no-marquee');
    const tracks = document.querySelectorAll('.collab-track');

    if (!noMarquee) {
        tracks.forEach((track) => {
            if (!track.dataset.duplicated) {
                track.innerHTML += track.innerHTML;
                track.dataset.duplicated = 'true';
            }

            const speedPxPerSec = 75;

            requestAnimationFrame(() => {
                const halfWidth = track.scrollWidth / 2;
                const duration = Math.max(18, Math.round(halfWidth / speedPxPerSec));
                track.style.setProperty('--marquee-duration', `${duration}s`);
            });
        });
    }
});
