/**
 * XOtheme Main JavaScript
 * Handles mobile navigation and theme management
 */

// Theme Management Class
class ThemeManager {
  private readonly storageKey = 'xotheme-theme';
  private htmlElement: HTMLElement;
  
  constructor() {
    this.htmlElement = document.documentElement;
    this.initializeTheme();
    this.bindEvents();
  }
  
  private initializeTheme(): void {
    // Check localStorage first
    const savedTheme = localStorage.getItem(this.storageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.setTheme(savedTheme);
      return;
    }
    
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme(prefersDark ? 'dark' : 'light');
  }
  
  private setTheme(theme: 'light' | 'dark'): void {
    this.htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.storageKey, theme);
  }
  
  private getCurrentTheme(): 'light' | 'dark' {
    const current = this.htmlElement.getAttribute('data-theme');
    return current === 'dark' ? 'dark' : 'light';
  }
  
  public toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  private bindEvents(): void {
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem(this.storageKey)) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

// Mobile Navigation Class
class MobileNavigation {
  private toggleButton: HTMLElement | null;
  private navigation: HTMLElement | null;
  private overlay: HTMLElement | null;
  private closeButton: HTMLElement | null;
  private navLinks: NodeListOf<HTMLElement>;
  private isOpen = false;
  
  constructor() {
    this.initializeElements();
    this.bindEvents();
    this.initializeTabOrder();
  }
  
  private initializeElements(): void {
    this.toggleButton = document.querySelector('.mobile-menu-toggle');
    this.navigation = document.querySelector('.main-navigation');
    this.overlay = document.querySelector('.mobile-menu-overlay');
    this.closeButton = document.querySelector('.mobile-menu-close');
    this.navLinks = document.querySelectorAll('.nav-link');
  }
  
  private initializeTabOrder(): void {
    // On page load, manage tab order based on viewport
    if (window.innerWidth >= 900) {
      // Desktop: show nav links in tab order, hide mobile toggle
      this.showInTabOrder();
      this.toggleButton?.setAttribute('aria-hidden', 'true');
      this.toggleButton?.setAttribute('tabindex', '-1');
    } else {
      // Mobile: hide nav links since menu starts closed, show mobile toggle
      this.hideFromTabOrder();
      this.toggleButton?.removeAttribute('aria-hidden');
      this.toggleButton?.removeAttribute('tabindex');
    }
    
    // Listen for window resize to manage tab order
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 900) {
        // Desktop: always show nav links in tab order, hide mobile toggle
        this.showInTabOrder();
        this.toggleButton?.setAttribute('aria-hidden', 'true');
        this.toggleButton?.setAttribute('tabindex', '-1');
      } else {
        // Mobile: manage based on menu state
        this.toggleButton?.removeAttribute('aria-hidden');
        this.toggleButton?.removeAttribute('tabindex');
        if (this.isOpen) {
          this.showInTabOrder();
        } else {
          this.hideFromTabOrder();
        }
      }
    });
  }
  
  private hideFromTabOrder(): void {
    // Hide navigation links from tab order
    this.navLinks.forEach(link => {
      link.setAttribute('tabindex', '-1');
    });
    
    // Hide close button from tab order
    if (this.closeButton) {
      this.closeButton.setAttribute('tabindex', '-1');
    }
  }
  
  private showInTabOrder(): void {
    // Restore navigation links to tab order
    this.navLinks.forEach(link => {
      link.removeAttribute('tabindex');
    });
    
    // Restore close button to tab order
    if (this.closeButton) {
      this.closeButton.removeAttribute('tabindex');
    }
  }
  
  private bindEvents(): void {
    // Toggle button
    this.toggleButton?.addEventListener('click', () => {
      this.toggle();
    });
    
    // Close button
    this.closeButton?.addEventListener('click', () => {
      this.close();
    });
    
    // Overlay click to close
    this.overlay?.addEventListener('click', () => {
      this.close();
    });
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    // Close on window resize to desktop size
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 900 && this.isOpen) {
        this.close();
      }
    });
  }
  
  private toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  
  private open(): void {
    this.isOpen = true;
    this.navigation?.classList.add('active');
    this.overlay?.classList.add('active');
    this.toggleButton?.setAttribute('aria-expanded', 'true');
    
    // Show navigation items in tab order
    this.showInTabOrder();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus management - focus first nav link
    const firstNavLink = this.navigation?.querySelector('.nav-link') as HTMLElement;
    firstNavLink?.focus();
  }
  
  private close(): void {
    this.isOpen = false;
    this.navigation?.classList.remove('active');
    this.overlay?.classList.remove('active');
    this.toggleButton?.setAttribute('aria-expanded', 'false');
    
    // Hide navigation items from tab order (mobile only)
    if (window.innerWidth < 900) {
      this.hideFromTabOrder();
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to toggle button
    this.toggleButton?.focus();
  }
}

