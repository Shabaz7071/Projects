/* ===== VARRO — main.js ===== */

/* --- Cart Storage --- */
function getCart() {
  try { return JSON.parse(localStorage.getItem('varro_cart')) || []; }
  catch(e) { return []; }
}
function saveCart(cart) {
  localStorage.setItem('varro_cart', JSON.stringify(cart));
  updateCartCount();
}
function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = total);
}

/* --- Add to Cart --- */
function addToCart(name, price, img) {
  const cart = getCart();
  const existing = cart.find(i => i.name === name);
  if (existing) { existing.qty++; }
  else { cart.push({ name, price, img: img || '', qty: 1 }); }
  saveCart(cart);
  showToast(`${name} added to cart`);
}

/* --- Toast --- */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* --- Sticky Header --- */
function initHeader() {
  const h = document.getElementById('site-header');
  if (!h) return;
  window.addEventListener('scroll', () => {
    h.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* --- Mobile Nav --- */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('open');
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('open');
    });
  });
}

/* --- Scroll AOS (Animate on Scroll) --- */
function initAOS() {
  const els = document.querySelectorAll('[data-aos]');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  els.forEach(el => obs.observe(el));
}

/* --- Active Nav Link --- */
function setActiveNav() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === current || (current === '' && href === 'index.html'));
  });
}

/* --- Newsletter Subscribe --- */
function handleSubscribe(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  showToast(`Welcome! Check ${input.value} for your discount.`);
  input.value = '';
}

/* --- Cart Page Rendering --- */
function renderCartPage() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;
  const cart = getCart();
  if (!cart.length) {
    container.innerHTML = `
      <div class="empty-cart">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        <h3>Your Cart is Empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <a href="products.html" class="btn-primary">Shop Now</a>
      </div>`;
    updateSummary(cart);
    return;
  }
  container.innerHTML = cart.map((item, idx) => `
    <div class="cart-item" data-idx="${idx}">
      <div class="cart-item-info">
        <img class="cart-item-img" src="${item.img || 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=150&q=60'}" alt="${item.name}">
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-cat">Men's Clothing</div>
        </div>
      </div>
      <div class="cart-item-price">$${item.price}</div>
      <div class="qty-control">
        <button class="qty-btn" onclick="changeQty(${idx}, -1)">−</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${idx}, 1)">+</button>
      </div>
      <div class="cart-item-total">$${(item.price * item.qty).toFixed(0)}</div>
      <button class="remove-btn" onclick="removeItem(${idx})" aria-label="Remove">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>`).join('');
  updateSummary(cart);
}

function updateSummary(cart) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;
  const setEl = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
  setEl('summary-subtotal', `$${subtotal.toFixed(0)}`);
  setEl('summary-shipping', shipping === 0 ? 'Free' : `$${shipping}`);
  setEl('summary-total', `$${total.toFixed(0)}`);
}

function changeQty(idx, delta) {
  const cart = getCart();
  cart[idx].qty = Math.max(1, (cart[idx].qty || 1) + delta);
  saveCart(cart);
  renderCartPage();
}

function removeItem(idx) {
  const cart = getCart();
  const removed = cart.splice(idx, 1);
  saveCart(cart);
  renderCartPage();
  if (removed.length) showToast(`${removed[0].name} removed`);
}

/* --- Product Filter (Products Page) --- */
function initProductFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card[data-category]');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      cards.forEach(card => {
        const show = cat === 'all' || card.dataset.category === cat;
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = '';
          card.classList.remove('aos-active');
          setTimeout(() => card.classList.add('aos-active'), 50);
        }
      });
    });
  });
}

/* --- Contact Form --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    btn.textContent = 'Message Sent!';
    btn.style.background = '#27ae60';
    showToast("Thanks! We'll be in touch soon.");
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      form.reset();
    }, 3500);
  });
}

/* --- Page Entrance --- */
function initPageEntrance() {
  document.body.classList.add('page-enter');
}

/* --- Init All --- */
document.addEventListener('DOMContentLoaded', () => {
  initPageEntrance();
  initHeader();
  initMobileNav();
  initAOS();
  setActiveNav();
  updateCartCount();
  renderCartPage();
  initProductFilters();
  initContactForm();
});
