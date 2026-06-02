// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  
  let isMenuOpen = false;
  
  const toggleMobileMenu = (open: boolean | undefined) => {
    isMenuOpen = open !== undefined ? open : !isMenuOpen;
    
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
      if (mobileMenu) mobileMenu.classList.add('open');
      if (mobileMenuButton) mobileMenuButton.setAttribute('aria-expanded', 'true');
    } else {
      document.body.classList.remove('menu-open');
      if (mobileMenu) mobileMenu.classList.remove('open');
      if (mobileMenuButton) mobileMenuButton.setAttribute('aria-expanded', 'false');
    }
  };
  
  // Toggle button
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', (e: Event) => {
      e.stopPropagation();
      toggleMobileMenu(undefined);
    });
  }
  
  // Close button
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', () => {
      toggleMobileMenu(false);
    });
  }
  
  // Close on escape
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleMobileMenu(false);
    }
  });
  
  // Close on nav link click
  const navLinks = mobileMenu && mobileMenu.querySelectorAll('nav a[href^="/"]');
  if (navLinks) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (isMenuOpen) {
          setTimeout(() => toggleMobileMenu(false), 100);
        }
      });
    });
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && isMenuOpen) {
      toggleMobileMenu(false);
    }
  });

  // ─── Desktop Dropdown Accessibility ───
  const dropdownTriggers = document.querySelectorAll<HTMLElement>('.group button[aria-haspopup="true"]');
  
  dropdownTriggers.forEach(trigger => {
    const parent = trigger.closest('.group');
    const dropdown = parent && parent.querySelector<HTMLElement>('.group-hover\\:opacity-100');
    
    if (!dropdown) return;

    function openDropdown() {
      if (!dropdown) return;
      dropdown.classList.remove('opacity-0', 'invisible');
      dropdown.classList.add('opacity-100', 'visible');
    }

    function closeDropdown() {
      if (!dropdown) return;
      dropdown.classList.remove('opacity-100', 'visible');
      dropdown.classList.add('opacity-0', 'invisible');
    }
    
    trigger.addEventListener('focus', openDropdown);
    
    trigger.addEventListener('blur', () => {
      setTimeout(() => {
        if (!dropdown.contains(document.activeElement) && document.activeElement !== trigger) {
          closeDropdown();
        }
      }, 150);
    });

    trigger.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDropdown();
        trigger.focus();
      }
    });
  });

  // Keep dropdown open on item focus
  document.querySelectorAll<HTMLElement>('.group .absolute a').forEach(link => {
    const parent = link.closest('.group');
    const dropdown = parent && parent.querySelector<HTMLElement>('.group-hover\\:opacity-100');
    const trigger = parent && parent.querySelector<HTMLElement>('button[aria-haspopup="true"]');
    
    if (!dropdown || !trigger) return;

    link.addEventListener('focus', () => {
      dropdown.classList.remove('opacity-0', 'invisible');
      dropdown.classList.add('opacity-100', 'visible');
    });
    
    link.addEventListener('blur', () => {
      setTimeout(() => {
        if (!dropdown.contains(document.activeElement) && document.activeElement !== trigger) {
          dropdown.classList.remove('opacity-100', 'visible');
          dropdown.classList.add('opacity-0', 'invisible');
        }
      }, 150);
    });

    link.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dropdown.classList.remove('opacity-100', 'visible');
        dropdown.classList.add('opacity-0', 'invisible');
        trigger.focus();
      }
    });
  });
}

// Use astro:page-load to handle both initial load and view transitions
document.addEventListener('astro:page-load', () => initMobileMenu());

// Also run on initial load as a fallback
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initMobileMenu());
} else {
  initMobileMenu();
}