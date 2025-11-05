import { apiPost, setToken } from './api.js';

function qs(sel) { return document.querySelector(sel); }

async function onLogin(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const status = qs('#auth-status');
  status.textContent = 'Signing in...';
  try {
    const body = { email: form.email.value.trim(), password: form.password.value };
    const { token, user } = await apiPost('/auth/login', body);
    setToken(token);
    status.textContent = `Welcome, ${user.name}`;
    setTimeout(() => { window.location.href = 'courses.html'; }, 600);
  } catch (err) {
    status.textContent = 'Login failed';
  }
}

async function onRegister(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const status = qs('#auth-status');
  status.textContent = 'Creating account...';
  const pwd = form.password.value;
  const confirm = form.confirm.value;
  if (pwd !== confirm) { status.textContent = 'Passwords do not match'; return; }
  try {
    const body = { name: form.name.value.trim(), email: form.email.value.trim(), password: pwd };
    const { token, user } = await apiPost('/auth/register', body);
    setToken(token);
    status.textContent = `Welcome, ${user.name}`;
    setTimeout(() => { window.location.href = 'courses.html'; }, 600);
  } catch (err) {
    status.textContent = 'Registration failed';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = qs('#login-form');
  if (loginForm) loginForm.addEventListener('submit', onLogin);
  const registerForm = qs('#register-form');
  if (registerForm) registerForm.addEventListener('submit', onRegister);
});


