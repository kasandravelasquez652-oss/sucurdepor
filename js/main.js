document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initScrollAnimations();
  initSkewScroll();
  initPageTransition();
});

function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const hoverElements = document.querySelectorAll('a, button, .product-card');

  if (!cursor) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });

  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hovering');
    });
  });
}

function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-inview');
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll('.reveal-text, .fade-up');
  elementsToAnimate.forEach(el => observer.observe(el));
}

function initSkewScroll() {
  const skewElements = document.querySelectorAll('.skew-scroll');
  if (skewElements.length === 0) return;

  let currentScroll = window.scrollY;
  let targetScroll = window.scrollY;
  
  function update() {
    targetScroll = window.scrollY;
    // Calculate the difference between current and target scroll
    const diff = targetScroll - currentScroll;
    
    // Smooth the current scroll
    currentScroll += diff * 0.1;
    
    // Calculate skew based on scroll speed
    const skew = Math.min(Math.max(diff * 0.05, -5), 5); // Limit between -5 and 5 degrees
    
    skewElements.forEach(el => {
      el.style.transform = `skewY(${skew}deg)`;
    });
    
    requestAnimationFrame(update);
  }
  
  update();
}

function initPageTransition() {
  const transition = document.querySelector('.page-transition');
  if (transition) {
    setTimeout(() => {
      transition.classList.add('is-hidden');
    }, 800);
  }
}
