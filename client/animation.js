// animation.js — simple DOM animations for AesthiLink

document.addEventListener('DOMContentLoaded', () => {

  // fade-in elements on scroll
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // floating spark hover effect
  const sparks = document.querySelectorAll('.spark-float');
  sparks.forEach(s => {
    s.addEventListener('mouseover', () => s.style.transform = 'scale(1.06)');
    s.addEventListener('mouseleave', () => s.style.transform = '');
  });

  // button click bounce effect
  const ctas = document.querySelectorAll('.hero-cta');
  ctas.forEach(button => {
    button.addEventListener('mousedown', () => button.style.transform = 'translateY(2px)');
    button.addEventListener('mouseup', () => button.style.transform = '');
  });

});
