export function renderNavbar(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'header';
  
  // Two-tier header structure
  header.innerHTML = `
    <div class="header__utility">
      <div class="container header__utility-inner">
        <span class="header__utility-text">Election Commission of India Guidelines</span>
        <span class="header__utility-helpline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          Voter Helpline: 1950
        </span>
      </div>
    </div>
    <div class="header__main">
      <div class="container header__main-inner">
        <a href="/" class="header__logo" data-link>
          <img src="/assets/ashoka-chakra.png" alt="Chakra Logo" class="header__logo-img" />
          <span>Indian Election Assistant</span>
        </a>

        <button class="nav__toggle" id="nav-toggle" aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav class="nav__menu" id="nav-menu">
          <!-- Desktop primary + secondary links, mobile handles these via CSS display -->
          <a href="/" class="nav__link desktop-only" data-link>Home</a>
          <a href="/chat" class="nav__link desktop-only" data-link>Chat</a>
          <a href="/register" class="nav__link desktop-only" data-link>Register</a>
          <a href="/voter-info" class="nav__link desktop-only" data-link>Voter Info</a>
          
          <div class="nav__divider desktop-only"></div>
          
          <a href="/timeline" class="nav__link" data-link>Timeline</a>
          <a href="/forms" class="nav__link" data-link>Forms</a>
          <a href="/about" class="nav__link" data-link>About</a>
        </nav>
      </div>
    </div>

    <!-- Mobile Bottom Tab Bar -->
    <nav class="mobile-tab-bar">
      <a href="/" class="tab-link" data-link>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>Home</span>
      </a>
      <a href="/chat" class="tab-link" data-link>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span>Chat</span>
      </a>
      <a href="/register" class="tab-link" data-link>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
        <span>Register</span>
      </a>
      <a href="/voter-info" class="tab-link" data-link>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <span>Info</span>
      </a>
    </nav>
  `;

  // Attach toggle listener
  setTimeout(() => {
    const navToggle = header.querySelector('#nav-toggle');
    const navMenu = header.querySelector('#nav-menu');
    navToggle?.addEventListener('click', () => {
      navMenu?.classList.toggle('nav__menu--open');
      navToggle.classList.toggle('nav__toggle--active');
    });

    // Close on link click
    header.querySelectorAll('.nav__link[data-link]').forEach(link => {
      link.addEventListener('click', () => {
        navMenu?.classList.remove('nav__menu--open');
        navToggle?.classList.remove('nav__toggle--active');
      });
    });
  }, 0);

  return header;
}
