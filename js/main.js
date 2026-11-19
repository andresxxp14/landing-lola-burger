/* ============================================================
   Lola Street Food — main.js
   ============================================================ */

'use strict';

/* ---- Element references ---- */
const navbar       = document.querySelector('.navbar');
const navToggle    = document.querySelector('.nav-toggle');
const navLinks     = document.querySelector('.nav-links');
const sections     = document.querySelectorAll('section[id]');
const scrollTopBtn = document.querySelector('.scroll-top');

/* ---- Navbar scroll effect + active link ---- */
window.addEventListener('scroll', () => {
  // Scrolled styling
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Active nav link spy
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });

  // Scroll-to-top button visibility
  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }
});

/* ---- Mobile nav toggle ---- */
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Scroll-to-top button ---- */
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---- Reveal on scroll (IntersectionObserver) ---- */
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObs.observe(el));

/* ---- Toast notification ---- */
function showToast(icon, message) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  toast.querySelector('.toast-icon').textContent = icon;
  toast.querySelector('.toast-msg').textContent  = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ---- Filtro rápido en la sección de productos ---- */
const filterButtons = document.querySelectorAll('.filter-btn');
const menuCards     = document.querySelectorAll('.menu-card');

if (filterButtons.length > 0 && menuCards.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update button active state & aria-selected
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter product cards with animation
      menuCards.forEach(card => {
        const category = card.dataset.category;
        const matches  = (filter === 'all' || category === filter);

        if (matches) {
          // Unhide & animate in
          card.classList.remove('hidden');
          requestAnimationFrame(() => {
            card.classList.remove('filtering-out');
          });
        } else {
          // Animate out & hide
          card.classList.add('filtering-out');
          setTimeout(() => {
            if (card.classList.contains('filtering-out')) {
              card.classList.add('hidden');
            }
          }, 280);
        }
      });
    });
  });
}

/* ---- Botón "+" de tarjetas de productos ---- */
document.querySelectorAll('.card-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = e.currentTarget.closest('.menu-card');
    const name = card.querySelector('.card-name').textContent;
    showToast('🛒', `¡${name} añadido! Completa tu pedido abajo`);

    // Sincronizar automáticamente en el formulario de contacto
    const selectEl = document.getElementById('clienteProducto');
    if (selectEl) {
      for (let opt of selectEl.options) {
        if (opt.value.toLowerCase().includes(name.toLowerCase())) {
          selectEl.value = opt.value;
          // Disparar evento change para limpiar validación si estaba en error
          selectEl.dispatchEvent(new Event('change'));
          break;
        }
      }
    }
  });
});

/* ---- Hero CTA: Ir al formulario de contacto / WhatsApp ---- */
const ctaContacto = document.querySelector('.btn-wa');
if (ctaContacto) {
  ctaContacto.addEventListener('click', () => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      const nombreInput = document.getElementById('clienteNombre');
      if (nombreInput) {
        setTimeout(() => nombreInput.focus(), 600);
      }
    }
  });
}

/* ---- Validación del Formulario de Contacto & Generador WhatsApp ---- */
const contactForm    = document.getElementById('contactForm');
const inputNombre    = document.getElementById('clienteNombre');
const inputTelefono  = document.getElementById('clienteTelefono');
const selectProducto = document.getElementById('clienteProducto');
const textMensaje    = document.getElementById('clienteMensaje');

const errorNombre    = document.getElementById('errorNombre');
const errorTelefono  = document.getElementById('errorTelefono');
const errorProducto  = document.getElementById('errorProducto');
const errorMensaje   = document.getElementById('errorMensaje');

// Utilidad para aplicar estado de error visual
function setFieldError(input, errorEl, hasError) {
  if (hasError) {
    input.classList.add('is-invalid');
    if (errorEl) errorEl.classList.add('visible');
  } else {
    input.classList.remove('is-invalid');
    if (errorEl) errorEl.classList.remove('visible');
  }
}

// Validación en tiempo real (limpieza al interactuar)
if (inputNombre) {
  inputNombre.addEventListener('input', () => {
    if (inputNombre.value.trim().length >= 3) {
      setFieldError(inputNombre, errorNombre, false);
    }
  });
}

