// PIIP Arsenal - Tool Details JavaScript
class ToolDetailsManager {
    constructor() {
        this.currentTool = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.validateToolsData();
        this.loadToolData();
        this.setupTerminalLoader();
        this.loadSavedTheme();
    }

    validateToolsData() {
        if (!toolsData || !Array.isArray(toolsData)) {
            console.error('خطأ: بيانات الأدوات غير صحيحة في صفحة التفاصيل');
            return;
        }

        console.log(`تم تحميل ${toolsData.length} أداة في صفحة التفاصيل`);
        
        // التحقق من صحة البيانات
        const validTools = toolsData.filter(tool => 
            tool.id && 
            tool.name && 
            tool.category && 
            tool.description &&
            tool.githubUrl
        );

        if (validTools.length !== toolsData.length) {
            console.warn(`تحذير: ${toolsData.length - validTools.length} أداة تحتوي على بيانات غير مكتملة في صفحة التفاصيل`);
        }
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Back button
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.goBack());
        }

        // Download buttons
        const directDownload = document.getElementById('direct-download');
        const githubDownload = document.getElementById('github-download');
        const githubLink = document.getElementById('github-link');

        if (directDownload) {
            directDownload.addEventListener('click', (e) => this.handleDirectDownload(e));
        }
        if (githubDownload) {
            githubDownload.addEventListener('click', (e) => this.handleGitHubDownload(e));
        }
        if (githubLink) {
            githubLink.addEventListener('click', (e) => this.handleGitHubLink(e));
        }

        // Copy code button
        const copyBtn = document.getElementById('copy-code');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyCode());
        }
    }

    setupTerminalLoader() {
        const loader = document.getElementById('terminal-loader');
        const mainContent = document.getElementById('main-content');

        if (loader && mainContent) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    mainContent.style.display = 'block';
                    mainContent.style.opacity = '0';
                    setTimeout(() => {
                        mainContent.style.opacity = '1';
                    }, 100);
                }, 1000);
            }, 2000);
        }
    }

    loadToolData() {
        const urlParams = new URLSearchParams(window.location.search);
        const toolId = urlParams.get('id');

        if (!toolId) {
            this.showError('لم يتم تحديد أداة');
            return;
        }

        this.currentTool = toolsData.find(tool => tool.id === toolId);
        
        if (!this.currentTool) {
            this.showError('الأداة غير موجودة');
            return;
        }

        console.log(`تم تحميل تفاصيل الأداة: ${this.currentTool.name}`);
        this.populateToolData();
    }

    populateToolData() {
        if (!this.currentTool) return;

        // Set page title
        document.title = `${this.currentTool.name} - PIIP Arsenal`;

        // Tool header
        const toolIcon = document.getElementById('tool-icon');
        const toolName = document.getElementById('tool-name');
        const toolCategory = document.getElementById('tool-category');
        const toolVersion = document.getElementById('tool-version');
        const toolSize = document.getElementById('tool-size');

        if (toolIcon) toolIcon.textContent = this.getToolIcon(this.currentTool.category);
        if (toolName) toolName.textContent = this.currentTool.name;
        if (toolCategory) {
            toolCategory.textContent = this.getCategoryName(this.currentTool.category);
            toolCategory.className = `tool-category category-${this.currentTool.category}`;
        }
        if (toolVersion) toolVersion.textContent = this.currentTool.version;
        if (toolSize) toolSize.textContent = this.currentTool.size;

        // Tool description
        const toolDescription = document.getElementById('tool-description');
        if (toolDescription) {
            toolDescription.textContent = this.currentTool.extendedDescription || this.currentTool.description;
        }

        // Tool specifications
        const toolOs = document.getElementById('tool-os');
        const toolLicense = document.getElementById('tool-license');
        const toolLastUpdate = document.getElementById('tool-last-update');
        const toolDownloads = document.getElementById('tool-downloads');
        const toolRating = document.getElementById('tool-rating');

        if (toolOs) toolOs.textContent = this.currentTool.os.join(', ');
        if (toolLicense) toolLicense.textContent = this.currentTool.license;
        if (toolLastUpdate) toolLastUpdate.textContent = this.currentTool.lastUpdate;
        if (toolDownloads) toolDownloads.textContent = this.currentTool.downloads.toLocaleString();
        if (toolRating) toolRating.textContent = this.currentTool.rating.toFixed(1);

        // Usage code
        const usageCode = document.getElementById('usage-code');
        if (usageCode) {
            usageCode.textContent = this.generateUsageCode();
        }

        // Update download buttons
        this.updateDownloadButtons();
    }

    updateDownloadButtons() {
        const directDownload = document.getElementById('direct-download');
        const githubDownload = document.getElementById('github-download');
        const githubLink = document.getElementById('github-link');

        if (this.currentTool && this.currentTool.githubUrl) {
            if (directDownload) {
                directDownload.disabled = false;
                directDownload.style.opacity = '1';
            }
            if (githubDownload) {
                githubDownload.disabled = false;
                githubDownload.style.opacity = '1';
            }
            if (githubLink) {
                githubLink.disabled = false;
                githubLink.style.opacity = '1';
            }
        } else {
            if (directDownload) {
                directDownload.disabled = true;
                directDownload.style.opacity = '0.5';
            }
            if (githubDownload) {
                githubDownload.disabled = true;
                githubDownload.style.opacity = '0.5';
            }
            if (githubLink) {
                githubLink.disabled = true;
                githubLink.style.opacity = '0.5';
            }
        }
    }

    getToolIcon(category) {
        const icons = {
            'recon': '🔍',
            'exploitation': '💣',
            'osint': '📊',
            'stealth': '👻',
            'reverse': '🔄',
            'misc': '🛠️'
        };
        return icons[category] || '🔧';
    }

    getCategoryName(category) {
        const categories = {
            'recon': 'استطلاع',
            'exploitation': 'استغلال',
            'osint': 'معلومات مفتوحة',
            'stealth': 'التخفي',
            'reverse': 'الهندسة العكسية',
            'misc': 'متنوعات'
        };
        return categories[category] || category;
    }

    generateUsageCode() {
        if (!this.currentTool) return '';

        const toolName = this.currentTool.name.toLowerCase().replace(/\s+/g, '-');
        const githubUrl = this.currentTool.githubUrl;

        return `# ${this.currentTool.name} - مثال على الاستخدام
# ${this.currentTool.description}

# 1. استنساخ المستودع
git clone ${githubUrl}
cd ${toolName}

# 2. تثبيت المتطلبات
pip install -r requirements.txt
# أو
npm install
# أو
./install.sh

# 3. تشغيل الأداة
python ${toolName}.py
# أو
./${toolName}
# أو
npm start

# 4. مثال على الاستخدام الأساسي
# ${toolName} --target example.com
# ${toolName} -u username -p password
# ${toolName} --scan --output results.txt

# للمزيد من المعلومات، راجع الوثائق في GitHub`;
    }

    handleDirectDownload(e) {
        e.preventDefault();
        
        if (!this.currentTool) {
            this.showNotification('خطأ في تحميل الأداة', 'error');
            return;
        }

        if (!this.currentTool.githubUrl) {
            this.showNotification('رابط التحميل غير متاح', 'error');
            return;
        }

        this.showNotification('جاري التحميل...', 'info');
        
        // Try to open the GitHub releases page for direct download
        const releasesUrl = this.currentTool.githubUrl.replace('/github.com/', '/github.com/') + '/releases';
        window.open(releasesUrl, '_blank');
        this.showNotification('تم فتح صفحة التحميل!', 'success');
    }

    handleGitHubDownload(e) {
        e.preventDefault();
        
        if (!this.currentTool) {
            this.showNotification('خطأ في تحميل الأداة', 'error');
            return;
        }

        if (!this.currentTool.githubUrl) {
            this.showNotification('رابط GitHub غير متاح', 'error');
            return;
        }

        this.showNotification('جاري الانتقال إلى GitHub...', 'info');
        
        setTimeout(() => {
            window.open(this.currentTool.githubUrl, '_blank');
            this.showNotification('تم فتح GitHub!', 'success');
        }, 500);
    }

    handleGitHubLink(e) {
        e.preventDefault();
        
        if (!this.currentTool) {
            this.showNotification('خطأ في فتح الرابط', 'error');
            return;
        }

        if (!this.currentTool.githubUrl) {
            this.showNotification('رابط GitHub غير متاح', 'error');
            return;
        }

        this.showNotification('جاري فتح GitHub...', 'info');
        
        setTimeout(() => {
            window.open(this.currentTool.githubUrl, '_blank');
            this.showNotification('تم فتح GitHub!', 'success');
        }, 300);
    }

    copyCode() {
        const codeBlock = document.getElementById('usage-code');
        if (!codeBlock) return;

        const text = codeBlock.textContent;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('تم نسخ الكود!', 'success');
            }).catch(() => {
                this.fallbackCopyTextToClipboard(text);
            });
        } else {
            this.fallbackCopyTextToClipboard(text);
        }
    }

    fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showNotification('تم نسخ الكود!', 'success');
        } catch (err) {
            this.showNotification('فشل في نسخ الكود', 'error');
        }
        
        document.body.removeChild(textArea);
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

    goBack() {
        if (document.referrer && document.referrer.includes(window.location.origin)) {
            window.history.back();
        } else {
            window.location.href = '../index.html';
        }
    }

    showError(message) {
        this.showNotification(message, 'error');
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });

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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ToolDetailsManager();
});

