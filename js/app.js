/* ==========================================================================
   EMMYLINK — Premium Luxury Corporate & Architectural Engineering Controller
   Abuja, Nigeria | Direct WhatsApp: 2347088615600 | 07088615600
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLogoIntro();
  initHeaderScroll();
  initMobileMenu();
  initScrollReveal();
  initProjectFiltering();
  initProjectLightbox();
  initServiceModals();
  initEstimatorCalculator();
  initQuoteForm();
  initWhatsAppIntegration();
});

/* 1. Professional Centered Logo Intro & Smooth Homepage Reveal */
function initLogoIntro() {
  const introLoader = document.getElementById('intro-loader');
  const progressBar = document.getElementById('intro-progress-bar');
  if (!introLoader) {
    document.body.classList.add('page-loaded');
    return;
  }

  // Check prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    introLoader.style.display = 'none';
    document.body.classList.add('page-loaded');
    return;
  }

  // Animate progress line
  setTimeout(() => {
    if (progressBar) {
      progressBar.style.width = '100%';
    }
  }, 100);

  // Logo hold & curtain sweep reveal
  setTimeout(() => {
    introLoader.classList.add('fade-out');
  }, 1150);

  // Trigger homepage hero entrance cascade
  setTimeout(() => {
    document.body.classList.add('page-loaded');
  }, 1300);

  // Clean up from DOM tree
  setTimeout(() => {
    introLoader.style.display = 'none';
  }, 2100);
}

