// PIIP Arsenal - Main JavaScript
class PIIPArsenal {
    constructor() {
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.filteredTools = [...toolsData];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTools();
        this.setupTerminalLoader();
        this.loadSavedTheme();
    }

    setupTerminalLoader() {
        // Terminal loading effect
        setTimeout(() => {
            const loader = document.getElementById('terminal-loader');
            const mainContent = document.getElementById('main-content');
            
            if (loader && mainContent) {
                loader.style.display = 'none';
                mainContent.classList.remove('hidden');
                this.addGlitchEffect();
            }
        }, 3500);
    }

    addGlitchEffect() {
        const logo = document.querySelector('.logo-text h1');
        if (logo) {
            logo.addEventListener('mouseenter', () => {
                logo.style.textShadow = '2px 0 #ff0040, -2px 0 #00ffff';
                setTimeout(() => {
                    logo.style.textShadow = '';
                }, 200);
            });
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchToggle = document.getElementById('search-toggle');
        const searchContainer = document.getElementById('search-container');
        const searchClose = document.getElementById('search-close');
        const searchInput = document.getElementById('search-input');

        if (searchToggle) {
            searchToggle.addEventListener('click', () => {
                searchContainer.classList.toggle('hidden');
                if (!searchContainer.classList.contains('hidden')) {
                    searchInput.focus();
                }
            });
        }

        if (searchClose) {
            searchClose.addEventListener('click', () => {
                searchContainer.classList.add('hidden');
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.filterTools();
            });
        }

        // Filter tabs
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                // Remove active class from all tabs
                filterTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                e.target.classList.add('active');
                
                this.currentFilter = e.target.dataset.filter;
                this.filterTools();
            });
        });

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Tool card clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.tool-card')) {
                const toolId = e.target.closest('.tool-card').dataset.toolId;
                this.openToolDetails(toolId);
            }
        });
    }

    loadTools() {
        const container = document.getElementById('tools-container');
        if (!container) return;

        this.renderTools(this.filteredTools);
    }

    renderTools(tools) {
        const container = document.getElementById('tools-container');
        if (!container) return;

        container.innerHTML = '';

        if (tools.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <h3>لا توجد نتائج</h3>
                    <p>جرب تغيير البحث أو الفلتر</p>
                </div>
            `;
            return;
        }

        tools.forEach(tool => {
            const card = this.createToolCard(tool);
            container.appendChild(card);
        });

        // Add animation to cards
        this.animateCards();
    }

    createToolCard(tool) {
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.dataset.toolId = tool.id;

        const osIcons = tool.os.map(os => `<span class="os-icon ${os}"></span>`).join('');
        
        card.innerHTML = `
            <div class="tool-header">
                <div>
                    <h3 class="tool-name">${tool.name}</h3>
                    <span class="tool-category ${tool.category}">${this.getCategoryName(tool.category)}</span>
                </div>
                <div class="tool-rating">
                    <span class="rating-stars">${this.getRatingStars(tool.rating)}</span>
                    <span class="rating-number">${tool.rating}</span>
                </div>
            </div>
            <p class="tool-description">${tool.description}</p>
            <div class="tool-meta">
                <div class="tool-os">
                    ${osIcons}
                </div>
                <div class="tool-info">
                    <span class="tool-size">${tool.size}</span>
                    <span class="tool-downloads">${this.formatDownloads(tool.downloads)}</span>
                </div>
            </div>
        `;

        return card;
    }

    getCategoryName(category) {
        const categories = {
            'recon': 'Recon',
            'exploitation': 'Exploitation',
            'osint': 'OSINT',
            'stealth': 'Stealth',
            'reverse': 'Reverse',
            'misc': 'Misc'
        };
        return categories[category] || category;
    }

    getRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        return '★'.repeat(fullStars) + 
               (hasHalfStar ? '☆' : '') + 
               '☆'.repeat(emptyStars);
    }

    formatDownloads(downloads) {
        if (downloads >= 1000000) {
            return (downloads / 1000000).toFixed(1) + 'M';
        } else if (downloads >= 1000) {
            return (downloads / 1000).toFixed(1) + 'K';
        }
        return downloads.toString();
    }

    filterTools() {
        let filtered = toolsData;

        // Apply category filter
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(tool => tool.category === this.currentFilter);
        }

        // Apply search filter
        if (this.searchQuery) {
            filtered = filtered.filter(tool => 
                tool.name.toLowerCase().includes(this.searchQuery) ||
                tool.description.toLowerCase().includes(this.searchQuery) ||
                tool.category.toLowerCase().includes(this.searchQuery)
            );
        }

        this.filteredTools = filtered;
        this.renderTools(filtered);
    }

    openToolDetails(toolId) {
        // Navigate to tool details page
        window.location.href = `tools/tool-details.html?id=${toolId}`;
    }

    toggleTheme() {
        const body = document.body;
        const themeIcon = document.querySelector('.theme-icon');
        
        // Toggle theme
        if (body.classList.contains('light-theme')) {
            // Switch to dark theme
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            if (themeIcon) themeIcon.textContent = '🌙';
            localStorage.setItem('piiptools_theme', 'dark');
            this.showNotification('تم التبديل إلى الوضع الداكن', 'success');
        } else {
            // Switch to light theme
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            if (themeIcon) themeIcon.textContent = '☀️';
            localStorage.setItem('piiptools_theme', 'light');
            this.showNotification('تم التبديل إلى الوضع الفاتح', 'success');
        }
    }

    // Load saved theme
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('piiptools_theme');
        const body = document.body;
        const themeIcon = document.querySelector('.theme-icon');
        
        if (savedTheme === 'light') {
            body.classList.add('light-theme');
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            body.classList.add('dark-theme');
            if (themeIcon) themeIcon.textContent = '🌙';
        }
    }

    animateCards() {
        const cards = document.querySelectorAll('.tool-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Utility methods
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new PIIPArsenal();
});

// Add notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-family: var(--font-mono);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.info {
        background: var(--accent-neon);
        color: var(--bg-primary);
    }
    
    .notification.success {
        background: var(--accent-green);
        color: var(--bg-primary);
    }
    
    .notification.error {
        background: var(--accent-red);
        color: white;
    }
    
    .no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem;
        color: var(--text-secondary);
    }
    
    .no-results h3 {
        color: var(--accent-neon);
        margin-bottom: 1rem;
    }
    
    .tool-rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .rating-stars {
        color: var(--accent-green);
        font-size: 0.9rem;
    }
    
    .rating-number {
        color: var(--text-secondary);
        font-size: 0.8rem;
    }
    
    .tool-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.2rem;
    }
    
    .tool-downloads {
        color: var(--text-secondary);
        font-size: 0.7rem;
    }
`;

// Inject notification styles
const style = document.createElement('style');
style.textContent = notificationStyles;
document.head.appendChild(style); 