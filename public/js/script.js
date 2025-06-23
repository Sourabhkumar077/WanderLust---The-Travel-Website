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