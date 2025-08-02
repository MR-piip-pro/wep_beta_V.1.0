// PIIP Arsenal - Tools Page JavaScript
class ToolsPage {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 24; // زيادة عدد الأدوات المعروضة
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.filteredTools = [...toolsData];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.validateToolsData();
        this.loadTools();
        this.setupInfiniteScroll();
        this.loadSavedTheme();
        this.updateToolsCount();
    }

    validateToolsData() {
        if (!toolsData || !Array.isArray(toolsData)) {
            console.error('خطأ: بيانات الأدوات غير صحيحة في صفحة الأدوات');
            return;
        }

        console.log(`تم تحميل ${toolsData.length} أداة في صفحة الأدوات`);
        
        // التحقق من صحة البيانات
        const validTools = toolsData.filter(tool => 
            tool.id && 
            tool.name && 
            tool.category && 
            tool.description &&
            tool.githubUrl
        );

        if (validTools.length !== toolsData.length) {
            console.warn(`تحذير: ${toolsData.length - validTools.length} أداة تحتوي على بيانات غير مكتملة في صفحة الأدوات`);
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.currentPage = 1;
                this.filterTools();
            });
        }

        // Filter tabs
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                filterTabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                
                this.currentFilter = e.target.dataset.filter;
                this.currentPage = 1;
                this.filterTools();
            });
        });

        // Sort functionality
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortTools(e.target.value);
            });
        }

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    setupInfiniteScroll() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadMoreTools();
                }
            });
        }, options);

        // Observe the loading indicator
        const loadingIndicator = document.querySelector('.loading-indicator');
        if (loadingIndicator) {
            observer.observe(loadingIndicator);
        }
    }

    loadTools() {
        this.filterTools();
    }

    filterTools() {
        let filtered = toolsData;

        // Apply category filter
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(tool => tool.category === this.currentFilter);
        }

        // Apply search filter with improved matching
        if (this.searchQuery) {
            filtered = filtered.filter(tool => 
                tool.name.toLowerCase().includes(this.searchQuery) ||
                tool.description.toLowerCase().includes(this.searchQuery) ||
                tool.category.toLowerCase().includes(this.searchQuery) ||
                tool.os.some(os => os.toLowerCase().includes(this.searchQuery)) ||
                (tool.extendedDescription && tool.extendedDescription.toLowerCase().includes(this.searchQuery))
            );
        }

        this.filteredTools = filtered;
        this.renderTools();
        this.updateToolsCount();
        
        // Log results for debugging
        console.log(`عرض ${this.filteredTools.length} من ${toolsData.length} أداة في صفحة الأدوات`);
    }

    updateToolsCount() {
        const toolsCountElement = document.getElementById('tools-count');
        if (toolsCountElement) {
            toolsCountElement.textContent = toolsData.length;
        }
    }

    sortTools(sortBy) {
        switch (sortBy) {
            case 'name':
                this.filteredTools.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rating':
                this.filteredTools.sort((a, b) => b.rating - a.rating);
                break;
            case 'downloads':
                this.filteredTools.sort((a, b) => b.downloads - a.downloads);
                break;
            case 'date':
                this.filteredTools.sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate));
                break;
            default:
                break;
        }
        
        this.currentPage = 1;
        this.renderTools();
    }

    renderTools() {
        const container = document.getElementById('tools-container');
        if (!container) return;

        // Clear container if it's the first page
        if (this.currentPage === 1) {
            container.innerHTML = '';
        }

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const toolsToShow = this.filteredTools.slice(startIndex, endIndex);

        if (toolsToShow.length === 0 && this.currentPage === 1) {
            container.innerHTML = `
                <div class="no-results">
                    <h3>لا توجد نتائج</h3>
                    <p>جرب تغيير البحث أو الفلتر</p>
                    <button class="clear-filters-btn" onclick="toolsPage.clearFilters()">مسح الفلاتر</button>
                </div>
            `;
            return;
        }

        // Use DocumentFragment for better performance
        const fragment = document.createDocumentFragment();
        
        toolsToShow.forEach(tool => {
            const card = this.createToolCard(tool);
            fragment.appendChild(card);
        });

        container.appendChild(fragment);

        // Show/hide load more button
        this.updateLoadMoreButton();
        
        // Animate new cards
        this.animateCards();
    }

    createToolCard(tool) {
        const card = document.createElement('div');
        card.className = 'tool-card';
        card.dataset.toolId = tool.id;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `فتح تفاصيل ${tool.name}`);

        const osIcons = tool.os.map(os => `<span class="os-icon ${os}" title="${os}"></span>`).join('');
        
        card.innerHTML = `
            <div class="tool-header">
                <div>
                    <h3 class="tool-name">${tool.name}</h3>
                    <span class="tool-category ${tool.category}">${this.getCategoryName(tool.category)}</span>
                </div>
                <div class="tool-rating">
                    <span class="rating-stars" aria-label="التقييم: ${tool.rating} من 5">${this.getRatingStars(tool.rating)}</span>
                    <span class="rating-number">${tool.rating}</span>
                </div>
            </div>
            <p class="tool-description">${tool.description}</p>
            <div class="tool-meta">
                <div class="tool-os" aria-label="أنظمة التشغيل المدعومة: ${tool.os.join(', ')}">
                    ${osIcons}
                </div>
                <div class="tool-info">
                    <span class="tool-size">${tool.size}</span>
                    <span class="tool-downloads">${this.formatDownloads(tool.downloads)}</span>
                </div>
            </div>
            <div class="tool-actions">
                <button class="download-btn" onclick="event.stopPropagation(); toolsPage.downloadTool('${tool.id}')">
                    تحميل
                </button>
                <button class="details-btn" onclick="event.stopPropagation(); toolsPage.openToolDetails('${tool.id}')">
                    التفاصيل
                </button>
            </div>
        `;

        // Add keyboard support
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.openToolDetails(tool.id);
            }
        });

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

    loadMoreTools() {
        if (this.currentPage * this.itemsPerPage < this.filteredTools.length) {
            this.currentPage++;
            this.renderTools();
        }
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.querySelector('.load-more-btn');
        if (loadMoreBtn) {
            const hasMore = this.currentPage * this.itemsPerPage < this.filteredTools.length;
            loadMoreBtn.style.display = hasMore ? 'block' : 'none';
        }
    }

    clearFilters() {
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.currentPage = 1;
        
        // Reset UI
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector('[data-filter="all"]').classList.add('active');
        
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = '';
        }
        
        this.filterTools();
    }

    downloadTool(toolId) {
        const tool = toolsData.find(t => t.id === toolId);
        if (tool && tool.githubUrl) {
            window.open(tool.githubUrl, '_blank');
            this.showNotification(`جاري فتح ${tool.name}`, 'success');
        } else {
            this.showNotification('رابط التحميل غير متاح', 'error');
        }
    }

    openToolDetails(toolId) {
        window.location.href = `tool-details.html?id=${toolId}`;
    }

    toggleTheme() {
        const body = document.body;
        const themeIcon = document.querySelector('.theme-icon');
        
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            if (themeIcon) themeIcon.textContent = '🌙';
            localStorage.setItem('piiptools_theme', 'dark');
            this.showNotification('تم التبديل إلى الوضع الداكن', 'success');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            if (themeIcon) themeIcon.textContent = '☀️';
            localStorage.setItem('piiptools_theme', 'light');
            this.showNotification('تم التبديل إلى الوضع الفاتح', 'success');
        }
    }

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
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        
        cards.slice(startIndex).forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">✕</button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the tools page
let toolsPage;
document.addEventListener('DOMContentLoaded', () => {
    toolsPage = new ToolsPage();
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