/* 2. Scroll-Triggered Reveal Animations (Intersection Observer) */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale, .service-card, .gallery-item, .why-card, .pillar-item, .featured-project-card'
  );

  if (!revealElements.length) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* 3. Header Scroll Effects */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* 4. Mobile Menu Drawer */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link, .drawer-cta');

  if (!menuBtn || !drawer || !backdrop) return;

  const toggleMenu = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    menuBtn.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  menuBtn.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', closeMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* 5. Project Showcase Filtering */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter').toLowerCase().trim();

      galleryItems.forEach(item => {
        const categories = (item.getAttribute('data-categories') || '').toLowerCase();
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
          }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(12px) scale(0.96)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* 6. Project Lightbox Modal with Technical Breakdown */
function initProjectLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item, .featured-image-wrapper');
  const modalBackdrop = document.getElementById('project-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.getElementById('modal-close');

  if (!modalBackdrop || !modalImg) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.getAttribute('data-title') || (item.querySelector('.gallery-item-title') ? item.querySelector('.gallery-item-title').textContent : 'EMMYLINK Project');
      const category = item.getAttribute('data-category-label') || (item.querySelector('.gallery-category-badge') ? item.querySelector('.gallery-category-badge').textContent : 'Real Installation');
      const desc = item.getAttribute('data-desc') || (item.querySelector('.gallery-item-caption') ? item.querySelector('.gallery-item-caption').textContent : 'Professional installation completed by EMMYLINK in Abuja.');

      if (img) {
        modalImg.src = img.src;
        modalImg.alt = title;
      }
      if (modalTitle) modalTitle.textContent = title;
      if (modalCategory) modalCategory.textContent = category;
      if (modalDesc) modalDesc.innerHTML = desc;

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* 7. Service Detail Modals */
function initServiceModals() {
  const serviceLinks = document.querySelectorAll('.service-learn-more-btn');
  const serviceModal = document.getElementById('service-modal');
  const serviceModalTitle = document.getElementById('service-modal-title');
  const serviceModalBody = document.getElementById('service-modal-body');
  const serviceModalClose = document.getElementById('service-modal-close');

  if (!serviceModal) return;

  const serviceData = {
    'electrical': {
      title: 'Electrical Installation & Distribution Boards',
      body: `
        <p><strong>What We Do:</strong> Residential and commercial conduit piping, 3-phase load calculation, precision DB board assembly, DIN-rail surge protective devices (SPD), earthing systems, and load balancing across all circuits in Abuja.</p>
        <ul style="margin: 16px 0; padding-left: 20px; line-height: 1.8;">
          <li>Full conduit rough-in and flush cable dressing</li>
          <li>Certified circuit breaker specification & busbar assembly</li>
          <li>Insulation resistance & earth ground testing (&lt; 1.0 Ohm)</li>
          <li>Dedicated power circuits for heavy HVAC and water heaters</li>
        </ul>
      `
    },
    'automation': {
      title: 'Smart Home Automation & Scene Control',
      body: `
        <p><strong>What We Do:</strong> Integrated smart living ecosystems allowing centralized control of architectural lighting, motorized curtains, climate, and security via capacitive wall touch panels, Apple Home, Google Assistant, or smartphone app.</p>
        <ul style="margin: 16px 0; padding-left: 20px; line-height: 1.8;">
          <li>Zigbee 3.0, Wi-Fi, and hardwired smart relay switching</li>
          <li>Custom automated scenes ("Welcome", "Cinema", "Good Night")</li>
          <li>Motorized drapery track and blind automation</li>
          <li>Zero-latency local network fallback</li>
        </ul>
      `
    },
    'cctv': {
      title: '4K IP CCTV & Central Surveillance Systems',
      body: `
        <p><strong>What We Do:</strong> Commercial-grade 4K ultra-high-definition IP surveillance, multi-channel central monitoring consoles, infrared night vision, perimeter intrusion detection, smart AI vehicle/human identification, and secure multi-device remote live streaming.</p>
        <ul style="margin: 16px 0; padding-left: 20px; line-height: 1.8;">
          <li>Central monitoring station setup with live multi-camera display</li>
          <li>PoE (Power over Ethernet) gigabit switch deployment</li>
          <li>H.265+ high-efficiency NVR storage configuration</li>
          <li>Encrypted remote smartphone view on iOS and Android</li>
        </ul>
      `
    },
    'gates': {
      title: 'Smart Locks, Automatic Gates & Access Control',
      body: `
        <p><strong>What We Do:</strong> High-security biometric digital smart door locks with optical fingerprint scanners, backlit touch keypads, integrated video doorbells, heavy-duty motorized sliding/swing gates, and safety infrared obstacle photocell sensors.</p>
        <ul style="margin: 16px 0; padding-left: 20px; line-height: 1.8;">
          <li>Biometric fingerprint, digital PIN, RFID card & smart app entry</li>
          <li>High-torque gate motor units with manual key override</li>
          <li>Anti-crush obstacle detection safety sensors</li>
          <li>Video intercom with visitor doorbell call</li>
        </ul>
      `
    },
    'solar': {
      title: 'Solar Hybrid Inverter & Lithium LiFePO4 Power Systems',
      body: `
        <p><strong>What We Do:</strong> Pure sine wave hybrid solar inverter setups, Tier-1 monocrystalline solar arrays, wall-mount LiFePO4 battery banks with built-in smart BMS, and seamless 0ms automatic changeover switches.</p>
        <ul style="margin: 16px 0; padding-left: 20px; line-height: 1.8;">
          <li>Complete energy audit and load sizing in Abuja</li>
          <li>High-capacity DC isolators and surge protection</li>
          <li>6,000+ cycle lithium-iron phosphate battery storage</li>
          <li>Silent, clean, zero-maintenance power reliability</li>
        </ul>
      `
    },
    'networking': {
      title: 'Structured Networking & Low-Voltage Infrastructure',
      body: `
        <p><strong>What We Do:</strong> 12U/24U server rack builds, CAT6A shielded data cabling, patch panel terminations, gigabit PoE managed switching, Wi-Fi 6 mesh distribution, and dedicated low-voltage trunking.</p>
        <ul style="margin: 16px 0; padding-left: 20px; line-height: 1.8;">
          <li>High-speed wired backbone for smart devices and CCTV</li>
          <li>Clean velcro cable management and port labeling</li>
          <li>Whole-property seamless Wi-Fi roaming</li>
          <li>Online rackmount UPS backup integration</li>
        </ul>
      `
    }
  };

  serviceLinks.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-service-key');
      const data = serviceData[serviceKey];

      if (data) {
        serviceModalTitle.textContent = data.title;
        serviceModalBody.innerHTML = data.body;
        serviceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeServiceModal = () => {
    serviceModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (serviceModalClose) serviceModalClose.addEventListener('click', closeServiceModal);
  serviceModal.addEventListener('click', (e) => {
    if (e.target === serviceModal) closeServiceModal();
  });
}

/* 8. Instant Quote Cost Estimator Tool */
function initEstimatorCalculator() {
  const propertyType = document.getElementById('est-property-type');
  const sizeSelect = document.getElementById('est-property-size');
  const checkboxes = document.querySelectorAll('.est-service-check');
  const priceDisplay = document.getElementById('est-price-display');
  const estWhatsAppBtn = document.getElementById('est-whatsapp-btn');

  if (!propertyType || !sizeSelect || !priceDisplay) return;

  const calculateEstimate = () => {
    let base = 0;
    const pType = propertyType.value;
    const pSize = sizeSelect.value;

    let multiplier = 1.0;
    if (pSize === 'small') multiplier = 0.8;
    else if (pSize === 'medium') multiplier = 1.2;
    else if (pSize === 'large') multiplier = 1.8;
    else if (pSize === 'estate') multiplier = 2.6;

    let selectedServices = [];
    checkboxes.forEach(cb => {
      if (cb.checked) {
        const val = cb.value;
        selectedServices.push(cb.getAttribute('data-name') || val);
        if (val === 'electrical') base += 250000;
        if (val === 'automation') base += 350000;
        if (val === 'cctv') base += 220000;
        if (val === 'gate') base += 280000;
        if (val === 'solar') base += 650000;
        if (val === 'networking') base += 180000;
      }
    });

    if (base === 0) {
      priceDisplay.textContent = 'Select Services Above';
      return;
    }

    const calculatedTotal = base * multiplier;
    const minEstimate = Math.round(calculatedTotal * 0.85 / 10000) * 10000;
    const maxEstimate = Math.round(calculatedTotal * 1.15 / 10000) * 10000;

    const formattedMin = '₦' + minEstimate.toLocaleString('en-NG');
    const formattedMax = '₦' + maxEstimate.toLocaleString('en-NG');

    priceDisplay.textContent = `${formattedMin} – ${formattedMax}`;

    if (estWhatsAppBtn) {
      const msg = `Hello EMMYLINK, I used your website estimator for my ${pSize} ${pType} in Abuja. Selected systems: ${selectedServices.join(', ')}. Estimated budget: ${formattedMin} – ${formattedMax}. I would like to schedule an inspection.`;
      estWhatsAppBtn.href = `https://wa.me/2347088615600?text=${encodeURIComponent(msg)}`;
    }
  };

  propertyType.addEventListener('change', calculateEstimate);
  sizeSelect.addEventListener('change', calculateEstimate);
  checkboxes.forEach(cb => cb.addEventListener('change', calculateEstimate));

  calculateEstimate();
}

/* 9. Quote Form Handling */
function initQuoteForm() {
  const form = document.getElementById('quote-form');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const service = document.getElementById('form-service').value;
    const message = document.getElementById('form-message').value.trim();

    if (!name || !phone) {
      showToast('Please provide your name and phone number.', 'error');
      return;
    }

    const waMessage = `Hello EMMYLINK, I would like to request a quote from your website:\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email || 'N/A'}\n*Service:* ${service}\n*Message:* ${message || 'Please contact me to discuss this project.'}`;
    const waUrl = `https://wa.me/2347088615600?text=${encodeURIComponent(waMessage)}`;

    showToast('Enquiry prepared! Opening WhatsApp...', 'success');

    setTimeout(() => {
      window.open(waUrl, '_blank');
      form.reset();
    }, 1200);
  });
}

function showToast(text, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = text;
  toast.className = `toast-notification show ${type}`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* 10. WhatsApp Floating Button Setup */
function initWhatsAppIntegration() {
  const floatingBtn = document.querySelector('.floating-whatsapp-btn');
  if (!floatingBtn) return;

  const defaultMsg = "Hello EMMYLINK, I found your website and I would like to make an enquiry about your services.";
  floatingBtn.href = `https://wa.me/2347088615600?text=${encodeURIComponent(defaultMsg)}`;
}
