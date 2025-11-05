document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) AOS.init({ once: true, duration: 700, offset: 80 });

  const canvas = document.getElementById('hero-canvas');
  if (!canvas || !window.gsap) return;
  const ctx = canvas.getContext('2d');
  let w, h, raf;
  const particles = Array.from({ length: 60 }).map(() => ({
    x: Math.random(), y: Math.random(), r: Math.random() * 2 + 0.6, vx: (Math.random()-0.5)*0.0008, vy: (Math.random()-0.5)*0.0008
  }));

  function resize() {
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w; canvas.height = h;
  }
  window.addEventListener('resize', resize); resize();

  function frame() {
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = 'rgba(0,123,255,0.6)';
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > 1) p.vx *= -1;
      if (p.y < 0 || p.y > 1) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x*w, p.y*h, p.r, 0, Math.PI*2);
      ctx.fill();
    });
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  // GSAP subtle glow on hero heading and CTA
  const title = document.querySelector('.hero h1');
  if (title && window.gsap) {
    gsap.fromTo(title, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
    gsap.to(title, { textShadow: '0px 0px 18px rgba(0,123,255,0.35)', repeat: -1, yoyo: true, duration: 2.4, ease: 'sine.inOut' });
  }
  const ctas = document.querySelectorAll('.cta .btn');
  if (ctas.length && window.gsap) {
    gsap.from(ctas, { opacity: 0, y: 10, stagger: 0.1, duration: 0.6, delay: 0.15, ease: 'power2.out' });
  }
});


