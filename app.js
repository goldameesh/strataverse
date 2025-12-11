// Main Application Controller for STRATAVERSE
// Handles page navigation, initialization, and core app functionality

// Global state
const appState = {
    currentPage: 'home',
    wizardData: {},
    currentStep: 1,
    totalSteps: 8
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('STRATAVERSE™ Platform Initialized');
    console.log('Version:', CONFIG.app.version);
    
    // Set up navigation
    setupNavigation();
    
    // Show home page by default
    showPage('home');
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Setup navigation handlers
function setupNavigation() {
    // Logo click returns to home
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => showPage('home'));
    }
}

// Show specific page
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show requested page
    const targetPage = document.getElementById(pageName + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
        appState.currentPage = pageName;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update URL hash without triggering navigation
        history.pushState(null, null, '#' + pageName);
    }
    
    // Hide wizard and report containers when navigating to pages
    if (pageName !== 'wizard' && pageName !== 'report') {
        const wizardContainer = document.getElementById('wizardContainer');
        const reportContainer = document.getElementById('reportContainer');
        if (wizardContainer) wizardContainer.style.display = 'none';
        if (reportContainer) reportContainer.style.display = 'none';
    }
}

// Start the strategic analysis wizard
function startWizard() {
    // Reset wizard data
    appState.wizardData = {};
    appState.currentStep = 1;
    
    // Initialize wizard
    if (typeof initializeWizard === 'function') {
        initializeWizard();
    } else {
        console.error('Wizard module not loaded');
        alert('Wizard functionality is being loaded. Please try again in a moment.');
    }
}

// Utility: Format currency
function formatCurrency(value) {
    if (!value) return '$0';
    const num = parseFloat(value);
    if (num >= 1000000000) {
        return '$' + (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return '$' + (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return '$' + (num / 1000).toFixed(1) + 'K';
    }
    return '$' + num.toFixed(0);
}

// Utility: Format number
function formatNumber(value) {
    if (!value) return '0';
    return parseFloat(value).toLocaleString();
}

// Utility: Calculate confidence score
function calculateConfidenceScore(data) {
    let score = 0;
    let maxScore = 0;
    
    // Check completeness of key fields
    const fields = [
        'organization_name',
        'industry',
        'revenue',
        'employees',
        'strategic_objectives',
        'key_challenges',
        'frameworks'
    ];
    
    fields.forEach(field => {
        maxScore += 10;
        if (data[field] && data[field].length > 0) {
            score += 10;
        }
    });
    
    return Math.round((score / maxScore) * 100);
}

// Utility: Generate unique ID
function generateId() {
    return 'analysis_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Utility: Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility: Sanitize HTML
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// Export data as JSON
function exportJSON(data, filename) {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'strataverse-analysis.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Print current page
function printPage() {
    window.print();
}

// Share analysis
function shareAnalysis() {
    if (navigator.share) {
        navigator.share({
            title: 'STRATAVERSE Strategic Analysis',
            text: 'Check out this strategic analysis from STRATAVERSE',
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy link to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}

// Handle browser back/forward
window.addEventListener('popstate', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        showPage(hash);
    } else {
        showPage('home');
    }
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Adjust layouts if needed
        console.log('Window resized');
    }, 250);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Unhandled promise rejection
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// Log application info
console.log('%c STRATAVERSE™ ', 'background: #001F3F; color: #DAA520; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Enterprise Strategic Intelligence Platform ', 'background: #DAA520; color: #001F3F; font-size: 12px; padding: 5px;');
console.log('');
console.log('🎯 Inspired by world-class consulting methodologies');
console.log('📊 15 Strategic Frameworks Available');
console.log('🔒 Secure & Confidential');
console.log('');
console.log('Need help? Email: connect@bhramaastraadvisory.com');
console.log('');