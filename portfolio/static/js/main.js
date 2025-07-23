document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".skill-icon");
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("animate-mirror-spin");
        }, index * 100);
      }
    });
  }, { threshold: 0.3 });

  icons.forEach(icon => observer.observe(icon));
});

document.addEventListener('DOMContentLoaded', function() {
  // Initialize carousel
  const initCarousel = () => {
    const carouselTrack = document.querySelector('.tool-carousel-track');
    const cards = document.querySelectorAll('.tool-card');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const tabs = document.querySelectorAll('.tool-tab');
    
    let currentIndex = 0;
    
    // Initialize dots
    function initDots() {
      dotsContainer.innerHTML = '';
      cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
    }
    
    // Update active state
    function updateActiveState() {
      cards.forEach((card, index) => {
        if (index === currentIndex) {
          card.classList.add('active');
          card.style.zIndex = 2;
          card.style.pointerEvents = 'auto';
          card.style.position = 'relative';
        } else {
          card.classList.remove('active');
          card.style.zIndex = 1;
          card.style.pointerEvents = 'none';
          card.style.position = 'absolute';
        }
      });
      
      const dots = document.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
      
      // Update tab active state
      const activeCategory = cards[currentIndex].dataset.category;
      tabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === activeCategory);
      });
    }
    
    // Go to specific slide
    function goToSlide(index) {
      currentIndex = index;
      updateActiveState();
    }
    
    // Next slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % cards.length;
      updateActiveState();
    }
    
    // Previous slide
    function prevSlide() {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateActiveState();
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Tab navigation
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.dataset.category;
        const targetIndex = Array.from(cards).findIndex(card => card.dataset.category === category);
        if (targetIndex !== -1) {
          goToSlide(targetIndex);
        }
      });
    });
    
    // Initialize
    initDots();
    updateActiveState();
  };
  
  // Initialize everything
  initCarousel();
});