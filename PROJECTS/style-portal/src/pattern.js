// Pattern data loaded from gradients.json
let patternData = [];
let currentFilter = 'all';

// Load gradient data from JSON file
async function loadGradientData() {
    try {
        const response = await fetch('../gradients.json');
        const gradients = await response.json();
        
        // Process the data to add type field and filter out entries without names
        patternData = gradients
            .filter(gradient => gradient.name && gradient.colors && gradient.colors.length >= 2)
            .map(gradient => {
                let type;
                if (gradient.colors.length === 2) {
                    type = '2-color';
                } else if (gradient.colors.length === 3) {
                    type = '3-color';
                } else {
                    type = '4-color'; // 4+ colors grouped together
                }
                
                return {
                    ...gradient,
                    type: type
                };
            });
        
        console.log(`Loaded ${patternData.length} gradients from gradients.json`);
        return patternData;
    } catch (error) {
        console.error('Error loading gradient data:', error);
        // Fallback to empty array if loading fails
        patternData = [];
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    // Show loading state
    showLoadingState();
    
    // Load gradient data
    await loadGradientData();
    
    // Hide loading state and render patterns
    hideLoadingState();
    renderPatterns();
    setupFilterButtons();
    updateFilterCounts();
});

// Show loading state
function showLoadingState() {
    const grid = document.getElementById('patternsGrid');
    grid.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading gradients...</p>
        </div>
    `;
}

// Hide loading state
function hideLoadingState() {
    const loadingContainer = document.querySelector('.loading-container');
    if (loadingContainer) {
        loadingContainer.remove();
    }
}

// Render pattern cards
function renderPatterns() {
    const grid = document.getElementById('patternsGrid');
    grid.innerHTML = '';
    
    const filteredPatterns = currentFilter === 'all' 
        ? patternData 
        : patternData.filter(pattern => pattern.type === currentFilter);
    
    filteredPatterns.forEach((pattern, index) => {
        const card = createPatternCard(pattern, index);
        grid.appendChild(card);
    });
}

// Create individual pattern card
function createPatternCard(pattern, index) {
    const card = document.createElement('div');
    card.className = 'pattern-card';
    card.setAttribute('data-type', pattern.type);
    
    // Create pattern display with color stripes
    const patternDisplay = document.createElement('div');
    patternDisplay.className = 'pattern-display';
    
    pattern.colors.forEach(color => {
        const stripe = document.createElement('div');
        stripe.className = 'pattern-stripe';
        stripe.style.backgroundColor = color;
        patternDisplay.appendChild(stripe);
    });
    
    // Create pattern info section
    const patternInfo = document.createElement('div');
    patternInfo.className = 'pattern-info';
    
    const title = document.createElement('div');
    title.className = 'pattern-title';
    title.textContent = pattern.name;
    
    const colorsDiv = document.createElement('div');
    colorsDiv.className = 'pattern-colors';
    
    pattern.colors.forEach(color => {
        const colorCode = document.createElement('span');
        colorCode.className = 'color-code';
        colorCode.textContent = color;
        colorsDiv.appendChild(colorCode);
    });
    
    const typeDiv = document.createElement('div');
    typeDiv.className = 'pattern-type';
    typeDiv.textContent = pattern.type;
    
    patternInfo.appendChild(title);
    patternInfo.appendChild(colorsDiv);
    patternInfo.appendChild(typeDiv);
    
    card.appendChild(patternDisplay);
    card.appendChild(patternInfo);
    
    // Add click event for pattern selection
    card.addEventListener('click', () => {
        selectPattern(pattern, card);
    });
    
    return card;
}

// Setup filter button functionality
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update current filter
            currentFilter = button.getAttribute('data-filter');
            
            // Re-render patterns with animation
            animateFilterChange();
        });
    });
}

// Animate filter change
function animateFilterChange() {
    const grid = document.getElementById('patternsGrid');
    grid.style.opacity = '0.5';
    grid.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        renderPatterns();
        grid.style.opacity = '1';
        grid.style.transform = 'scale(1)';
    }, 200);
}

// Handle pattern selection
function selectPattern(pattern, cardElement) {
    // Remove previous selection
    document.querySelectorAll('.pattern-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to current card
    cardElement.classList.add('selected');
    
    // Copy color codes to clipboard
    const colorString = pattern.colors.join(', ');
    navigator.clipboard.writeText(colorString).then(() => {
        showToast(`Copied: ${colorString}`);
    }).catch(() => {
        // Fallback for browsers that don't support clipboard API
        showToast(`Pattern selected: ${pattern.name}`);
    });
}

// Show toast notification
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 6px;
        z-index: 1000;
        font-size: 14px;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Fade in
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 100);
    
    // Fade out and remove
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 2000);
}

// Update filter button counts
function updateFilterCounts() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        const filter = button.getAttribute('data-filter');
        let count = 0;
        
        if (filter === 'all') {
            count = patternData.length;
        } else {
            count = patternData.filter(pattern => pattern.type === filter).length;
        }
        
        // Update button text with count
        const originalText = button.textContent.split(' (')[0]; // Remove existing count
        button.textContent = `${originalText} (${count})`;
    });
}

// Add CSS for selected state
const style = document.createElement('style');
style.textContent = `
    .pattern-card.selected {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        border: 2px solid rgba(255, 255, 255, 0.8);
    }
    
    .patterns-grid {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
`;
document.head.appendChild(style);
