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
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100dvh;
    padding: 0;
  }
  .lightbox__img {
    display: block;
    max-width: 100%;
    max-height: 100dvh;
    width: auto;
    height: auto;
    object-fit: contain;
  }
  .lightbox__close {
    position: fixed;
    top: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: none;
    background: var(--background-action-primary, #3A73A0);
    color: var(--icon-primary, #FAF9F6);
    cursor: pointer;
    padding: 0;
    appearance: none;
    -webkit-appearance: none;
  }
  .lightbox__close:hover { background: var(--background-action-primary-hover, #2D5C82); }
  .lightbox__close:active { background: var(--background-action-primary-pressed, #224868); }
  .lightbox__close:focus-visible { outline: 2px solid var(--border-focus, #4D90FE); outline-offset: 2px; }
  body.lightbox-open { overflow: hidden; touch-action: none; }
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
    <button class="lightbox__close" aria-label="Close lightbox">
      <svg width="20" height="20" aria-hidden="true" focusable="false"><use href="#icon-close-sm"/></svg>
    </button>
  </div>
`;
document.body.appendChild(overlay);

const img   = overlay.querySelector('.lightbox__img');
const close = overlay.querySelector('.lightbox__close');

function open(src, alt) {
  img.src = src;
  img.alt = alt || '';
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
  open(image.src, image.alt);
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
