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

document.addEventListener('DOMContentLoaded', function() {
    console.log('Certifications JS loading...');
    
    const flipButtons = document.querySelectorAll('.flip-button');
    const certificationCards = document.querySelectorAll('.certification-card');
    
    console.log(`Found ${flipButtons.length} flip buttons and ${certificationCards.length} cards`);
    
    // Add hover effects
    certificationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('flipped')) {
                card.style.transform = 'translateZ(10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('flipped')) {
                card.style.transform = 'translateZ(0) scale(1)';
            }
        });
    });
    
    // Add click handlers to flip buttons
    flipButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            const card = this.closest('.certification-card');
            
            console.log(`Flipping card ${index + 1}`);
            
            // Close all other cards first
            certificationCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('flipped')) {
                    otherCard.classList.remove('flipped');
                    otherCard.style.transform = 'translateZ(0) scale(1)';
                }
            });
            
            // Toggle current card
            card.classList.toggle('flipped');
            
            // Reset hover effect when flipped
            if (card.classList.contains('flipped')) {
                card.style.transform = 'translateZ(0) scale(1)';
            }
        });
    });
    
    // Also allow clicking anywhere on the card to flip
    certificationCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            // Don't flip if clicking on flip button or image
            if (!e.target.closest('.flip-button') && !e.target.closest('img')) {
                const flipButton = this.querySelector('.flip-button');
                if (flipButton) {
                    flipButton.click();
                }
            }
        });
    });

    // Close cards when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.certification-card')) {
            certificationCards.forEach(card => {
                if (card.classList.contains('flipped')) {
                    card.classList.remove('flipped');
                    card.style.transform = 'translateZ(0) scale(1)';
                }
            });
        }
    });

    // Handle page visibility change (when user returns from new tab)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            setTimeout(() => {
                certificationCards.forEach(card => {
                    if (!card.classList.contains('flipped')) {
                        card.style.transform = 'translateZ(0) scale(1)';
                    }
                });
            }, 100);
        }
    });

    console.log('✅ Certifications JS fully loaded');
});

// Contact Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formMessages = document.getElementById('form-messages');

    // Form validation
    const validateForm = () => {
        let isValid = true;
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Clear previous errors
        clearErrors();
        
        // Validate name
        if (!name.value.trim()) {
            showFieldError('name', 'Name is required');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showFieldError('name', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showFieldError('email', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            showFieldError('message', 'Message is required');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showFieldError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    };
    
    // Show field error
    const showFieldError = (fieldName, errorMessage) => {
        const field = document.getElementById(fieldName);
        const errorDiv = document.getElementById(`${fieldName}-error`);
        
        field.classList.add('invalid');
        field.classList.remove('valid');
        
        if (errorDiv) {
            errorDiv.textContent = errorMessage;
            errorDiv.classList.add('show');
        }
    };
    
    // Clear all errors
    const clearErrors = () => {
        const errorMessages = document.querySelectorAll('.error-message');
        const inputs = document.querySelectorAll('.contact-input');
        
        errorMessages.forEach(error => {
            error.textContent = '';
            error.classList.remove('show');
        });
        
        inputs.forEach(input => {
            input.classList.remove('invalid', 'valid');
        });
    };
    
    // Show success/error messages
    const showMessage = (message, type = 'success') => {
        formMessages.innerHTML = `
            <div class="message ${type}">
                ${message}
            </div>
        `;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            formMessages.innerHTML = '';
        }, 5000);
        
        // Scroll to message
        formMessages.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    
    // Set loading state
    const setLoadingState = (loading) => {
        if (loading) {
            submitBtn.disabled = true;
            btnText.classList.add('hidden');
            btnLoading.classList.remove('hidden');
            submitBtn.classList.add('opacity-75');
        } else {
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            btnLoading.classList.add('hidden');
            submitBtn.classList.remove('opacity-75');
        }
    };
    
    // Real-time validation
    const inputs = document.querySelectorAll('.contact-input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const fieldName = this.id;
            const value = this.value.trim();
            
            // Clear previous error for this field
            const errorDiv = document.getElementById(`${fieldName}-error`);
            if (errorDiv) {
                errorDiv.textContent = '';
                errorDiv.classList.remove('show');
            }
            this.classList.remove('invalid', 'valid');
            
            // Validate individual field
            if (value) {
                let isValid = true;
                let errorMessage = '';
                
                switch (fieldName) {
                    case 'name':
                        if (value.length < 2) {
                            isValid = false;
                            errorMessage = 'Name must be at least 2 characters';
                        }
                        break;
                    case 'email':
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value)) {
                            isValid = false;
                            errorMessage = 'Please enter a valid email address';
                        }
                        break;
                    case 'message':
                        if (value.length < 10) {
                            isValid = false;
                            errorMessage = 'Message must be at least 10 characters';
                        }
                        break;
                }
                
                if (isValid) {
                    this.classList.add('valid');
                } else {
                    this.classList.add('invalid');
                    if (errorDiv) {
                        errorDiv.textContent = errorMessage;
                        errorDiv.classList.add('show');
                    }
                }
            }
        });
        
        // Clear error on input
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                this.classList.remove('invalid');
                const errorDiv = document.getElementById(`${this.id}-error`);
                if (errorDiv) {
                    errorDiv.textContent = '';
                    errorDiv.classList.remove('show');
                }
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            showMessage('Please fix the errors above', 'error');
            return;
        }
        
        // Set loading state
        setLoadingState(true);
        
        try {
            // Get form data
            const formData = new FormData(contactForm);
            
            // Submit form
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
                contactForm.reset();
                clearErrors();
            } else {
                showMessage(data.message || 'Something went wrong. Please try again.', 'error');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('Network error. Please check your connection and try again.', 'error');
        } finally {
            setLoadingState(false);
        }
    });
    
    // Enhance textarea auto-resize
    const textarea = document.getElementById('message');
    if (textarea) {
        textarea.addEventListener('input', function() {
            // Reset height to auto to calculate new height
            this.style.height = 'auto';
            
            // Set new height based on scroll height
            const newHeight = Math.min(this.scrollHeight, 300); // Max height 300px
            this.style.height = newHeight + 'px';
        });
    }
    
    // Character count for message (optional enhancement)
    const messageField = document.getElementById('message');
    if (messageField) {
        const maxLength = 1000; // Set your desired max length
        
        // Create character count display
        const charCount = document.createElement('div');
        charCount.className = 'text-xs text-white/50 text-right mt-1';
        charCount.id = 'char-count';
        messageField.parentNode.appendChild(charCount);
        
        // Update character count
        const updateCharCount = () => {
            const currentLength = messageField.value.length;
            charCount.textContent = `${currentLength}/${maxLength}`;
            
            if (currentLength > maxLength * 0.9) {
                charCount.classList.add('text-yellow-400');
            } else {
                charCount.classList.remove('text-yellow-400');
            }
            
            if (currentLength > maxLength) {
                charCount.classList.add('text-red-400');
                messageField.value = messageField.value.substring(0, maxLength);
            }
        };
        
        messageField.addEventListener('input', updateCharCount);
        updateCharCount(); // Initial count
    }
});