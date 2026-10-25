const overlay = document.createElement('div');
overlay.className = 'lightbox';
overlay.setAttribute('role', 'dialog');
overlay.setAttribute('aria-modal', 'true');
overlay.setAttribute('aria-label', 'Image lightbox');
overlay.hidden = true;
overlay.innerHTML = `
  <div class="lightbox__backdrop"></div>
  <div class="lightbox__content">
    <img class="lightbox__img" src="" alt="">
    <p class="lightbox__caption"></p>
    <button class="lightbox__close" aria-label="Close lightbox">
      <svg width="20" height="20" aria-hidden="true" focusable="false"><use href="#icon-close-sm"/></svg>
    </button>
  </div>
`;
document.body.appendChild(overlay);

const img     = overlay.querySelector('.lightbox__img');
const caption = overlay.querySelector('.lightbox__caption');
const close   = overlay.querySelector('.lightbox__close');

function open(src, alt, captionText) {
  img.src = src;
  img.alt = alt || '';
  caption.textContent = captionText || '';
  caption.hidden = !captionText;
  overlay.hidden = false;
  document.body.classList.add('lightbox-open');
  close.focus();
}

function closeLightbox() {
  overlay.hidden = true;
  document.body.classList.remove('lightbox-open');
  if (lastTrigger) lastTrigger.focus();
  img.src = '';
}

let lastTrigger = null;

// Make media-block images keyboard-accessible
document.querySelectorAll('.media-block img').forEach(image => {
  image.setAttribute('tabindex', '0');
  image.setAttribute('role', 'button');
  image.setAttribute('aria-haspopup', 'dialog');
});

function triggerFromImage(image) {
  lastTrigger = image;
  const figure = image.closest('.media-block');
  const captionEl = figure ? figure.querySelector('figcaption') : null;
  open(image.src, image.alt, captionEl ? captionEl.textContent : '');
}

document.addEventListener('click', (e) => {
  const image = e.target.closest('.media-block img');
  if (!image) return;
  triggerFromImage(image);
});

document.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.media-block img')) {
    e.preventDefault();
    triggerFromImage(e.target);
  }
});

overlay.querySelector('.lightbox__backdrop').addEventListener('click', closeLightbox);
close.addEventListener('click', closeLightbox);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !overlay.hidden) closeLightbox();
});
