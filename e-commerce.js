const body = document.body;
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.navmenu');
const searchToggleBtn = document.querySelector('.search-toggle');
const searchOverlay = document.querySelector('.search-overlay');
const closeSearchBtn = document.querySelector('.close-search');
const themeToggleBtn = document.getElementById('toggle-theme');
const backToTopBtn = document.querySelector('.back-to-top');
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const wishlistBtns = document.querySelectorAll('.wishlist-btn');

// Mobile Menu Toggle
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle menu animation
    const bars = mobileMenuBtn.querySelectorAll('.bar');
    if (mobileMenuBtn.classList.contains('active')) {
      bars[0].style.transform = 'translateY(8px) rotate(45deg)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  });
}

// Search Overlay Toggle
if (searchToggleBtn && searchOverlay && closeSearchBtn) {
  searchToggleBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  closeSearchBtn.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
  
  // Close search on outside click
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// Theme Toggle (Dark/Light Mode)
if (themeToggleBtn) {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  }
  
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeIcon(newTheme);
  });
  
  function updateThemeIcon(theme) {
    const themeIcon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
      themeIcon.className = 'bx bx-moon';
    } else {
      themeIcon.className = 'bx bx-sun';
    }
  }
}

// Back to Top Button
window.addEventListener('scroll', () => {
  if (backToTopBtn) {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  }
  
  // Add sticky class to header
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 50) {
      header.style.boxShadow = 'var(--shadow-md)';
      header.style.backgroundColor = 'var(--bg-light)';
    } else {
      header.style.boxShadow = 'none';
      header.style.backgroundColor = 'var(--bg-light)';
    }
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Product Filtering
if (filterBtns.length > 0 && productCards.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      productCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'block';
        } else {
          if (card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
}

// Wishlist Functionality
if (wishlistBtns.length > 0) {
  wishlistBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      
      const icon = btn.querySelector('i');
      if (btn.classList.contains('active')) {
        icon.className = 'bx bxs-heart';
        icon.style.color = 'var(--danger-color)';
        showNotification('Produit ajouté aux favoris!');
      } else {
        icon.className = 'bx bx-heart';
        icon.style.color = '';
        showNotification('Produit retiré des favoris!');
      }
    });
  });
}

// Product Notification
function showNotification(message) {
  // Check if notification container exists, if not create it
  let notificationContainer = document.querySelector('.notification-container');
  
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    document.body.appendChild(notificationContainer);
    
    // Style the container
    notificationContainer.style.position = 'fixed';
    notificationContainer.style.bottom = '20px';
    notificationContainer.style.right = '20px';
    notificationContainer.style.zIndex = '9999';
  }
  
  // Create notification
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  // Style the notification
  notification.style.backgroundColor = 'var(--primary-color)';
  notification.style.color = 'white';
  notification.style.padding = '1rem';
  notification.style.borderRadius = 'var(--radius-md)';
  notification.style.marginTop = '0.5rem';
  notification.style.boxShadow = 'var(--shadow-md)';
  notification.style.animation = 'slideIn 0.3s forwards, fadeOut 0.5s 2.5s forwards';
  
  // Add animation keyframes
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Add to container
  notificationContainer.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Add to Cart functionality
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
if (addToCartBtns.length > 0) {
  let cartCount = 0;
  const cartCountElem = document.querySelector('.cart-count');
  
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount++;
      cartCountElem.textContent = cartCount;
      
      // Get product info
      const productCard = btn.closest('.product-card');
      const productName = productCard.querySelector('.product-name').textContent;
      
      showNotification(`${productName} ajouté au panier!`);
      
      // Animation for cart icon
      const cartIcon = document.querySelector('.cart-icon');
      cartIcon.style.animation = 'pulse 0.5s';
      setTimeout(() => {
        cartIcon.style.animation = '';
      }, 500);
      
      if (!document.querySelector('#cart-animation-style')) {
        const style = document.createElement('style');
        style.id = 'cart-animation-style';
        style.textContent = `
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `;
        document.head.appendChild(style);
      }
    });
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (this.getAttribute('href') !== '#') {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
          mobileMenuBtn.click();
        }
      }
    }
  });
});

// Initialize active nav link based on scroll position
function setActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navmenu a');
  
  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLink();
});