// Keyboard Shortcuts Class
class ShortcutManager {
  private helpModal: HTMLElement | null = null;
  private isModalOpen = false;
  private isGKeyPressed = false;
  
  constructor() {
    this.createHelpModal();
    this.bindEvents();
  }
  
  private createHelpModal(): void {
    // Create the help modal dynamically
    const modal = document.createElement('div');
    modal.id = 'help-modal';
    modal.className = 'help-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'help-title');
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
      <div class="help-modal-backdrop">
        <div class="help-modal-content">
          <header class="help-modal-header">
            <h2 id="help-title">Keyboard Shortcuts</h2>
            <button class="help-modal-close" aria-label="Close help">&times;</button>
          </header>
          <div class="help-modal-body">
            <div class="shortcuts-list">
              <div class="shortcut-group">
                <div class="shortcut-keys">
                  <kbd>?</kbd>
                </div>
                <div class="shortcut-description">Show/hide this help</div>
              </div>
              
              <div class="shortcut-group">
                <div class="shortcut-keys">
                  <kbd>t</kbd>
                </div>
                <div class="shortcut-description">Toggle light/dark theme</div>
              </div>
              
              <div class="shortcut-group">
                <div class="shortcut-keys">
                  <kbd>g</kbd>
                  <span class="key-separator">then</span>
                  <kbd>h</kbd>
                </div>
                <div class="shortcut-description">Go to Home</div>
              </div>
              
              <div class="shortcut-group">
                <div class="shortcut-keys">
                  <kbd>g</kbd>
                  <span class="key-separator">then</span>
                  <kbd>a</kbd>
                </div>
                <div class="shortcut-description">Go to About</div>
              </div>
              
              <div class="shortcut-group">
                <div class="shortcut-keys">
                  <kbd>g</kbd>
                  <span class="key-separator">then</span>
                  <kbd>p</kbd>
                </div>
                <div class="shortcut-description">Go to Projects</div>
              </div>
              
              <div class="shortcut-group">
                <div class="shortcut-keys">
                  <kbd>g</kbd>
                  <span class="key-separator">then</span>
                  <kbd>j</kbd>
                </div>
                <div class="shortcut-description">Go to Journal</div>
              </div>
              
              <div class="shortcut-group">
                <div class="shortcut-keys">
                  <kbd>Esc</kbd>
                </div>
                <div class="shortcut-description">Close modals</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    this.helpModal = modal;
    
    // Bind close button
    const closeButton = modal.querySelector('.help-modal-close');
    closeButton?.addEventListener('click', () => this.closeHelp());
    
    // Close on backdrop click
    const backdrop = modal.querySelector('.help-modal-backdrop');
    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        this.closeHelp();
      }
    });
  }
  
  private bindEvents(): void {
    document.addEventListener('keydown', (e) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      switch (e.key) {
        case '?':
          e.preventDefault();
          this.toggleHelp();
          break;
          
        case 't':
          e.preventDefault();
          themeManager.toggleTheme();
          break;
          
        case 'g':
          e.preventDefault();
          this.isGKeyPressed = true;
          // Reset after 2 seconds
          setTimeout(() => {
            this.isGKeyPressed = false;
          }, 2000);
          break;
          
        case 'h':
          if (this.isGKeyPressed) {
            e.preventDefault();
            this.navigate('/');
            this.isGKeyPressed = false;
          }
          break;
          
        case 'a':
          if (this.isGKeyPressed) {
            e.preventDefault();
            this.navigate('/about/');
            this.isGKeyPressed = false;
          }
          break;
          
        case 'p':
          if (this.isGKeyPressed) {
            e.preventDefault();
            this.navigate('/projects/');
            this.isGKeyPressed = false;
          }
          break;
          
        case 'j':
          if (this.isGKeyPressed) {
            e.preventDefault();
            this.navigate('/journal/');
            this.isGKeyPressed = false;
          }
          break;
          
        case 'Escape':
          if (this.isModalOpen) {
            e.preventDefault();
            this.closeHelp();
          }
          break;
      }
    });
  }
  
  private navigate(path: string): void {
    window.location.href = path;
  }
  
  public toggleHelp(): void {
    if (this.isModalOpen) {
      this.closeHelp();
    } else {
      this.openHelp();
    }
  }
  
  private openHelp(): void {
    if (!this.helpModal) return;
    
    this.isModalOpen = true;
    this.helpModal.setAttribute('aria-hidden', 'false');
    this.helpModal.classList.add('active');
    
    // Focus the first focusable element
    const closeButton = this.helpModal.querySelector('.help-modal-close') as HTMLElement;
    closeButton?.focus();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Trap focus within modal
    this.trapFocus();
  }
  
  private closeHelp(): void {
    if (!this.helpModal) return;
    
    this.isModalOpen = false;
    this.helpModal.setAttribute('aria-hidden', 'true');
    this.helpModal.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Remove focus trap
    this.removeFocusTrap();
  }
  
  private trapFocus(): void {
    if (!this.helpModal) return;
    
    const focusableElements = this.helpModal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    this.helpModal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }
  
  private removeFocusTrap(): void {
    // Focus trap is removed when modal is closed since we don't store the handler
    // The event listener will be removed when the modal element is removed
  }
}

