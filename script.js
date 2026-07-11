// Complete JavaScript for University Website
document.addEventListener('DOMContentLoaded', function () {

  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      this.classList.toggle('active');
    });
  }

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Close mobile menu if open
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
        }
      }
    });
  });

  // Active Navigation Link Based on Scroll Position
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);

  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };

      if (validateContactForm(formData)) {
        // Simulate form submission
        showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
        contactForm.reset();
      }
    });
  }

  // Newsletter Subscription
  const newsletterForm = document.querySelector('.newsletter');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;

      if (validateEmail(email)) {
        showNotification('Successfully subscribed to our newsletter!', 'success');
        emailInput.value = '';
      } else {
        showNotification('Please enter a valid email address.', 'error');
      }
    });
  }

  // Course Application Buttons
  document.querySelectorAll('.btn-course').forEach(button => {
    button.addEventListener('click', function (e) {
      if (!this.getAttribute('href')) {
        e.preventDefault();
        const courseName = this.closest('.course-card').querySelector('h3').textContent;
        showNotification(`Application process started for ${courseName}`, 'info');

        // Simulate application process
        setTimeout(() => {
          showNotification(`Application submitted for ${courseName}! Our team will contact you soon.`, 'success');
        }, 2000);
      }
    });
  });

  // Dashboard Specific Functionality
  if (window.location.pathname.includes('dashboard.html')) {
    // Update current date and time
    function updateDateTime() {
      const now = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
      document.getElementById('currentTime').textContent = now.toLocaleTimeString('en-US');
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Assignment Submission
    document.querySelectorAll('.btn-submit').forEach(button => {
      button.addEventListener('click', function () {
        const assignmentName = this.closest('.assignment-item').querySelector('h4').textContent;
        showNotification(`Submitting assignment: ${assignmentName}`, 'info');

        // Simulate submission process
        setTimeout(() => {
          this.textContent = 'Submitted ✓';
          this.disabled = true;
          this.style.background = '#95a5a6';
          showNotification(`Assignment "${assignmentName}" submitted successfully!`, 'success');
        }, 1500);
      });
    });

    // Progress Bars Animation
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.transition = 'width 1.5s ease-in-out';
        bar.style.width = width;
      }, 500);
    });
  }

  // Faculty Contact Buttons
  document.querySelectorAll('.contact-btn').forEach(button => {
    button.addEventListener('click', function (e) {
      if (this.querySelector('.fa-envelope')) {
        e.preventDefault();
        const facultyName = this.closest('.faculty-card').querySelector('h3').textContent;
        showNotification(`Preparing email to ${facultyName}...`, 'info');
      }
    });
  });

  // Statistics Counter Animation
  function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200;

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target') || +counter.textContent.replace('+', '');
      const count = +counter.textContent.replace('+', '');
      const increment = target / speed;

      if (count < target) {
        counter.textContent = Math.ceil(count + increment) + '+';
        setTimeout(animateCounters, 1);
      } else {
        counter.textContent = target + '+';
      }
    });
  }

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');

        if (entry.target.classList.contains('hero-stats')) {
          animateCounters();
        }

        // Animate progress bars
        if (entry.target.querySelector('.progress-fill')) {
          const progressBars = entry.target.querySelectorAll('.progress-fill');
          progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
              bar.style.transition = 'width 1.5s ease-in-out';
              bar.style.width = width;
            }, 500);
          });
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.feature-card, .course-card, .announcement-card, .faculty-card, .stat-card').forEach(el => {
    observer.observe(el);
  });

  // Utility Functions
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validateContactForm(formData) {
    if (!formData.name.trim()) {
      showNotification('Please enter your name.', 'error');
      return false;
    }

    if (!validateEmail(formData.email)) {
      showNotification('Please enter a valid email address.', 'error');
      return false;
    }

    if (!formData.subject) {
      showNotification('Please select a subject.', 'error');
      return false;
    }

    if (!formData.message.trim()) {
      showNotification('Please enter your message.', 'error');
      return false;
    }

    return true;
  }

  function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(notif => notif.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 1rem;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
            border-left: 5px solid ${type === 'success' ? '#219a52' : type === 'error' ? '#c0392b' : '#2980b9'};
        `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease;
        }
        
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .notification button {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s;
        }
        
        .notification button:hover {
            background: rgba(255,255,255,0.2);
        }
        
        .expertise-tag {
            display: inline-block;
            background: rgba(52, 152, 219, 0.1);
            color: #3498db;
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.8rem;
            margin: 0.2rem;
            border: 1px solid rgba(52, 152, 219, 0.2);
        }
        
        .course-features {
            margin: 1rem 0;
        }
        
        .course-features span {
            display: block;
            color: var(--text-light);
            font-size: 0.9rem;
            margin-bottom: 0.3rem;
        }
        
        .course-features i {
            color: var(--success-color);
            margin-right: 0.5rem;
        }
        
        .progress-section {
            space-y: 1rem;
        }
        
        .progress-item {
            margin-bottom: 1rem;
        }
        
        .progress-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
        }
        
        .progress-bar {
            width: 100%;
            height: 8px;
            background: var(--border-color);
            border-radius: 4px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: var(--gradient);
            border-radius: 4px;
            transition: width 1.5s ease-in-out;
        }
        
        .nav-menu.active {
            display: flex !important;
        }
        
        @media (max-width: 768px) {
            .notification {
                top: 80px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
  document.head.appendChild(style);

  // Initialize counters with data attributes
  document.querySelectorAll('.stat h3').forEach(stat => {
    const value = stat.textContent.replace('+', '');
    stat.setAttribute('data-target', value);
    stat.textContent = '0+';
  });

  // Parallax Effect for Hero Section
  window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Page Load Completion
  setTimeout(() => {
    console.log('EduGate University Website Loaded Successfully!');

    // Initialize any dynamic content
    if (typeof animateCounters === 'function') {
      animateCounters();
    }
  }, 1000);
});

// Export functions for global access
window.showNotification = showNotification;
window.validateEmail = validateEmail;

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Page transition effects
window.addEventListener('beforeunload', function () {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease';
});