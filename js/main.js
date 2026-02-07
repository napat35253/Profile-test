/**
 * Senior Software Engineer Profile — Main JavaScript
 * Handles: Navigation, scroll animations, particles, counter animation
 */

(function () {
  'use strict';

  // ============================================================
  // Navigation
  // ============================================================
  function initNavigation() {
    var navbar = document.getElementById('navbar');
    var navToggle = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('nav-links');

    if (!navbar) return;

    // Scroll effect
    function handleScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile toggle
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function () {
        var isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', String(isOpen));
      });

      // Close on link click
      var links = navLinks.querySelectorAll('a');
      for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function () {
          navLinks.classList.remove('open');
          navToggle.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      }
    }

    // Active link on scroll
    var sections = document.querySelectorAll('section[id]');
    function highlightNav() {
      var scrollPos = window.scrollY + 200;
      for (var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          var allLinks = navLinks ? navLinks.querySelectorAll('a') : [];
          for (var j = 0; j < allLinks.length; j++) {
            allLinks[j].classList.remove('active');
            if (allLinks[j].getAttribute('href') === '#' + id) {
              allLinks[j].classList.add('active');
            }
          }
        }
      }
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
  }

  // ============================================================
  // Scroll Animations (Intersection Observer)
  // ============================================================
  function initScrollAnimations() {
    var animatedElements = document.querySelectorAll('[data-animate]');
    if (!animatedElements.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: show all
      for (var i = 0; i < animatedElements.length; i++) {
        animatedElements[i].classList.add('visible');
      }
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            var el = entries[i].target;
            var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
            setTimeout(
              function (element) {
                element.classList.add('visible');
              },
              delay,
              el
            );
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    for (var i = 0; i < animatedElements.length; i++) {
      observer.observe(animatedElements[i]);
    }
  }

  // ============================================================
  // Counter Animation
  // ============================================================
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    function animateCounter(element) {
      var target = parseInt(element.getAttribute('data-count'), 10);
      var duration = 2000;
      var start = 0;
      var startTime = null;

      function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
      }

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var current = Math.floor(easeOutCubic(progress) * target);
        element.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          element.textContent = target;
        }
      }

      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < counters.length; i++) {
        counters[i].textContent = counters[i].getAttribute('data-count');
      }
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            animateCounter(entries[i].target);
            observer.unobserve(entries[i].target);
          }
        }
      },
      { threshold: 0.5 }
    );

    for (var i = 0; i < counters.length; i++) {
      observer.observe(counters[i]);
    }
  }

  // ============================================================
  // Floating Particles
  // ============================================================
  function initParticles() {
    var container = document.getElementById('hero-particles');
    if (!container) return;

    var colors = [
      'rgba(59, 130, 246, 0.4)',
      'rgba(220, 38, 38, 0.3)',
      'rgba(59, 130, 246, 0.2)',
    ];

    function createParticle() {
      var particle = document.createElement('div');
      particle.className = 'particle';

      var size = Math.random() * 4 + 1;
      var x = Math.random() * 100;
      var duration = Math.random() * 15 + 10;
      var color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = x + '%';
      particle.style.bottom = '-10px';
      particle.style.background = color;
      particle.style.boxShadow = '0 0 ' + size * 2 + 'px ' + color;
      particle.style.animationDuration = duration + 's';

      container.appendChild(particle);

      setTimeout(function () {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, duration * 1000);
    }

    // Create initial batch
    for (var i = 0; i < 15; i++) {
      setTimeout(createParticle, i * 400);
    }

    // Continue creating particles
    setInterval(createParticle, 2000);
  }

  // ============================================================
  // Smooth scroll for anchor links
  // ============================================================
  function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
        }
      });
    }
  }

  // ============================================================
  // Initialize everything
  // ============================================================
  function init() {
    initNavigation();
    initScrollAnimations();
    initCounters();
    initParticles();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
