// Before/After Slider functionality
const sliderContainer = document.querySelector('.relative.overflow-hidden.rounded-2xl');
const sliderHandle = document.getElementById('sliderHandle');
const afterImage = document.getElementById('afterImage');
const afterLabel = document.getElementById('afterLabel');

let isDragging = false;

if (sliderContainer && sliderHandle && afterImage) {
  function updateSlider(clientX) {
    const rect = sliderContainer.getBoundingClientRect();
    let position = ((clientX - rect.left) / rect.width) * 100;
    position = Math.max(0, Math.min(100, position));
    
    sliderHandle.style.left = position + '%';
    afterImage.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
    
    if (afterLabel) {
      afterLabel.style.opacity = position > 30 ? '1' : '0';
    }
  }
  
  sliderHandle.addEventListener('mousedown', () => { isDragging = true; });
  document.addEventListener('mousemove', (e) => { if (isDragging) updateSlider(e.clientX); });
  document.addEventListener('mouseup', () => { isDragging = false; });
  
  // Touch support
  sliderHandle.addEventListener('touchstart', (e) => { isDragging = true; e.preventDefault(); });
  document.addEventListener('touchmove', (e) => { if (isDragging) updateSlider(e.touches[0].clientX); });
  document.addEventListener('touchend', () => { isDragging = false; });
  
  sliderContainer.addEventListener('click', (e) => {
    if (e.target !== sliderHandle && !sliderHandle.contains(e.target)) {
      updateSlider(e.clientX);
    }
  });
}

// Scroll reveal animations
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale').forEach(el => {
  observer.observe(el);
});

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { mobileMenu.classList.add('hidden'); });
  });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sende...';
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const mailtoLink = `mailto:wildwave@mail.ch?subject=Kontaktanfrage von ${encodeURIComponent(name)}&body=${encodeURIComponent('Name: ' + name + '\nE-Mail: ' + email + '\n\nNachricht:\n' + message)}`;
    window.location.href = mailtoLink;
    
    setTimeout(() => {
        formMessage.textContent = '✓ E-Mail Programm geöffnet.';
        formMessage.className = 'text-center text-sm text-cyan-400 mt-2 block';
        formMessage.classList.remove('hidden');
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        contactForm.reset();
        setTimeout(() => { formMessage.classList.add('hidden'); }, 8000);
    }, 500);
  });
}

// Service Data
const serviceData = {
    webdesign: {
      title: 'Webdesign & Entwicklung',
      content: '<p>Wir erstellen moderne, schnelle Websites, die Besucher in Kunden verwandeln.</p>'
    },
    seo: {
      title: 'SEO & Analytics',
      content: '<p>Wir bringen Ihre Website bei Google nach oben. Mehr Sichtbarkeit, mehr Kunden.</p>'
    },
    social: {
      title: 'Social Media Marketing',
      content: '<p>Wir betreuen Ihre Kanäle auf Instagram, LinkedIn & Co. für maximale Reichweite.</p>'
    }
};

function openModal(serviceType) {
    const modal = document.getElementById('serviceModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    const data = serviceData[serviceType];
    
    if(data) {
        title.textContent = data.title;
        content.innerHTML = data.content;
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('show'), 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(event) {
    if (event && event.target !== event.currentTarget && !event.target.closest('button[onclick="closeModal()"]')) return;
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

// Legal Data (Impressum etc.)
const legalData = {
    impressum: {
        title: 'Impressum',
        content: '<p>WildWave Marketing<br>Im Isengrind 35<br>8046 Zürich<br>Schweiz<br><br>E-Mail: wildwave@mail.ch</p>'
    },
    datenschutz: {
        title: 'Datenschutz',
        content: '<p>Wir nehmen den Schutz Ihrer Daten ernst...</p>'
    }
};

function openLegalModal(type) {
    const modal = document.getElementById('legalModal');
    const title = document.getElementById('legalTitle');
    const content = document.getElementById('legalContent');
    const data = legalData[type];
    
    if(data) {
        title.textContent = data.title;
        content.innerHTML = data.content;
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('show'), 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeLegalModal(event) {
    if (event && event.target !== event.currentTarget && !event.target.closest('button[onclick="closeLegalModal()"]')) return;
    const modal = document.getElementById('legalModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

// Cookies
function acceptAllCookies() {
    document.getElementById('cookieBanner').classList.add('hidden');
    localStorage.setItem('wildwave_cookie_consent', 'true');
}

if (!localStorage.getItem('wildwave_cookie_consent')) {
    setTimeout(() => { document.getElementById('cookieBanner').classList.remove('hidden'); }, 1000);
}
