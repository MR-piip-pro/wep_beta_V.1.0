// Contact Page JavaScript
class ContactPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSavedTheme();
        this.setupTerminalLoader();
        this.setupFormValidation();
    }

    setupTerminalLoader() {
        setTimeout(() => {
            const loader = document.getElementById('terminal-loader');
            const mainContent = document.getElementById('main-content');
            
            if (loader && mainContent) {
                loader.style.display = 'none';
                mainContent.classList.remove('hidden');
            }
        }, 2000);
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 't' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.toggleTheme();
            }
        });

        // Modal close on outside click
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('pgp-modal');
            if (e.target === modal) {
                this.closePGPModal();
            }
        });

        // Modal close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePGPModal();
            }
        });
    }

    setupFormValidation() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'البريد الإلكتروني مطلوب';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'البريد الإلكتروني غير صحيح';
                    isValid = false;
                }
                break;

            case 'text':
                if (!value) {
                    errorMessage = 'هذا الحقل مطلوب';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'يجب أن يكون الاسم أكثر من حرفين';
                    isValid = false;
                }
                break;

            case 'select-one':
                if (!value) {
                    errorMessage = 'يرجى اختيار موضوع';
                    isValid = false;
                }
                break;

            case 'textarea':
                if (!value) {
                    errorMessage = 'الرسالة مطلوبة';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'يجب أن تكون الرسالة أكثر من 10 أحرف';
                    isValid = false;
                }
                break;

            case 'checkbox':
                if (!field.checked) {
                    errorMessage = 'يجب الموافقة على سياسة الخصوصية';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--accent-red)';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = 'var(--accent-red)';
    }

    clearFieldError(field) {
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
        field.style.borderColor = 'var(--accent-neon)';
    }

    handleFormSubmit() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        // Validate all fields
        const fields = form.querySelectorAll('input, select, textarea');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showNotification('يرجى تصحيح الأخطاء في النموذج', 'error');
            return;
        }

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>جاري الإرسال...</span><span class="icon">⏳</span>';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
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

// Global functions for PGP modal
function showPGPKey() {
    const modal = document.getElementById('pgp-modal');
    if (modal) {
        modal.style.display = 'block';
        modal.querySelector('.pgp-key').focus();
    }
}

function closePGPModal() {
    const modal = document.getElementById('pgp-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function copyPGPKey() {
    const pgpKey = document.querySelector('.pgp-key');
    if (pgpKey) {
        const text = pgpKey.textContent;
        
        // Create temporary textarea for copying
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            // Show success message
            const copyBtn = document.querySelector('.copy-btn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'تم النسخ!';
            copyBtn.style.background = 'var(--accent-green)';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy PGP key:', err);
        }
        
        document.body.removeChild(textarea);
    }
}

// Initialize the contact page
document.addEventListener('DOMContentLoaded', () => {
    new ContactPage();
}); 