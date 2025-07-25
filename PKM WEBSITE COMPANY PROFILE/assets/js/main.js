// File: assets/js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // Efek visual scroll navbar
    const navbar = document.querySelector('.navbar');
    function handleNavbarScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }

    // Fungsi update active nav yang lebih akurat
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100; // Adjust for navbar height
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.id;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        // Tambahkan di dalam fungsi updateActiveNav()
console.log('Scroll Position:', window.scrollY);
document.querySelectorAll('section[id]').forEach(section => {
    console.log(
        `Section ${section.id}:`, 
        'Top:', section.offsetTop, 
        'Bottom:', section.offsetTop + section.offsetHeight
    );
});
console.log('Active Link:', document.querySelector('.nav-link.active')?.getAttribute('href'));
    }

    // Smooth scroll dengan offset yang tepat
    document.querySelectorAll('.navbar .nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL
                history.replaceState(null, null, targetId);
                
                // Force update active state setelah scroll selesai
                setTimeout(updateActiveNav, 1000);
            }
        });
    });

    // Inisialisasi event listeners
    window.addEventListener('scroll', function() {
        handleNavbarScroll();
        updateActiveNav();
    });

    // Jalankan sekali saat load
    handleNavbarScroll();
    updateActiveNav()
});

console.log('Active Section:', document.querySelector('.nav-link.active')?.getAttribute('href'));
console.log('Window Scroll:', window.scrollY);
document.querySelectorAll('section[id]').forEach(s => 
    console.log(s.id, s.getBoundingClientRect().top)
);
document.querySelectorAll('.navbar .nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            history.replaceState(null, null, targetId);

            setTimeout(updateActiveNav, 1000);
        }
    });
});