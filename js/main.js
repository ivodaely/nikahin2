/* ============================================
   NIKAHIN — Main JavaScript
   Dependencies: jQuery (CDN loaded in HTML)
============================================ */

$(document).ready(function () {

  /* ── Custom Cursor ──────────────────────── */
  const $cursor = $('<div class="cursor"></div>');
  const $follower = $('<div class="cursor-follower"></div>');
  $('body').append($cursor).append($follower);

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  $(document).on('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    $cursor.css({ left: mouseX, top: mouseY });
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    $follower.css({ left: followerX, top: followerY });
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  $('a, button, .design-card, .filter-btn, .pricing-cta, .form-submit').on('mouseenter', function () {
    $cursor.css({ width: '20px', height: '20px', background: 'var(--gold)' });
    $follower.css({ opacity: '0.3' });
  }).on('mouseleave', function () {
    $cursor.css({ width: '12px', height: '12px', background: 'var(--gold)' });
    $follower.css({ opacity: '0.5' });
  });


  /* ── Navbar Scroll Effect ───────────────── */
  const $navbar = $('.navbar');

  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 60) {
      $navbar.addClass('scrolled');
    } else {
      $navbar.removeClass('scrolled');
    }

    // Active nav link based on section
    const scrollPos = $(window).scrollTop() + 100;
    $('section[id]').each(function () {
      const sectionTop = $(this).offset().top;
      const sectionBottom = sectionTop + $(this).outerHeight();
      const sectionId = $(this).attr('id');
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        $('.navbar-menu a').removeClass('active');
        $(`.navbar-menu a[href="#${sectionId}"]`).addClass('active');
      }
    });
  });


  /* ── Hamburger Menu ─────────────────────── */
  const $hamburger = $('.hamburger');
  const $mobileMenu = $('.mobile-menu');
  const $mobileOverlay = $('.mobile-overlay');

  $hamburger.on('click', function () {
    $(this).toggleClass('active');
    $mobileMenu.toggleClass('open');
    $('body').toggleClass('no-scroll');
  });

  $('.mobile-menu a').on('click', function () {
    $hamburger.removeClass('active');
    $mobileMenu.removeClass('open');
    $('body').removeClass('no-scroll');
  });


  /* ── Smooth Scroll ──────────────────────── */
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this).attr('href');
    if ($(target).length) {
      e.preventDefault();
      const offset = $(target).offset().top - 80;
      $('html, body').animate({ scrollTop: offset }, 700, 'swing');
    }
  });


  /* ── Scroll Reveal ──────────────────────── */
  function checkReveal() {
    const windowBottom = $(window).scrollTop() + $(window).height() - 60;
    $('.reveal').each(function () {
      if ($(this).offset().top < windowBottom) {
        $(this).addClass('visible');
      }
    });
  }

  $(window).on('scroll', checkReveal);
  checkReveal(); // Run once on load


  /* ── Design Filter Tabs ─────────────────── */
  $('.filter-btn').on('click', function () {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    const filter = $(this).data('filter');

    $('.design-card').each(function (i) {
      const card = $(this);
      const style = card.data('style');

      if (filter === 'all' || style === filter) {
        card.css('opacity', 0).show().delay(i * 60).animate({ opacity: 1 }, 300);
      } else {
        card.fadeOut(200);
      }
    });
  });


  /* ── Live Demo Modal ────────────────────── */
  const $modal = $('.modal-overlay');
  const modalData = {
    1: {
      var: 'modal-var-1',
      names: ['Arief', 'Salsabila'],
      tagline: 'Together in Love',
      date: '15 Maret 2025',
      time: '10:00 WIB',
      location: 'Masjid Al-Azhar',
      address: 'Jakarta Selatan'
    },
    2: {
      var: 'modal-var-2',
      names: ['Dimas', 'Maharani'],
      tagline: 'Two Hearts, One Journey',
      date: '22 Juni 2025',
      time: '13:00 WIB',
      location: 'The Ballroom',
      address: 'Bandung, Jawa Barat'
    },
    3: {
      var: 'modal-var-3',
      names: ['Rizky', 'Safira'],
      tagline: 'Bound by Love',
      date: '8 Agustus 2025',
      time: '11:00 WIB',
      location: 'Grand Garden',
      address: 'Bogor, Jawa Barat'
    },
    4: {
      var: 'modal-var-4',
      names: ['Farhan', 'Anindita'],
      tagline: 'Forever and Always',
      date: '30 November 2025',
      time: '09:00 WIB',
      location: 'Istana Ballroom',
      address: 'Surabaya, Jawa Timur'
    },
    5: {
      var: 'modal-var-5',
      names: ['Bima', 'Clarissa'],
      tagline: 'A Love Story Begins',
      date: '14 Februari 2026',
      time: '14:00 WIB',
      location: 'Rumah Kebun',
      address: 'Depok, Jawa Barat'
    },
    6: {
      var: 'modal-var-6',
      names: ['Hendra', 'Laila'],
      tagline: 'In Bloom, In Love',
      date: '5 April 2026',
      time: '10:30 WIB',
      location: 'The Rosewood',
      address: 'Yogyakarta'
    }
  };

  function openModal(id) {
    const data = modalData[id];
    if (!data) return;

    const html = `
      <div class="demo-invitation ${data.var}">
        <div class="demo-inv-header">
          <span class="demo-inv-ornament">✦ ❋ ✦</span>
          <span class="demo-inv-tagline">${data.tagline}</span>
          <div class="demo-inv-names">
            ${data.names[0]}
            <span class="demo-inv-and">&amp;</span>
            ${data.names[1]}
          </div>
        </div>
        <div class="demo-inv-body">
          <div class="demo-inv-detail">
            <div class="demo-inv-detail-item">
              <div class="d-icon">📅</div>
              <span class="d-label">Tanggal</span>
              <div class="d-val">${data.date}</div>
            </div>
            <div class="demo-inv-detail-item">
              <div class="d-icon">🕐</div>
              <span class="d-label">Waktu</span>
              <div class="d-val">${data.time}</div>
            </div>
            <div class="demo-inv-detail-item">
              <div class="d-icon">📍</div>
              <span class="d-label">Lokasi</span>
              <div class="d-val">${data.location}</div>
            </div>
          </div>
          <p style="text-align:center; font-size:0.85rem; color:var(--muted); margin-bottom:20px; line-height:1.7;">
            ${data.address} <br>
            Merupakan suatu kehormatan dan kebahagiaan bagi kami <br>
            untuk mengundang Anda hadir di hari istimewa kami.
          </p>
          <button class="demo-inv-rsvp-btn">✉ Konfirmasi Kehadiran</button>
        </div>
      </div>
    `;

    $('.modal-content').html(html);
    $modal.addClass('open');
    $('body').addClass('no-scroll');
  }

  $(document).on('click', '.design-card-overlay-btn', function (e) {
    e.preventDefault();
    const id = $(this).closest('.design-card').data('id');
    openModal(id);
  });

  $(document).on('click', '.modal-close, .modal-overlay', function (e) {
    if ($(e.target).hasClass('modal-overlay') || $(e.target).hasClass('modal-close')) {
      $modal.removeClass('open');
      $('body').removeClass('no-scroll');
    }
  });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      $modal.removeClass('open');
      $('body').removeClass('no-scroll');
    }
  });


  /* ── Counter Animation ──────────────────── */
  function animateCounter($el) {
    const target = parseInt($el.data('count'));
    const suffix = $el.data('suffix') || '';
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      $el.text(Math.floor(current).toLocaleString('id') + suffix);
    }, 16);
  }

  // Trigger counters when they come into view
  const countersAnimated = new Set();

  $(window).on('scroll', function () {
    $('.counter').each(function () {
      const id = $(this).data('id') || $(this).index();
      if (!countersAnimated.has(id)) {
        const elTop = $(this).offset().top;
        const windowBottom = $(window).scrollTop() + $(window).height() - 40;
        if (elTop < windowBottom) {
          countersAnimated.add(id);
          animateCounter($(this));
        }
      }
    });
  });


  /* ── Form Validation & Submit ───────────── */
  $('#registerForm').on('submit', function (e) {
    e.preventDefault();
    const $btn = $(this).find('.form-submit');
    const originalText = $btn.text();

    // Basic validation
    let valid = true;
    $(this).find('[required]').each(function () {
      if (!$(this).val().trim()) {
        valid = false;
        $(this).css('border-color', '#E05050');
        setTimeout(() => $(this).css('border-color', 'transparent'), 2000);
      }
    });

    if (!$('#agreeTerms').is(':checked')) {
      valid = false;
    }

    if (!valid) {
      $btn.text('⚠ Mohon lengkapi semua field').css('background', '#8B4040');
      setTimeout(() => {
        $btn.text(originalText).css('background', '');
      }, 2000);
      return;
    }

    $btn.text('Mendaftar...').prop('disabled', true);
    setTimeout(function () {
      $btn.text('✓ Berhasil Mendaftar!').css('background', 'linear-gradient(135deg, #2A6040, #1A4020)');
      setTimeout(function () {
        $btn.text(originalText).css('background', '').prop('disabled', false);
        $('#registerForm')[0].reset();
      }, 3000);
    }, 1500);
  });

  // Input focus highlight
  $('.form-input, .form-select').on('focus', function () {
    $(this).closest('.form-group').find('.form-label').css('color', 'var(--gold)');
  }).on('blur', function () {
    $(this).closest('.form-group').find('.form-label').css('color', '');
  });


  /* ── Parallax Hero ──────────────────────── */
  $(window).on('scroll', function () {
    const scrolled = $(window).scrollTop();
    $('.hero-bg').css('transform', `translateY(${scrolled * 0.3}px)`);
    $('.hero-botanical-svg').css('transform', `translateY(calc(-50% + ${scrolled * 0.15}px))`);
  });


  /* ── Particle Dots Background (Hero) ───── */
  function createParticles() {
    const $canvas = $('<canvas id="heroCanvas"></canvas>');
    $('.hero').prepend($canvas);
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d');

    canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0.4;';

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    $(window).on('resize', resize);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.2
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 148, 58, ${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  createParticles();


  /* ── No-scroll util ─────────────────────── */
  $('body').append('<style>.no-scroll{overflow:hidden}</style>');


  /* ── Init ───────────────────────────────── */
  checkReveal();

  // Assign counter IDs
  $('.counter').each(function (i) {
    $(this).data('id', i);
  });

  // Trigger scroll-dependent effects once on load
  $(window).trigger('scroll');

});``