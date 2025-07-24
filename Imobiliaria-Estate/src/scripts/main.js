// Mobile menu state
let isMobileMenuOpen = false;

// Get active header and its mobile menu (funciona com qualquer header na página)
function getActiveHeaderElements() {
    // Procura por qualquer header na página, independente do ID
    const header = document.querySelector('header') || 
                  document.querySelector('.header') ||
                  document.getElementById('header-v2') ||
                  document.getElementById('header-normal');
    
    let activeHeader, activeMobileMenu, activeMobileMenuBtn;
    
    if (header) {
        activeHeader = header;
        activeMobileMenu = header.querySelector('.mobile-menu');
        activeMobileMenuBtn = header.querySelector('.mobile-menu-btn');
    }
    
    return { activeHeader, activeMobileMenu, activeMobileMenuBtn };
}

// Toggle mobile menu
function toggleMobileMenu() {
    console.log('toggleMobileMenu called'); // Debug
    
    const { activeMobileMenu, activeMobileMenuBtn } = getActiveHeaderElements();
    
    console.log('Elements found:', { // Debug
        menu: activeMobileMenu ? 'found' : 'not found',
        btn: activeMobileMenuBtn ? 'found' : 'not found'
    });
    
    if (!activeMobileMenu || !activeMobileMenuBtn) {
        console.error('Mobile menu elements not found!');
        return;
    }
    
    isMobileMenuOpen = !isMobileMenuOpen;
    
    if (isMobileMenuOpen) {
        activeMobileMenu.classList.add('active');
        activeMobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('mobile-menu-open');
        console.log('Mobile menu opened'); // Debug
    } else {
        activeMobileMenu.classList.remove('active');
        activeMobileMenuBtn.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.body.classList.remove('mobile-menu-open');
        console.log('Mobile menu closed'); // Debug
    }
}

// Close mobile menu
function closeMobileMenu() {
    console.log('closeMobileMenu called'); // Debug
    
    const { activeMobileMenu, activeMobileMenuBtn } = getActiveHeaderElements();
    
    if (!activeMobileMenu || !activeMobileMenuBtn) return;
    
    isMobileMenuOpen = false;
    activeMobileMenu.classList.remove('active');
    activeMobileMenuBtn.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.body.classList.remove('mobile-menu-open');
    
    console.log('Mobile menu closed'); // Debug
}

// Set active navigation item based on current page
function setActiveNavItem() {
    const currentPath = window.location.pathname;
    let currentPage = currentPath.split('/').pop() || 'index.html';
    
    if (currentPage === '' || currentPage === '/' || currentPath === '/') {
        currentPage = 'index.html';
    }
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class based on current page
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Home page detection
        if ((href === './index.html' || href === 'index.html' || href === '../index.html' || href === '../../index.html') && 
            (currentPage === 'index.html' || currentPage === '' || currentPath === '/' || currentPath.endsWith('/index.html'))) {
            link.classList.add('active');
        }
        
        // About page detection
        if ((href === './src/pages/about.html' || href === 'about.html' || href === '../about.html' || href === './about.html') && 
            currentPath.includes('about.html')) {
            link.classList.add('active');
        }
        
        // Properties page detection
        if ((href.includes('properties.html')) && currentPath.includes('properties.html')) {
            link.classList.add('active');
        }
        
        // Agents page detection
        if ((href.includes('agents.html')) && currentPath.includes('agents.html')) {
            link.classList.add('active');
        }
        
        // Blog page detection
        if ((href.includes('blog.html')) && currentPath.includes('blog.html')) {
            link.classList.add('active');
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (!isMobileMenuOpen) return;
    
    const { activeMobileMenu, activeMobileMenuBtn } = getActiveHeaderElements();
    
    if (activeMobileMenu && activeMobileMenuBtn &&
        !activeMobileMenu.contains(event.target) && 
        !activeMobileMenuBtn.contains(event.target)) {
        closeMobileMenu();
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 425 && isMobileMenuOpen) {
        closeMobileMenu();
    }
});

// Add click event listeners to navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Close mobile menu for any navigation
            if (isMobileMenuOpen) {
                closeMobileMenu();
            }
            
            // For hash links or empty links, prevent default
            if (href.startsWith('#') || href === '') {
                e.preventDefault();
            }
        });
    });
});

// Header scroll effect
let lastScrollTop = 0;
let scrollTimeout;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const { activeHeader } = getActiveHeaderElements();
    
    if (!activeHeader) return;
    
    clearTimeout(scrollTimeout);
    activeHeader.classList.add('scrolling');
    
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        activeHeader.classList.add('header-hidden');
    } else {
        activeHeader.classList.remove('header-hidden');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    
    scrollTimeout = setTimeout(() => {
        if (activeHeader) {
            activeHeader.classList.remove('scrolling');
        }
    }, 150);
});

// Prevent scroll when mobile menu is open
function preventScroll(e) {
    if (isMobileMenuOpen) {
        e.preventDefault();
    }
}

document.addEventListener('touchmove', preventScroll, { passive: false });

// Get Started button functionality
document.addEventListener('DOMContentLoaded', function() {
    const getStartedButtons = document.querySelectorAll('.btn-primary, .mobile-btn-primary');
    
    getStartedButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (isMobileMenuOpen) {
                closeMobileMenu();
            }
            
            const confirmAction = confirm('Deseja ser redirecionado para a página de contato?');
            if (confirmAction) {
                alert('Aqui você redirecionaria para a página de contato!');
            }
        });
    });
});

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
    }
    
    if ((e.key === 'Enter' || e.key === ' ') && 
        document.activeElement.classList.contains('mobile-menu-btn')) {
        e.preventDefault();
        toggleMobileMenu();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...'); // Debug
    
    // Debug: Check what elements exist
    const { activeHeader, activeMobileMenu, activeMobileMenuBtn } = getActiveHeaderElements();
    console.log('Page initialization:', {
        header: activeHeader ? activeHeader.tagName + '#' + activeHeader.id : 'not found',
        mobileMenu: activeMobileMenu ? 'found' : 'not found',
        mobileMenuBtn: activeMobileMenuBtn ? 'found' : 'not found',
        currentPath: window.location.pathname
    });
    
    // Set active navigation item
    setActiveNavItem();
    
    // Ensure mobile menu is closed
    if (activeMobileMenu && activeMobileMenuBtn) {
        activeMobileMenu.classList.remove('active');
        activeMobileMenuBtn.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.body.classList.remove('mobile-menu-open');
        isMobileMenuOpen = false;
    }
    
    // Add loading animation
    if (activeHeader) {
        activeHeader.style.opacity = '0';
        activeHeader.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            activeHeader.style.transition = 'all 0.6s ease';
            activeHeader.style.opacity = '1';
            activeHeader.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Debug function - chame no console para verificar
window.debugHeader = function() {
    const { activeHeader, activeMobileMenu, activeMobileMenuBtn } = getActiveHeaderElements();
    console.log('=== DEBUG HEADER ===');
    console.log('Header found:', activeHeader);
    console.log('Mobile menu found:', activeMobileMenu);
    console.log('Mobile menu button found:', activeMobileMenuBtn);
    console.log('Is mobile menu open:', isMobileMenuOpen);
    console.log('Current path:', window.location.pathname);
    console.log('Window width:', window.innerWidth);
    
    // Test click on mobile menu button
    if (activeMobileMenuBtn) {
        console.log('Mobile menu button click listener:', activeMobileMenuBtn.onclick);
        console.log('Mobile menu button classes:', activeMobileMenuBtn.className);
    }
};