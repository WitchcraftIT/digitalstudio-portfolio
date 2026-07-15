document.querySelector('.menu-button')?.addEventListener('click', () => {
  document.querySelector('.nav')?.classList.toggle('is-open');
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => document.querySelector('.nav')?.classList.remove('is-open'));
});