// Options Menu Class
class OptionsMenu {
  private toggleButton: HTMLElement | null;
  private dropdown: HTMLElement | null;
  private menuItems: NodeListOf<HTMLElement>;
  private isOpen = false;
  
  constructor() {
    this.initializeElements();
    this.bindEvents();
    this.initializeTabOrder();
  }
  
  private initializeElements(): void {
    this.toggleButton = document.getElementById('options-toggle');
    this.dropdown = document.querySelector('.options-dropdown');
    this.menuItems = document.querySelectorAll('.options-item');
  }
  
  private initializeTabOrder(): void {
    // Initially hide dropdown items from tab order
    this.hideFromTabOrder();
  }
  
  private hideFromTabOrder(): void {
    this.menuItems.forEach(item => {
      item.setAttribute('tabindex', '-1');
    });
  }
  
  private showInTabOrder(): void {
    this.menuItems.forEach(item => {
      item.removeAttribute('tabindex');
    });
  }
  
  private bindEvents(): void {
    // Toggle button
    this.toggleButton?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.toggleButton?.contains(e.target as Node) && !this.dropdown?.contains(e.target as Node)) {
        this.close();
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    // Close menu when option is selected
    this.dropdown?.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('options-item')) {
        this.close();
      }
    });
  }
  
  private toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  
  private open(): void {
    this.isOpen = true;
    this.dropdown?.classList.add('active');
    this.toggleButton?.setAttribute('aria-expanded', 'true');
    
    // Show menu items in tab order
    this.showInTabOrder();
    
    // Focus first menu item
    const firstItem = this.dropdown?.querySelector('.options-item') as HTMLElement;
    firstItem?.focus();
  }
  
  private close(): void {
    this.isOpen = false;
    this.dropdown?.classList.remove('active');
    this.toggleButton?.setAttribute('aria-expanded', 'false');
    
    // Hide menu items from tab order
    this.hideFromTabOrder();
    
    // Return focus to toggle button
    this.toggleButton?.focus();
  }
}

// Initialize everything when DOM is ready
let themeManager: ThemeManager;
let mobileNav: MobileNavigation;
let shortcutManager: ShortcutManager;
let progressBar: ReadingProgressBar;
let optionsMenu: OptionsMenu;

// Reading Progress Bar Class
class ReadingProgressBar {
  private progressElement: HTMLElement | null;
  
  constructor() {
    this.progressElement = document.getElementById('reading-progress');
    this.bindEvents();
    this.updateProgress(); // Set initial state
  }
  
  private bindEvents(): void {
    window.addEventListener('scroll', () => this.updateProgress(), { passive: true });
    window.addEventListener('resize', () => this.updateProgress(), { passive: true });
  }
  
  private updateProgress(): void {
    if (!this.progressElement) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (scrollHeight <= 0) {
      this.progressElement.style.width = '0%';
      return;
    }
    
    const progress = Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100);
    this.progressElement.style.width = `${progress}%`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  themeManager = new ThemeManager();
  mobileNav = new MobileNavigation();
  shortcutManager = new ShortcutManager();
  progressBar = new ReadingProgressBar();
  optionsMenu = new OptionsMenu();
  
  // Bind theme toggle button if it exists
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle?.addEventListener('click', () => {
    themeManager.toggleTheme();
  });
  
  // Bind help button if it exists
  const helpToggle = document.getElementById('help-toggle');
  helpToggle?.addEventListener('click', () => {
    shortcutManager.toggleHelp();
  });
});
