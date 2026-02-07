/**
 * Profile Page Tests
 * Tests DOM structure, navigation, animations, and interactivity
 */

const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf-8');
const css = fs.readFileSync(path.join(__dirname, '..', 'css', 'style.css'), 'utf-8');
const js = fs.readFileSync(path.join(__dirname, '..', 'js', 'main.js'), 'utf-8');

beforeEach(() => {
  document.documentElement.innerHTML = html;
});

// ============================================================
// HTML Structure Tests
// ============================================================
describe('HTML Structure', () => {
  test('has correct document title', () => {
    const title = document.querySelector('title');
    expect(title).not.toBeNull();
    expect(title.textContent).toContain('Alex Morgan');
  });

  test('has meta viewport tag for responsiveness', () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    expect(viewport).not.toBeNull();
    expect(viewport.getAttribute('content')).toContain('width=device-width');
  });

  test('has meta description', () => {
    const desc = document.querySelector('meta[name="description"]');
    expect(desc).not.toBeNull();
    expect(desc.getAttribute('content').length).toBeGreaterThan(10);
  });

  test('links CSS stylesheet', () => {
    const link = document.querySelector('link[rel="stylesheet"][href*="style.css"]');
    expect(link).not.toBeNull();
  });

  test('links JavaScript file', () => {
    const script = document.querySelector('script[src*="main.js"]');
    expect(script).not.toBeNull();
  });
});

// ============================================================
// Navigation Tests
// ============================================================
describe('Navigation', () => {
  test('has navigation bar', () => {
    const nav = document.getElementById('navbar');
    expect(nav).not.toBeNull();
  });

  test('has navigation role attribute', () => {
    const nav = document.querySelector('nav[role="navigation"]');
    expect(nav).not.toBeNull();
  });

  test('has logo link', () => {
    const logo = document.querySelector('.nav-logo');
    expect(logo).not.toBeNull();
    expect(logo.tagName).toBe('A');
  });

  test('has mobile toggle button', () => {
    const toggle = document.getElementById('nav-toggle');
    expect(toggle).not.toBeNull();
    expect(toggle.getAttribute('aria-label')).toBeTruthy();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  test('has all navigation links', () => {
    const links = document.querySelectorAll('#nav-links a');
    const hrefs = Array.from(links).map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('#about');
    expect(hrefs).toContain('#skills');
    expect(hrefs).toContain('#experience');
    expect(hrefs).toContain('#projects');
    expect(hrefs).toContain('#contact');
  });

  test('navigation links have menuitem role', () => {
    const links = document.querySelectorAll('#nav-links a[role="menuitem"]');
    expect(links.length).toBe(5);
  });
});

// ============================================================
// Hero Section Tests
// ============================================================
describe('Hero Section', () => {
  test('has hero section', () => {
    const hero = document.getElementById('hero');
    expect(hero).not.toBeNull();
  });

  test('displays name', () => {
    const name = document.querySelector('.hero-name');
    expect(name).not.toBeNull();
    expect(name.textContent).toContain('Alex');
    expect(name.textContent).toContain('Morgan');
  });

  test('displays title', () => {
    const title = document.querySelector('.hero-title');
    expect(title).not.toBeNull();
    expect(title.textContent).toContain('Senior Software Engineer');
  });

  test('has call-to-action buttons', () => {
    const buttons = document.querySelectorAll('.hero-cta .btn');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  test('has statistics section', () => {
    const stats = document.querySelectorAll('.stat');
    expect(stats.length).toBe(3);
  });

  test('stats have data-count attributes', () => {
    const counters = document.querySelectorAll('[data-count]');
    expect(counters.length).toBe(3);
    counters.forEach((counter) => {
      const val = parseInt(counter.getAttribute('data-count'));
      expect(val).toBeGreaterThan(0);
    });
  });

  test('has particle container', () => {
    const particles = document.getElementById('hero-particles');
    expect(particles).not.toBeNull();
  });
});

// ============================================================
// About Section Tests
// ============================================================
describe('About Section', () => {
  test('has about section', () => {
    const about = document.getElementById('about');
    expect(about).not.toBeNull();
  });

  test('has section title with number', () => {
    const number = about().querySelector('.section-number');
    expect(number).not.toBeNull();
    expect(number.textContent).toContain('01');
  });

  test('has profile image area', () => {
    const img = document.querySelector('.about-image');
    expect(img).not.toBeNull();
  });

  test('has about text content', () => {
    const text = document.querySelector('.about-text');
    expect(text).not.toBeNull();
    const paragraphs = text.querySelectorAll('p');
    expect(paragraphs.length).toBeGreaterThanOrEqual(2);
  });

  test('has detail items', () => {
    const details = document.querySelectorAll('.about-details .detail');
    expect(details.length).toBeGreaterThanOrEqual(3);
  });
});

function about() {
  return document.getElementById('about');
}

// ============================================================
// Skills Section Tests
// ============================================================
describe('Skills Section', () => {
  test('has skills section', () => {
    const skills = document.getElementById('skills');
    expect(skills).not.toBeNull();
  });

  test('has skill categories', () => {
    const categories = document.querySelectorAll('.skill-category');
    expect(categories.length).toBeGreaterThanOrEqual(4);
  });

  test('each category has title and tags', () => {
    const categories = document.querySelectorAll('.skill-category');
    categories.forEach((cat) => {
      const title = cat.querySelector('h3');
      expect(title).not.toBeNull();
      expect(title.textContent.trim().length).toBeGreaterThan(0);

      const tags = cat.querySelectorAll('.skill-tag');
      expect(tags.length).toBeGreaterThan(0);
    });
  });

  test('has icons for each category', () => {
    const icons = document.querySelectorAll('.skill-icon');
    const categories = document.querySelectorAll('.skill-category');
    expect(icons.length).toBe(categories.length);
  });
});

// ============================================================
// Experience Section Tests
// ============================================================
describe('Experience Section', () => {
  test('has experience section', () => {
    const exp = document.getElementById('experience');
    expect(exp).not.toBeNull();
  });

  test('has timeline items', () => {
    const items = document.querySelectorAll('.timeline-item');
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  test('each timeline item has required content', () => {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item) => {
      expect(item.querySelector('h3')).not.toBeNull();
      expect(item.querySelector('.timeline-company')).not.toBeNull();
      expect(item.querySelector('.timeline-date')).not.toBeNull();
      expect(item.querySelectorAll('.timeline-details li').length).toBeGreaterThan(0);
    });
  });
});

// ============================================================
// Projects Section Tests
// ============================================================
describe('Projects Section', () => {
  test('has projects section', () => {
    const projects = document.getElementById('projects');
    expect(projects).not.toBeNull();
  });

  test('has project cards', () => {
    const cards = document.querySelectorAll('.project-card');
    expect(cards.length).toBeGreaterThanOrEqual(4);
  });

  test('project cards are article elements', () => {
    const articles = document.querySelectorAll('article.project-card');
    expect(articles.length).toBeGreaterThanOrEqual(4);
  });

  test('each project has title, description, and tech stack', () => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => {
      expect(card.querySelector('.project-title')).not.toBeNull();
      expect(card.querySelector('.project-description')).not.toBeNull();
      const techs = card.querySelectorAll('.project-tech span');
      expect(techs.length).toBeGreaterThan(0);
    });
  });

  test('each project has GitHub and demo links', () => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => {
      const links = card.querySelectorAll('.project-link');
      expect(links.length).toBe(2);
    });
  });
});

