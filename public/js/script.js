// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})() // created and arrow function and calling it...

// Ripple effect for buttons, links, filters
document.addEventListener('click', function(e) {
  const target = e.target.closest('.btn, .listing-link, .filter');
  if (!target) return;
  const circle = document.createElement('span');
  circle.classList.add('ripple');
  const rect = target.getBoundingClientRect();
  circle.style.width = circle.style.height = Math.max(rect.width, rect.height) + 'px';
  circle.style.left = (e.clientX - rect.left - rect.width/2) + 'px';
  circle.style.top = (e.clientY - rect.top - rect.height/2) + 'px';
  target.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
});

// Page fade transitions
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('fade-page');
  setTimeout(() => document.body.classList.add('visible'), 10);
  const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      if (link.href && link.origin === location.origin) {
        document.body.classList.remove('visible');
      }
    });
  });
});

// Flash message animation
document.querySelectorAll('.flash-message').forEach(msg => {
  setTimeout(() => msg.classList.add('visible'), 100);
  setTimeout(() => msg.classList.remove('visible'), 3500);
});

// Filter selection highlight
document.querySelectorAll('.filter').forEach(filter => {
  filter.addEventListener('click', function() {
    document.querySelectorAll('.filter').forEach(f => f.classList.remove('selected'));
    filter.classList.add('selected');
  });
});

// Scroll-to-top button
const scrollBtn = document.createElement('button');
scrollBtn.id = 'scrollToTopBtn';
scrollBtn.innerHTML = '<i class="fa fa-arrow-up"></i>';
document.body.appendChild(scrollBtn);
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Enhanced search form: submit only on Enter or button click, show loading spinner
const searchForm = document.querySelector('.navbar-search-form');
if (searchForm) {
  const searchInput = searchForm.querySelector('.search-inp');
  const searchBtn = searchForm.querySelector('.search-btn');
  let originalBtnHTML = searchBtn.innerHTML;

  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Show loading spinner
    searchBtn.disabled = true;
    searchBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Searching...';
    // Simulate async search (replace with real search logic)
    setTimeout(() => {
      searchBtn.disabled = false;
      searchBtn.innerHTML = originalBtnHTML;
      // Optionally, submit the form or show results here
      // searchForm.submit();
    }, 1200);
  });

  // Prevent form submission on every keystroke (default behavior is fine, but this ensures no JS submit on input)
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      // Allow submit
    } else {
      // Do nothing
    }
  });
}

// Contact form: show success message and clear form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('contactSuccess').classList.remove('d-none');
    contactForm.reset();
    setTimeout(() => {
      document.getElementById('contactSuccess').classList.add('d-none');
    }, 3500);
  });
}

// Animate the 3D globe with a floating effect
const globe3d = document.getElementById('globe3d');
if (globe3d) {
  let t = 0;
  setInterval(() => {
    t += 0.03;
    globe3d.style.transform = `translateY(${Math.sin(t) * 10}px) rotateY(${t * 30}deg)`;
  }, 30);
}