// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = this.classList.contains('active');
            
            // Close all other FAQ items
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.parentElement.querySelector('.faq-answer').classList.remove('active');
            });
            
            // Toggle current FAQ item
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
    
    // Email validation for hero and FAQ signup forms
    const emailInputs = document.querySelectorAll('.email-input');
    const getStartedButtons = document.querySelectorAll('.get-started-btn');
    
    getStartedButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const emailInput = emailInputs[index];
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate sign up process
                alert('Great! You would normally be redirected to the sign-up page.');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
                emailInput.focus();
            }
        });
    });
    
    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Trending section functionality
    const trendingWrapper = document.querySelector('.trending-wrapper');
    const arrowBtn = document.querySelector('.arrow-btn');
    
    if (arrowBtn && trendingWrapper) {
        arrowBtn.addEventListener('click', function() {
            const scrollAmount = 480; // Scroll by approximately 2 items
            trendingWrapper.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Auto-scroll back to beginning when reaching the end
        trendingWrapper.addEventListener('scroll', function() {
            const maxScroll = trendingWrapper.scrollWidth - trendingWrapper.clientWidth;
            if (trendingWrapper.scrollLeft >= maxScroll - 10) {
                setTimeout(() => {
                    trendingWrapper.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                }, 1000);
            }
        });

    }
    
    // Language dropdown functionality
    const languageButtons = document.querySelectorAll('.language-dropdown');
    const languageMenus = document.querySelectorAll('.language-dropdown-menu');
    
    languageButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const menu = languageMenus[index];
            const isActive = this.classList.contains('active');
            
            // Close all dropdowns
            languageButtons.forEach(btn => btn.classList.remove('active'));
            languageMenus.forEach(menu => menu.classList.remove('active'));
            
            // Toggle current dropdown
            if (!isActive) {
                this.classList.add('active');
                menu.classList.add('active');
                // Focus first option
                const firstOption = menu.querySelector('.language-option');
                if (firstOption) firstOption.focus();
            }
        });
        
        // Keyboard navigation
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            } else if (e.key === 'Escape') {
                this.classList.remove('active');
                languageMenus[index].classList.remove('active');
            }
        });
    });
    
    // Handle language option selection
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', function() {
            const value = this.dataset.value;
            const text = this.querySelector('span').textContent;
            const dropdown = this.closest('.language-selector').querySelector('.language-dropdown');
            const textSpan = dropdown.querySelector('.language-text');
            
            // Update button text
            textSpan.textContent = text;
            
            // Close dropdown
            dropdown.classList.remove('active');
            this.closest('.language-dropdown-menu').classList.remove('active');
            
            // Return focus to button
            dropdown.focus();
            
            console.log('Language changed to:', value, text);
        });
        
        // Keyboard support for options
        option.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            } else if (e.key === 'Escape') {
                const dropdown = this.closest('.language-selector').querySelector('.language-dropdown');
                dropdown.classList.remove('active');
                this.closest('.language-dropdown-menu').classList.remove('active');
                dropdown.focus();
            }
        });
        
        // Make options focusable
        option.setAttribute('tabindex', '0');
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        languageButtons.forEach(btn => btn.classList.remove('active'));
        languageMenus.forEach(menu => menu.classList.remove('active'));
    });
    
    // Prevent dropdown from closing when clicking inside
    languageMenus.forEach(menu => {
        menu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header background change on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
        } else {
            header.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.7) 10%, transparent)';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-item, .trending-item, .faq-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
   
    
    // Enter key support for email inputs
    emailInputs.forEach((input, index) => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                getStartedButtons[index].click();
            }
        });
    });
    
    // Auto-focus on email input when scrolling to signup sections
    const heroEmailInput = document.querySelector('.hero .email-input');
    const faqEmailInput = document.querySelector('.faq .email-input');
    
    const emailObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && window.innerWidth > 768) {
                // Auto-focus on desktop only
                setTimeout(() => {
                    entry.target.focus();
                }, 500);
            }
        });
    }, { threshold: 0.5 });
    
    if (heroEmailInput) emailObserver.observe(heroEmailInput);
    if (faqEmailInput) emailObserver.observe(faqEmailInput);
});

// Utility function to handle mobile menu (if needed in future)
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// Error handling for missing images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder for missing images
            this.style.background = '#333';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = '#666';
            this.style.fontSize = '12px';
            this.alt = 'Image not found';
        });
    });
});