if (inputTelefono) {
  inputTelefono.addEventListener('input', () => {
    const digits = inputTelefono.value.replace(/\D/g, '');
    if (digits.length >= 7) {
      setFieldError(inputTelefono, errorTelefono, false);
    }
  });
}

if (selectProducto) {
  selectProducto.addEventListener('change', () => {
    if (selectProducto.value && selectProducto.value.trim() !== '') {
      setFieldError(selectProducto, errorProducto, false);
    }
  });
}

if (textMensaje) {
  textMensaje.addEventListener('input', () => {
    if (textMensaje.value.trim().length >= 5) {
      setFieldError(textMensaje, errorMensaje, false);
    }
  });
}

// Procesamiento y envío hacia WhatsApp al hacer submit
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombreVal   = inputNombre ? inputNombre.value.trim() : '';
    const telefonoVal = inputTelefono ? inputTelefono.value.trim() : '';
    const productoVal = selectProducto ? selectProducto.value : '';
    const mensajeVal  = textMensaje ? textMensaje.value.trim() : '';

    let isValid = true;
    let firstInvalidField = null;

    // 1. Validar Nombre (al menos 3 caracteres)
    if (nombreVal.length < 3) {
      setFieldError(inputNombre, errorNombre, true);
      isValid = false;
      if (!firstInvalidField) firstInvalidField = inputNombre;
    } else {
      setFieldError(inputNombre, errorNombre, false);
    }

    // 2. Validar Teléfono (al menos 7 dígitos numéricos)
    const phoneDigits = telefonoVal.replace(/\D/g, '');
    if (phoneDigits.length < 7) {
      setFieldError(inputTelefono, errorTelefono, true);
      isValid = false;
      if (!firstInvalidField) firstInvalidField = inputTelefono;
    } else {
      setFieldError(inputTelefono, errorTelefono, false);
    }

    // 3. Validar Selección de Producto / Servicio
    if (!productoVal || productoVal === '') {
      setFieldError(selectProducto, errorProducto, true);
      isValid = false;
      if (!firstInvalidField) firstInvalidField = selectProducto;
    } else {
      setFieldError(selectProducto, errorProducto, false);
    }

    // 4. Validar Mensaje o Especificaciones (al menos 5 caracteres)
    if (mensajeVal.length < 5) {
      setFieldError(textMensaje, errorMensaje, true);
      isValid = false;
      if (!firstInvalidField) firstInvalidField = textMensaje;
    } else {
      setFieldError(textMensaje, errorMensaje, false);
    }

    // Si hay errores, detener y enfocar el primer campo inválido
    if (!isValid) {
      if (firstInvalidField) firstInvalidField.focus();
      showToast('⚠️', 'Por favor completa todos los campos requeridos.');
      return;
    }

    // Número de WhatsApp oficial del negocio (formato internacional sin signos)
    const whatsappPhone = '584165550000'; // Reemplazar con el número real de Lola Street Food

    // Redacción estructurada y profesional del mensaje para WhatsApp
    const mensajeCompleto = 
`🍔 *¡HOLA LOLA STREET FOOD!* 🍔
_Nuevo pedido / consulta web_

👤 *Nombre:* ${nombreVal}
📱 *Teléfono:* ${telefonoVal}
🍟 *Producto / Interés:* ${productoVal}
📝 *Detalles del pedido:*
"${mensajeVal}"

📍 _Enviado desde la landing page oficial_`;

    // Generar enlace codificado URI
    const waLink = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(mensajeCompleto)}`;

    // Feedback visual y apertura de WhatsApp
    showToast('📲', '¡Abriendo WhatsApp con tu pedido...');

    setTimeout(() => {
      window.open(waLink, '_blank', 'noopener,noreferrer');
      contactForm.reset();
    }, 450);
  });
}

/* ---- Counter animation (stats) ---- */
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { 
      el.textContent = target + (el.dataset.suffix || ''); 
      clearInterval(timer); 
      return; 
    }
    el.textContent = Math.floor(start) + (el.dataset.suffix || '');
  }, 16);
}

const statsObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target, 10), 1600);
      });
      statsObs.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) statsObs.observe(statsSection);

/* ---- Año dinámico en el footer ---- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
