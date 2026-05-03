import { renderHomePage } from './pages/HomePage';
import { renderRegisterPage } from './pages/RegisterPage';
import { renderTimelinePage } from './pages/TimelinePage';
import { renderFormsPage } from './pages/FormsPage';
import { renderVoterInfoPage } from './pages/VoterInfoPage';
import { renderChatPage } from './pages/ChatPage';
import { renderAboutPage } from './pages/AboutPage';

const routes: Record<string, () => HTMLElement> = {
  '/': renderHomePage,
  '/register': renderRegisterPage,
  '/timeline': renderTimelinePage,
  '/forms': renderFormsPage,
  '/voter-info': renderVoterInfoPage,
  '/chat': renderChatPage,
  '/about': renderAboutPage,
};

export function initRouter() {
  const appContainer = document.getElementById('app-content');
  if (!appContainer) return;

  function render(path: string) {
    appContainer!.innerHTML = '';
    const renderFn = routes[path] || routes['/'];
    appContainer!.appendChild(renderFn());
    updateActiveNavLinks(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  window.addEventListener('popstate', () => {
    render(window.location.pathname);
  });

  document.body.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('a');
    if (target && target.matches('[data-link]')) {
      e.preventDefault();
      const href = target.getAttribute('href')!;
      if (href !== window.location.pathname) {
        window.history.pushState(null, '', href);
        render(href);
      }
    }
  });

  render(window.location.pathname);
}

function updateActiveNavLinks(currentPath: string) {
  document.querySelectorAll('.nav__link').forEach(link => {
    link.classList.remove('nav__link--active');
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('nav__link--active');
    }
  });
}
