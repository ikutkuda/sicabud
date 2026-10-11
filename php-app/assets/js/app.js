/**
 * SICABA - Custom JavaScript
 * Sistem Informasi Cagar Budaya Kota Tasikmalaya
 */

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Format currency to Rupiah
function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Berhasil disalin ke clipboard!', 'success');
    }).catch(err => {
        console.error('Gagal menyalin: ', err);
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
    
    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-amber-500 text-white',
        info: 'bg-blue-500 text-white'
    };
    
    notification.className += ' ' + colors[type];
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Confirm dialog
function confirmDialog(message, onConfirm) {
    if (confirm(message)) {
        onConfirm();
    }
}

// ============================================================================
// FILE UPLOAD
// ============================================================================

// Initialize file upload areas
function initFileUpload() {
    const uploadAreas = document.querySelectorAll('.upload-area');
    
    uploadAreas.forEach(area => {
        const input = area.querySelector('input[type="file"]');
        
        // Drag and drop
        area.addEventListener('dragover', (e) => {
            e.preventDefault();
            area.classList.add('dragover');
        });
        
        area.addEventListener('dragleave', () => {
            area.classList.remove('dragover');
        });
        
        area.addEventListener('drop', (e) => {
            e.preventDefault();
            area.classList.remove('dragover');
            
            if (e.dataTransfer.files.length > 0) {
                input.files = e.dataTransfer.files;
                handleFileSelect(input);
            }
        });
        
        // Click to upload
        area.addEventListener('click', () => {
            input.click();
        });
        
        // File select
        input.addEventListener('change', () => {
            handleFileSelect(input);
        });
    });
}

// Handle file selection
function handleFileSelect(input) {
    const files = input.files;
    const preview = input.closest('.upload-area').querySelector('.file-preview');
    
    if (files.length > 0) {
        const file = files[0];
        const fileSize = (file.size / 1024 / 1024).toFixed(2);
        
        if (preview) {
            preview.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="text-2xl">✅</span>
                    <div>
                        <p class="text-sm font-medium">${file.name}</p>
                        <p class="text-xs text-gray-500">${fileSize} MB</p>
                    </div>
                </div>
            `;
        }
    }
}

// ============================================================================
// SEARCH & FILTER
// ============================================================================

// Initialize search
function initSearch() {
    const searchInputs = document.querySelectorAll('[data-search]');
    
    searchInputs.forEach(input => {
        const target = input.dataset.search;
        const items = document.querySelectorAll(target);
        
        input.addEventListener('input', debounce((e) => {
            const query = e.target.value.toLowerCase();
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        }, 300));
    });
}

// Initialize filter
function initFilter() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            const target = button.dataset.target;
            const items = document.querySelectorAll(target);
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            items.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ============================================================================
// MODAL
// ============================================================================

// Open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.add('hidden');
        document.body.style.overflow = '';
    }
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal-overlay:not(.hidden)');
        modals.forEach(modal => {
            modal.classList.add('hidden');
        });
        document.body.style.overflow = '';
    }
});

// ============================================================================
// FORM VALIDATION
// ============================================================================

// Validate form
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('border-red-500');
            
            // Show error message
            const errorMsg = field.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.classList.remove('hidden');
            }
        } else {
            field.classList.remove('border-red-500');
            
            const errorMsg = field.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.classList.add('hidden');
            }
        }
    });
    
    return isValid;
}

// ============================================================================
// SCROLL TO TOP
// ============================================================================

// Initialize scroll to top button
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.remove('hidden');
            } else {
                scrollBtn.classList.add('hidden');
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================================================
// LAZY LOADING
// ============================================================================

// Initialize lazy loading for images
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================================================
// ANIMATIONS
// ============================================================================

// Initialize scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.dataset.animate;
                entry.target.classList.add(`animate-${animation}`);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// ============================================================================
// COUNTDOWN TIMER
// ============================================================================

// Initialize countdown timer
function initCountdown(elementId, targetDate) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const target = new Date(targetDate).getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = target - now;
        
        if (distance < 0) {
            element.textContent = 'Waktu habis!';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        element.textContent = `${days}h ${hours}j ${minutes}m ${seconds}d`;
    };
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============================================================================
// PROGRESS BAR
// ============================================================================

// Animate progress bar
function animateProgressBar(elementId, targetWidth) {
    const progressBar = document.getElementById(elementId);
    if (!progressBar) return;
    
    let width = 0;
    const interval = setInterval(() => {
        if (width >= targetWidth) {
            clearInterval(interval);
        } else {
            width++;
            progressBar.style.width = width + '%';
        }
    }, 20);
}

// ============================================================================
// TOOLTIP
// ============================================================================

// Initialize tooltips
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', () => {
            tooltip.classList.add('tooltip-active');
        });
        
        tooltip.addEventListener('mouseleave', () => {
            tooltip.classList.remove('tooltip-active');
        });
    });
}

// ============================================================================
// TABS
// ============================================================================

// Initialize tabs
function initTabs() {
    const tabButtons = document.querySelectorAll('[data-tab]');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            const tabGroup = button.closest('[data-tab-group]');
            
            // Update active button
            tabGroup.querySelectorAll('[data-tab]').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            
            // Show active tab content
            const tabContents = tabGroup.querySelectorAll('[data-tab-content]');
            tabContents.forEach(content => {
                if (content.dataset.tabContent === tabId) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });
}

// ============================================================================
// ACCORDION
// ============================================================================

// Initialize accordion
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('[data-accordion]');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            
            // Toggle content
            content.classList.toggle('hidden');
            
            // Rotate icon
            if (icon) {
                icon.classList.toggle('rotate-180');
            }
        });
    });
}

// ============================================================================
// INITIALIZE ON DOM LOAD
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initFileUpload();
    initSearch();
    initFilter();
    initScrollToTop();
    initLazyLoad();
    initScrollAnimations();
    initTooltips();
    initTabs();
    initAccordion();
    
    // Auto-hide flash messages after 5 seconds
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach(msg => {
        setTimeout(() => {
            msg.classList.add('opacity-0', 'transition-opacity', 'duration-500');
            setTimeout(() => msg.remove(), 500);
        }, 5000);
    });
    
    // Console log
    console.log('%c SICABA - Sistem Informasi Cagar Budaya ', 'background: #059669; color: white; padding: 10px; font-size: 16px;');
    console.log('%c Kota Tasikmalaya ', 'background: #f59e0b; color: white; padding: 5px; font-size: 12px;');
});

// ============================================================================
// EXPORT FUNCTIONS (for external use)
// ============================================================================

window.SICABA = {
    formatRupiah,
    copyToClipboard,
    showNotification,
    confirmDialog,
    openModal,
    closeModal,
    validateForm,
    animateProgressBar
};
