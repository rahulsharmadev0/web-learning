// Portfolio Generator JavaScript with Dark Mode Theme Toggle

// Theme management
class ThemeManager {
    constructor() {
        this.storageKey = 'portfolio-theme';
        this.themes = {
            LIGHT: 'light',
            DARK: 'dark'
        };
        this.currentTheme = this.getInitialTheme();
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.createThemeToggle();
        this.bindEvents();
    }

    getInitialTheme() {
        // Check if user has a saved preference
        const stored = localStorage.getItem(this.storageKey);
        if (stored && (stored === this.themes.LIGHT || stored === this.themes.DARK)) {
            return stored;
        }

        // If no saved preference, use system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? this.themes.DARK
            : this.themes.LIGHT;
    }

    applyTheme(theme) {
        const root = document.documentElement;

        // Always set explicit theme attribute
        root.setAttribute('data-theme', theme);

        this.currentTheme = theme;
        localStorage.setItem(this.storageKey, theme);
        this.updateToggleButton();

        console.log(`🎨 Theme applied: ${theme}`);
    }

    createThemeToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.innerHTML = `
            <i class="fas fa-palette"></i>
            <span class="theme-text">Theme</span>
        `;
        toggle.setAttribute('aria-label', 'Toggle theme (Light/Dark)');
        toggle.setAttribute('title', 'Toggle between light and dark theme');

        document.body.appendChild(toggle);
        this.toggleButton = toggle;
        this.updateToggleButton();
    }

    updateToggleButton() {
        if (!this.toggleButton) return;

        const icon = this.toggleButton.querySelector('i');
        const text = this.toggleButton.querySelector('.theme-text');

        if (this.currentTheme === this.themes.LIGHT) {
            icon.className = 'fas fa-sun';
            text.textContent = 'Light';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'Dark';
        }

        // Update page title to show current theme
        const baseTitle = document.title.split(' | ')[0];
        document.title = `${baseTitle} | ${this.currentTheme === this.themes.LIGHT ? 'Light' : 'Dark'} Theme`;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === this.themes.LIGHT
            ? this.themes.DARK
            : this.themes.LIGHT;
        this.applyTheme(newTheme);
    }

    bindEvents() {
        // Theme toggle click
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => this.toggleTheme());
        }

        // Keyboard shortcut (Ctrl/Cmd + Shift + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }
}

// Card navigation
function setupCardNavigation() {
    const cards = document.querySelectorAll('.card[data-path]');

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const path = card.getAttribute('data-path');
            if (path) {
                window.location.href = path;
            }
        });

        // Add keyboard navigation
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });

        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('search');
    if (!searchInput) return;

    const cards = document.querySelectorAll('.card');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        cards.forEach(card => {
            const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.card-description')?.textContent.toLowerCase() || '';
            const techs = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent.toLowerCase()).join(' ');

            const matches = title.includes(query) || description.includes(query) || techs.includes(query);

            card.style.display = matches || query === '' ? 'block' : 'none';
        });

        // Update results count
        updateSearchResults(query);
    });
}

function updateSearchResults(query) {
    const visibleCards = document.querySelectorAll('.card:not([style*="display: none"])');
    const resultCount = document.getElementById('search-results');

    if (resultCount) {
        if (query) {
            resultCount.textContent = `${visibleCards.length} result${visibleCards.length !== 1 ? 's' : ''} found`;
            resultCount.style.display = 'block';
        } else {
            resultCount.style.display = 'none';
        }
    }
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
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
}

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Performance monitoring
function setupPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
                }
            }, 0);
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme manager (this handles system theme by default)
    new ThemeManager();

    // Setup other features
    setupCardNavigation();
    setupSearch();
    setupCategoryFilters();
    setupSmoothScrolling();
    setupLazyLoading();
    setupPerformanceMonitoring();

    // Add loading complete class
    document.body.classList.add('loaded');
});

// Export for potential external use
window.PortfolioApp = {
    ThemeManager
};

