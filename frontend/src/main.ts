import './styles/variables.css';
import './styles/base.css';
import './styles/components.css';
import { renderNavbar } from './components/Navbar';
import { renderFooter } from './components/Footer';
import { initRouter } from './router';

// ─── Build the app shell ────────────────────────────────
const app = document.getElementById('app');
if (app) {
  // Insert navbar
  const navbar = renderNavbar();
  app.appendChild(navbar);

  // Main content area (router target)
  const content = document.createElement('main');
  content.id = 'app-content';
  app.appendChild(content);

  // Footer
  const footer = renderFooter();
  app.appendChild(footer);

  // Initialize client-side router
  initRouter();
}
