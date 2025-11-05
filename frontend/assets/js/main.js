import { apiGet, apiPost, getToken, clearToken } from './api.js';

function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

function updateYear() {
  const el = qs('#year');
  if (el) el.textContent = new Date().getFullYear();
}

function setupNavAuth() {
  const navAuth = qs('#nav-auth');
  if (!navAuth) return;
  if (getToken()) {
    navAuth.textContent = 'Logout';
    navAuth.classList.remove('btn-primary');
    navAuth.addEventListener('click', (e) => {
      e.preventDefault();
      clearToken();
      window.location.reload();
    });
  }
}

async function loadCourses() {
  const grid = qs('#courses-grid');
  if (!grid) return;
  grid.innerHTML = '<p class="muted">Loading courses...</p>';
  try {
    const data = await apiGet('/courses');
    renderCourses(data);
  } catch (err) {
    grid.innerHTML = '<p class="muted">Failed to load courses.</p>';
  }
}

function courseImageFor(course) {
  // Simple mapping; you can replace with local images in assets/img/courses
  if (course.category === 'ICT') return 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop';
  return 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop';
}

function renderCourses(courses) {
  const grid = qs('#courses-grid');
  if (!grid) return;
  grid.innerHTML = '';
  courses.forEach(c => {
    const card = document.createElement('div');
    card.className = 'card course-card';
    const badgeClass = c.category === 'ICT' ? 'badge-ict' : 'badge-prog';
    card.innerHTML = `
      <div class="course-thumb">
        <img src="${courseImageFor(c)}" alt="${c.name}">
        <span class="badge ${badgeClass}">${c.category}</span>
      </div>
      <div class="course-body">
        <h3>${c.name}</h3>
        <div class="course-meta">
          ${c.grade_range ? `<span>Grade: ${c.grade_range}</span>` : ''}
          <span>${c.duration_weeks} weeks</span>
        </div>
        <p>${c.description}</p>
        <p class="price">LKR ${c.price_lkr.toLocaleString()}</p>
      </div>
      <div class="course-actions">
        <a href="register.html" class="btn btn-primary">Register</a>
        <a href="login.html" class="btn btn-secondary">Login</a>
      </div>
    `;
    grid.appendChild(card);
  });
  setupFilters(courses);
}

async function loadFeaturedCourses() {
  const grid = qs('#featured-grid');
  if (!grid) return;
  grid.innerHTML = '<p class="muted">Loading...</p>';
  try {
    const data = await apiGet('/courses');
    const featured = data.slice(0, 3); // first three courses
    grid.innerHTML = '';
    featured.forEach(c => {
      const card = document.createElement('div');
      card.className = 'card course-card';
      const badgeClass = c.category === 'ICT' ? 'badge-ict' : 'badge-prog';
      card.innerHTML = `
        <div class="course-thumb">
          <img src="${courseImageFor(c)}" alt="${c.name}">
          <span class="badge ${badgeClass}">${c.category}</span>
        </div>
        <div class="course-body">
          <h3>${c.name}</h3>
          <div class="course-meta">
            ${c.grade_range ? `<span>Grade: ${c.grade_range}</span>` : ''}
            <span>${c.duration_weeks} weeks</span>
          </div>
          <p>${c.description}</p>
          <p class="price">LKR ${c.price_lkr.toLocaleString()}</p>
        </div>
        <div class="course-actions">
          <a href="register.html" class="btn btn-primary">Register</a>
          <a href="login.html" class="btn btn-secondary">Login</a>
        </div>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    grid.innerHTML = '<p class="muted">Failed to load featured courses.</p>';
  }
}

function setupFilters(allCourses) {
  const chips = qsa('.chip');
  const grid = qs('#courses-grid');
  if (!chips.length || !grid) return;
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.getAttribute('data-filter');
    const list = f === 'all' ? allCourses : allCourses.filter(c => c.category === f);
    renderCourses(list);
  }));
}

function setupContactForm() {
  const form = qs('#contact-form');
  if (!form) return;
  const status = qs('#contact-status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending...';
    try {
      await apiPost('/contact', {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim()
      });
      status.textContent = 'Message sent successfully!';
      form.reset();
    } catch (err) {
      status.textContent = 'Failed to send message';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateYear();
  setupNavAuth();
  loadCourses();
  setupContactForm();
  loadFeaturedCourses();

  // Header scroll effect
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 10) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
});


