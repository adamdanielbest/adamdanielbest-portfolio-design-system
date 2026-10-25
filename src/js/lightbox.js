const style = document.createElement('style');
style.textContent = `
  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 900;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .lightbox[hidden] { display: none; }
  .lightbox__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.88);
    cursor: zoom-out;
  }
  .lightbox__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    max-width: min(92vw, 1200px);
    max-height: 92dvh;
    padding: 0 16px;
  }
  .lightbox__img {
    display: block;
    max-width: 100%;
    max-height: calc(92dvh - 80px);
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
  }
  .lightbox__caption {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    color: rgba(255,255,255,0.65);
    text-align: center;
    max-width: 640px;
  }
  .lightbox__close {
    position: fixed;
    top: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: rgba(255,255,255,0.12);
    color: #fff;
    cursor: pointer;
    padding: 0;
    appearance: none;
    -webkit-appearance: none;
  }
  .lightbox__close:hover { background: rgba(255,255,255,0.2); }
  .lightbox__close:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
  body.lightbox-open { overflow: hidden; }
  .media-block img { cursor: zoom-in; }
  .media-block img:focus-visible {
    outline: 3px solid #4D90FE;
    outline-offset: 3px;
    border-radius: 4px;
  }
`;
document.head.appendChild(style);

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
  if (e.key === 'Escape' && !overlay.hidden) closeLightbox();
});

overlay.querySelector('.lightbox__backdrop').addEventListener('click', closeLightbox);
close.addEventListener('click', closeLightbox);