// Category Filters
function setupCategoryFilters() {
    const filterContainer = document.getElementById('category-filters');
    const projectCards = Array.from(document.querySelectorAll('.project-card'));
    if (!filterContainer || projectCards.length === 0) return;

    // Collect unique categories from data-categories
    const categoriesSet = new Set();
    projectCards.forEach(card => {
        const data = card.getAttribute('data-categories') || '';
        data.split(',').map(s => s.trim()).filter(Boolean).forEach(c => categoriesSet.add(c));
    });

    const categories = Array.from(categoriesSet).sort((a, b) => a.localeCompare(b));
    if (categories.length === 0) {
        // No categories to filter by; keep bar hidden
        filterContainer.style.display = 'none';
        return;
    }

    // Build chips
    filterContainer.innerHTML = `
            <div class="mode-toggle" role="group" aria-label="Filter mode">
                <button class="mode-btn active" data-mode="all" aria-pressed="true" title="Must match all selected categories">All</button>
                <button class="mode-btn" data-mode="any" aria-pressed="false" title="Match any selected category">Any</button>
            </div>
            
            <div class="chips" role="group" aria-label="Category filters"></div>
            
            <button class="btn-clear-filters" id="btn-clear-filters" style="display:none" aria-label="Clear category filters">Clear all</button>
    `;

    const chipsWrap = filterContainer.querySelector('.chips');
    const btnClear = filterContainer.querySelector('#btn-clear-filters');
    const modeBtns = Array.from(filterContainer.querySelectorAll('.mode-btn'));
    const active = new Set();
    let mode = 'all';

    categories.forEach(cat => {
        const chip = document.createElement('button');
        chip.className = 'chip';
        chip.type = 'button';
        chip.setAttribute('aria-pressed', 'false');
        chip.dataset.category = cat;
        chip.textContent = cat;
        chip.addEventListener('click', () => {
            // Toggle
            if (active.has(cat)) {
                active.delete(cat);
                chip.classList.remove('active');
                chip.setAttribute('aria-pressed', 'false');
            } else {
                active.add(cat);
                chip.classList.add('active');
                chip.setAttribute('aria-pressed', 'true');
            }
            applyCategoryFilter(projectCards, active, mode);
            btnClear.style.display = active.size > 0 ? 'inline-flex' : 'none';
        });
        chipsWrap.appendChild(chip);
    });

    btnClear.addEventListener('click', () => {
        active.clear();
        chipsWrap.querySelectorAll('.chip.active').forEach(el => {
            el.classList.remove('active');
            el.setAttribute('aria-pressed', 'false');
        });
        applyCategoryFilter(projectCards, active, mode);
        btnClear.style.display = 'none';
    });

    // Filter mode toggle
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const newMode = btn.dataset.mode === 'any' ? 'any' : 'all';
            if (newMode === mode) return;
            mode = newMode;
            modeBtns.forEach(b => {
                const isActive = b.dataset.mode === mode;
                b.classList.toggle('active', isActive);
                b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            });
            applyCategoryFilter(projectCards, active, mode);
        });
    });

    // Make category badges clickable to toggle filters
    document.querySelectorAll('.category-badge').forEach(badge => {
        const cat = badge.textContent.trim();
        badge.setAttribute('role', 'button');
        badge.setAttribute('tabindex', '0');
        badge.addEventListener('click', () => toggleChip(cat));
        badge.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleChip(cat);
            }
        });
    });

    function toggleChip(cat) {
        const chip = chipsWrap.querySelector(`.chip[data-category="${CSS.escape(cat)}"]`);
        if (!chip) return;
        chip.click();
    }
}

function applyCategoryFilter(cards, activeSet, mode = 'all') {
    if (!activeSet || activeSet.size === 0) {
        cards.forEach(card => card.style.display = 'block');
        return;
    }
    cards.forEach(card => {
        const data = (card.getAttribute('data-categories') || '')
            .split(',').map(s => s.trim()).filter(Boolean);
        let show = false;
        if (mode === 'any') {
            show = data.some(cat => activeSet.has(cat));
        } else {
            // default 'all'
            show = Array.from(activeSet).every(cat => data.includes(cat));
        }
        card.style.display = show ? 'block' : 'none';
    });
}