// ============================================================
// Contact Section Tests
// ============================================================
describe('Contact Section', () => {
  test('has contact section', () => {
    const contact = document.getElementById('contact');
    expect(contact).not.toBeNull();
  });

  test('has email CTA button', () => {
    const btn = document.querySelector('.contact .btn');
    expect(btn).not.toBeNull();
    expect(btn.getAttribute('href')).toContain('mailto:');
  });

  test('has social links', () => {
    const socials = document.querySelectorAll('.social-link');
    expect(socials.length).toBeGreaterThanOrEqual(4);
  });

  test('social links have aria-labels', () => {
    const socials = document.querySelectorAll('.social-link');
    socials.forEach((link) => {
      expect(link.getAttribute('aria-label')).toBeTruthy();
    });
  });
});

// ============================================================
// Footer Tests
// ============================================================
describe('Footer', () => {
  test('has footer element', () => {
    const footer = document.querySelector('footer');
    expect(footer).not.toBeNull();
  });

  test('has copyright text', () => {
    const text = document.querySelector('.footer-sub');
    expect(text).not.toBeNull();
    expect(text.textContent).toContain('2025');
  });
});

// ============================================================
// Accessibility Tests
// ============================================================
describe('Accessibility', () => {
  test('has lang attribute on html', () => {
    // innerHTML assignment doesn't set attributes on root element,
    // so we verify lang="en" exists in the raw HTML source instead
    expect(html).toMatch(/<html[^>]+lang="en"/);
  });

  test('nav has aria-label', () => {
    const nav = document.querySelector('nav[aria-label]');
    expect(nav).not.toBeNull();
  });

  test('decorative elements have aria-hidden', () => {
    const bgGrid = document.querySelector('.hero-bg-grid');
    expect(bgGrid.getAttribute('aria-hidden')).toBe('true');

    const particles = document.querySelector('.hero-particles');
    expect(particles.getAttribute('aria-hidden')).toBe('true');
  });

  test('all sections have data-animate attributes for scroll animations', () => {
    const animated = document.querySelectorAll('[data-animate]');
    expect(animated.length).toBeGreaterThan(10);
  });
});

// ============================================================
// CSS Tests
// ============================================================
describe('CSS', () => {
  test('CSS file is not empty', () => {
    expect(css.length).toBeGreaterThan(1000);
  });

  test('uses the blue/black/red color scheme', () => {
    expect(css).toContain('#3b82f6'); // blue
    expect(css).toContain('#dc2626'); // red
    expect(css).toContain('#0a0a0f'); // black
  });

  test('has responsive media queries', () => {
    const mediaQueries = css.match(/@media/g);
    expect(mediaQueries.length).toBeGreaterThanOrEqual(3);
  });

  test('has CSS custom properties', () => {
    expect(css).toContain(':root');
    expect(css).toContain('--blue');
    expect(css).toContain('--red');
    expect(css).toContain('--black');
  });

  test('has animation keyframes', () => {
    expect(css).toContain('@keyframes');
  });
});

// ============================================================
// JavaScript Tests
// ============================================================
describe('JavaScript', () => {
  test('JS file is not empty', () => {
    expect(js.length).toBeGreaterThan(500);
  });

  test('has navigation initialization', () => {
    expect(js).toContain('initNavigation');
  });

  test('has scroll animation initialization', () => {
    expect(js).toContain('initScrollAnimations');
  });

  test('has counter animation', () => {
    expect(js).toContain('initCounters');
  });

  test('has particle system', () => {
    expect(js).toContain('initParticles');
  });

  test('has smooth scroll', () => {
    expect(js).toContain('initSmoothScroll');
  });

  test('uses IntersectionObserver', () => {
    expect(js).toContain('IntersectionObserver');
  });

  test('has IIFE wrapper for encapsulation', () => {
    expect(js).toMatch(/\(function\s*\(\)\s*\{/);
  });
});
