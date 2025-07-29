// GitHub Page JavaScript
class GitHubPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSavedTheme();
        this.setupTerminalLoader();
    }

    setupTerminalLoader() {
        setTimeout(() => {
            const loader = document.getElementById('terminal-loader');
            const mainContent = document.getElementById('main-content');
            
            if (loader && mainContent) {
                loader.style.display = 'none';
                mainContent.classList.remove('hidden');
            }
        }, 3000);
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 't' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.toggleTheme();
            }
        });
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

// Initialize the GitHub page
document.addEventListener('DOMContentLoaded', () => {
    new GitHubPage();
}); 