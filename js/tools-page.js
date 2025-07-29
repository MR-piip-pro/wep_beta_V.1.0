// PIIP Arsenal - Tools Page JavaScript
class ToolsPage {
    constructor() {
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.filteredTools = [...toolsData];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTools();
        this.updateToolsCount();
        this.loadSavedTheme();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
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
        this.updateToolsCount(tools.length);
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
            <div class="tool-actions">
                <button class="download-btn">تحميل</button>
                <button class="details-btn">التفاصيل</button>
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
            }, index * 50);
        });
    }

    updateToolsCount(count = null) {
        const countElement = document.getElementById('tools-count');
        if (countElement) {
            const displayCount = count !== null ? count : this.filteredTools.length;
            countElement.textContent = displayCount;
        }
    }

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

// Initialize the tools page
document.addEventListener('DOMContentLoaded', () => {
    new ToolsPage();
});

// Add additional styles for tools page
const toolsPageStyles = `
    .tools-page-controls {
        background: var(--bg-secondary);
        border-bottom: 1px solid var(--accent-neon);
        padding: 1rem 0;
    }
    
    .tools-page-controls .search-wrapper {
        max-width: 1200px;
        margin: 0 auto 1rem auto;
        padding: 0 2rem;
    }
    
    .tools-page-controls .filter-tabs {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        justify-content: center;
    }
    
    .tools-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding: 0 2rem;
    }
    
    .tools-header h2 {
        color: var(--accent-neon);
        font-size: 1.8rem;
    }
    
    .tools-stats {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }
    
    .tools-stats span {
        color: var(--accent-green);
        font-weight: 600;
    }
    
    .back-btn {
        background: var(--bg-secondary);
        border: 1px solid var(--accent-neon);
        color: var(--text-primary);
        padding: 0.5rem 1rem;
        border-radius: 4px;
        text-decoration: none;
        transition: all 0.3s ease;
        font-family: var(--font-mono);
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .back-btn:hover {
        background: var(--accent-neon);
        color: var(--bg-primary);
        box-shadow: var(--border-glow);
    }
    
    .tool-actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    
    .download-btn, .details-btn {
        background: transparent;
        border: 1px solid var(--accent-neon);
        color: var(--text-primary);
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: var(--font-mono);
        font-size: 0.8rem;
        flex: 1;
    }
    
    .download-btn:hover {
        background: var(--accent-green);
        color: var(--bg-primary);
        border-color: var(--accent-green);
    }
    
    .details-btn:hover {
        background: var(--accent-neon);
        color: var(--bg-primary);
        border-color: var(--accent-neon);
    }
    
    @media (max-width: 768px) {
        .tools-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
        }
        
        .tool-actions {
            flex-direction: column;
        }
    }
`;

// Inject tools page styles
const style = document.createElement('style');
style.textContent = toolsPageStyles;
document.head.appendChild(style); 