// Add tool details styles
const toolDetailsStyles = `
    .tool-details-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }
    
    .tool-details {
        background: var(--bg-card);
        border: 1px solid rgba(0, 255, 255, 0.3);
        border-radius: 12px;
        overflow: hidden;
        backdrop-filter: blur(10px);
    }
    
    .tool-header-section {
        background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        padding: 2rem;
        border-bottom: 1px solid var(--accent-neon);
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 2rem;
    }
    
    .tool-title {
        font-size: 2.5rem;
        color: var(--accent-neon);
        margin-bottom: 1rem;
        font-weight: 700;
    }
    
    .tool-category {
        display: inline-block;
        padding: 0.3rem 0.8rem;
        border-radius: 6px;
        font-size: 0.9rem;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 1rem;
    }
    
    .tool-category.recon { background: var(--accent-green); color: var(--bg-primary); }
    .tool-category.exploitation { background: var(--accent-red); color: white; }
    .tool-category.osint { background: var(--accent-neon); color: var(--bg-primary); }
    .tool-category.stealth { background: var(--accent-purple); color: white; }
    .tool-category.reverse { background: var(--accent-orange); color: var(--bg-primary); }
    .tool-category.misc { background: var(--accent-blue); color: white; }
    
    .tool-rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    
    .rating-stars {
        color: var(--accent-green);
        font-size: 1rem;
    }
    
    .rating-number {
        color: var(--text-primary);
        font-weight: 600;
    }
    
    .downloads-count {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }
    
    .tool-actions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        min-width: 200px;
    }
    
    .download-btn {
        padding: 0.8rem 1.5rem;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        font-family: var(--font-mono);
        font-weight: 600;
        transition: all 0.3s ease;
        text-align: center;
    }
    
    .download-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    .download-btn.primary {
        background: linear-gradient(45deg, var(--accent-neon), var(--accent-green));
        color: var(--bg-primary);
    }
    
    .download-btn.primary:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: var(--shadow-glow);
    }
    
    .download-btn.secondary {
        background: transparent;
        border: 2px solid var(--accent-neon);
        color: var(--text-primary);
    }
    
    .download-btn.secondary:hover:not(:disabled) {
        background: var(--accent-neon);
        color: var(--bg-primary);
    }
    
    .tool-content {
        padding: 2rem;
    }
    
    .tool-content h2 {
        color: var(--accent-neon);
        font-size: 1.5rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid rgba(0, 255, 255, 0.3);
        padding-bottom: 0.5rem;
    }
    
    .tool-content h3 {
        color: var(--text-primary);
        font-size: 1.2rem;
        margin: 1.5rem 0 1rem 0;
    }
    
    .tool-content p {
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: 1rem;
    }
    
    .tool-content ul {
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: 1rem;
        padding-right: 1.5rem;
    }
    
    .tool-content li {
        margin-bottom: 0.5rem;
    }
    
    .specs-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }
    
    .spec-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background: var(--bg-secondary);
        border-radius: 6px;
        border: 1px solid rgba(0, 255, 255, 0.2);
    }
    
    .spec-label {
        color: var(--text-secondary);
        font-weight: 500;
    }
    
    .spec-value {
        color: var(--accent-green);
        font-weight: 600;
    }
    
    .code-block {
        background: var(--bg-secondary);
        border: 1px solid var(--accent-neon);
        border-radius: 8px;
        overflow: hidden;
        margin: 1.5rem 0;
    }
    
    .code-header {
        background: var(--bg-primary);
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--accent-neon);
    }
    
    .code-header span {
        color: var(--text-primary);
        font-weight: 600;
    }
    
    .copy-btn {
        background: transparent;
        border: 1px solid var(--accent-neon);
        color: var(--text-primary);
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: var(--font-mono);
        font-size: 0.8rem;
    }
    
    .copy-btn:hover {
        background: var(--accent-neon);
        color: var(--bg-primary);
    }
    
    .code-block pre {
        margin: 0;
        padding: 1.5rem;
        overflow-x: auto;
    }
    
    .code-block code {
        color: var(--accent-green);
        font-family: var(--font-mono);
        font-size: 0.9rem;
        line-height: 1.5;
    }
    
    .screenshots-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
        margin: 1.5rem 0;
    }
    
    .screenshot {
        aspect-ratio: 16/9;
        border-radius: 8px;
        overflow: hidden;
    }
    
    .screenshot-placeholder {
        width: 100%;
        height: 100%;
        background: var(--bg-secondary);
        border: 2px dashed var(--accent-neon);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
        font-family: var(--font-mono);
    }
    
    .changelog-item {
        background: var(--bg-secondary);
        border: 1px solid rgba(0, 255, 255, 0.2);
        border-radius: 6px;
        padding: 1.5rem;
        margin-bottom: 1rem;
    }
    
    .version {
        color: var(--accent-neon);
        font-weight: 600;
        font-size: 1.1rem;
        margin-bottom: 1rem;
    }
    
    .changelog-item ul {
        color: var(--text-secondary);
        padding-right: 1.5rem;
    }
    
    .changelog-item li {
        margin-bottom: 0.3rem;
    }
    
    @media (max-width: 768px) {
        .tool-header-section {
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .tool-title {
            font-size: 2rem;
        }
        
        .tool-actions {
            min-width: auto;
            width: 100%;
        }
        
        .specs-grid {
            grid-template-columns: 1fr;
        }
        
        .screenshots-grid {
            grid-template-columns: 1fr;
        }
    }
`;

// Inject tool details styles
const style = document.createElement('style');
style.textContent = toolDetailsStyles;
document.head.appendChild(style); 