document.addEventListener('DOMContentLoaded', function () {
    // Handle multiple carousels
    const carousels = document.querySelectorAll('.product-carousel');
    
    carousels.forEach(function(carousel) {
        const track = carousel.querySelector('.carousel-track');
        const prevBtn = carousel.querySelector('.carousel-btn-prev');
        const nextBtn = carousel.querySelector('.carousel-btn-next');

        const itemWidth = 196; // 180px + 16px gap

        prevBtn.addEventListener('click', function () {
            track.scrollBy({
                left: -itemWidth * 2,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', function () {
            track.scrollBy({
                left: itemWidth * 2,
                behavior: 'smooth'
            });
        });

        // Hide/show buttons based on scroll position
        function updateButtons() {
            const scrollLeft = track.scrollLeft;
            const maxScroll = track.scrollWidth - track.clientWidth;

            prevBtn.style.display = scrollLeft <= 0 ? 'none' : 'flex';
            nextBtn.style.display = scrollLeft >= maxScroll ? 'none' : 'flex';
        }

        track.addEventListener('scroll', updateButtons);
        updateButtons(); // Initial check
    });
});