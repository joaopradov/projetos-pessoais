let isMobileMenuOpen = false;

function getActiveHeaderElements() {
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

function toggleMobileMenu() {
    console.log('toggleMobileMenu called');
    
    const { activeMobileMenu, activeMobileMenuBtn } = getActiveHeaderElements();
    
    console.log('Elements found:', {
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
        console.log('Mobile menu opened');
    } else {
        activeMobileMenu.classList.remove('active');
        activeMobileMenuBtn.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.body.classList.remove('mobile-menu-open');
        console.log('Mobile menu closed');
    }
}

function closeMobileMenu() {
    console.log('closeMobileMenu called');
    
    const { activeMobileMenu, activeMobileMenuBtn } = getActiveHeaderElements();
    
    if (!activeMobileMenu || !activeMobileMenuBtn) return;
    
    isMobileMenuOpen = false;
    activeMobileMenu.classList.remove('active');
    activeMobileMenuBtn.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.body.classList.remove('mobile-menu-open');
    
    console.log('Mobile menu closed');
}

function setActiveNavItem() {
    const currentPath = window.location.pathname;
    let currentPage = currentPath.split('/').pop() || 'index.html';
    
    if (currentPage === '' || currentPage === '/' || currentPath === '/') {
        currentPage = 'index.html';
    }

    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        if ((href === './index.html' || href === 'index.html' || href === '../index.html' || href === '../../index.html') && 
            (currentPage === 'index.html' || currentPage === '' || currentPath === '/' || currentPath.endsWith('/index.html'))) {
            link.classList.add('active');
        }

        if ((href === './src/pages/about.html' || href === 'about.html' || href === '../about.html' || href === './about.html') && 
            currentPath.includes('about.html')) {
            link.classList.add('active');
        }

        if ((href.includes('properties.html')) && currentPath.includes('properties.html')) {
            link.classList.add('active');
        }

        if ((href.includes('agents.html')) && currentPath.includes('agents.html')) {
            link.classList.add('active');
        }

        if ((href.includes('blog.html')) && currentPath.includes('blog.html')) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('click', function(event) {
    if (!isMobileMenuOpen) return;
    
    const { activeMobileMenu, activeMobileMenuBtn } = getActiveHeaderElements();
    
    if (activeMobileMenu && activeMobileMenuBtn &&
        !activeMobileMenu.contains(event.target) && 
        !activeMobileMenuBtn.contains(event.target)) {
        closeMobileMenu();
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 425 && isMobileMenuOpen) {
        closeMobileMenu();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (isMobileMenuOpen) {
                closeMobileMenu();
            }

            if (href.startsWith('#') || href === '') {
                e.preventDefault();
            }
        });
    });
});

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

function preventScroll(e) {
    if (isMobileMenuOpen) {
        e.preventDefault();
    }
}

document.addEventListener('touchmove', preventScroll, { passive: false });

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

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');

    const { activeHeader, activeMobileMenu, activeMobileMenuBtn } = getActiveHeaderElements();
    console.log('Page initialization:', {
        header: activeHeader ? activeHeader.tagName + '#' + activeHeader.id : 'not found',
        mobileMenu: activeMobileMenu ? 'found' : 'not found',
        mobileMenuBtn: activeMobileMenuBtn ? 'found' : 'not found',
        currentPath: window.location.pathname
    });

    setActiveNavItem();

    if (activeMobileMenu && activeMobileMenuBtn) {
        activeMobileMenu.classList.remove('active');
        activeMobileMenuBtn.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.body.classList.remove('mobile-menu-open');
        isMobileMenuOpen = false;
    }

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

window.debugHeader = function() {
    const { activeHeader, activeMobileMenu, activeMobileMenuBtn } = getActiveHeaderElements();
    console.log('=== DEBUG HEADER ===');
    console.log('Header found:', activeHeader);
    console.log('Mobile menu found:', activeMobileMenu);
    console.log('Mobile menu button found:', activeMobileMenuBtn);
    console.log('Is mobile menu open:', isMobileMenuOpen);
    console.log('Current path:', window.location.pathname);
    console.log('Window width:', window.innerWidth);

    if (activeMobileMenuBtn) {
        console.log('Mobile menu button click listener:', activeMobileMenuBtn.onclick);
        console.log('Mobile menu button classes:', activeMobileMenuBtn.className);
    }
};