(function(){
  // Ensure tab title is updated everywhere if an old cached title remains
  if(document && typeof document.title === 'string' && document.title.includes('Personal Website')){
    document.title = 'Baihui Chen';
  }
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if(toggle && nav){
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
  
  // Reset scroll position when page loads
  window.addEventListener('load', function() {
    // Smooth scroll to top on page load
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Also reset on DOM content loaded for faster response
  document.addEventListener('DOMContentLoaded', function() {
    // Reset scroll position
    window.scrollTo(0, 0);
  });

  // Active link
  const links = document.querySelectorAll('.site-nav a');
  const path = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if(href && href.endsWith(path)) a.classList.add('active');
    
    // Add smooth scrolling and position reset for navigation links
    a.addEventListener('click', function(e) {
      // Only handle internal navigation
      if (href && !href.startsWith('http') && !href.startsWith('#')) {
        // Reset scroll position when navigating to a new page
        window.scrollTo(0, 0);
      }
    });
  });
})();
