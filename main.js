// Assistência Técnica Pai e Filho — comportamento do site
window.dataLayer = window.dataLayer || [];

// Eventos de conversão para o Google Tag Manager
document.addEventListener('click', function (e) {
  var a = e.target.closest ? e.target.closest('a[href]') : null;
  if (!a) return;
  var href = a.getAttribute('href') || '';
  if (href.indexOf('wa.me') > -1) {
    window.dataLayer.push({ event: 'click_whatsapp', link_url: href, pagina: location.pathname });
  } else if (href.indexOf('tel:') === 0) {
    window.dataLayer.push({ event: 'click_telefone', link_url: href, pagina: location.pathname });
  }
});

document.addEventListener('DOMContentLoaded', function () {

  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-open', open);
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Hero: troca do texto ("Conserto de geladeira / fogão / ...") sincronizada
  // com a ilustração do aparelho correspondente
  var words = document.querySelectorAll('.rotator-word');
  var layers = document.querySelectorAll('.appliance-layer');
  if (words.length) {
    var heroIndex = 0;
    words[0].classList.add('is-active');
    setInterval(function () {
      var nextIndex = (heroIndex + 1) % words.length;
      var currentWord = words[heroIndex];
      var nextWord = words[nextIndex];

      currentWord.classList.remove('is-active');
      currentWord.classList.add('is-leaving');
      nextWord.classList.add('is-active');
      setTimeout(function () {
        currentWord.classList.remove('is-leaving');
      }, 500);

      if (layers.length === words.length) {
        layers[heroIndex].classList.remove('is-active');
        layers[nextIndex].classList.add('is-active');
      }

      heroIndex = nextIndex;
    }, 2600);
  }

  // Mobile: cabeçalho some ao rolar para baixo e volta ao rolar para cima
  var header = document.querySelector('.site-header');
  if (header) {
    var lastY = window.pageYOffset;
    window.addEventListener('scroll', function () {
      var y = window.pageYOffset;
      var menuOpen = nav && nav.classList.contains('open');
      if (window.innerWidth <= 720 && !menuOpen && y > 80 && y > lastY + 4) {
        header.classList.add('is-hidden');
      } else if (y < lastY - 4 || y <= 80) {
        header.classList.remove('is-hidden');
      }
      lastY = y;
    }, { passive: true });
  }

  // Mapa de atendimento: destaca todas as regiões atendidas
  var mapEl = document.querySelector('[data-area-map]');
  if (mapEl && window.L) {
    var AREAS = [
      { n: 'Belo Horizonte', c: [-19.9167, -43.9345], r: 12000, main: true },
      { n: 'Contagem', c: [-19.9319, -44.0539], r: 5500 },
      { n: 'Betim', c: [-19.9668, -44.1983], r: 7000 },
      { n: 'Nova Lima', c: [-19.9855, -43.8469], r: 6000 },
      { n: 'Sabará', c: [-19.8851, -43.8058], r: 5500 },
      { n: 'Santa Luzia', c: [-19.7697, -43.8514], r: 6000 },
      { n: 'Vespasiano', c: [-19.6919, -43.9231], r: 5500 }
    ];
    var startMap = function () {
      if (mapEl._started) return;
      mapEl._started = true;
      var touch = L.Browser.mobile;
      var map = L.map(mapEl, { scrollWheelZoom: false, dragging: !touch, tap: false });
      map.setView([-19.9167, -43.9345], 10);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      var bounds = L.latLngBounds([]);
      var showLabels = window.innerWidth > 720;
      AREAS.forEach(function (a) {
        var circle = L.circle(a.c, {
          radius: a.r,
          color: a.main ? '#14433C' : '#C1652F',
          weight: 2,
          fillColor: a.main ? '#14433C' : '#C1652F',
          fillOpacity: a.main ? 0.14 : 0.3
        }).addTo(map);
        circle.bindTooltip(a.n, {
          permanent: showLabels || a.main,
          direction: 'center',
          className: 'area-label'
        });
        bounds.extend(L.latLng(a.c[0], a.c[1]).toBounds(a.r * 2));
      });
      map.fitBounds(bounds, { padding: [10, 10] });
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries, obs) {
        if (entries[0].isIntersecting) { startMap(); obs.disconnect(); }
      }, { rootMargin: '200px' }).observe(mapEl);
    } else {
      startMap();
    }
  }

  // Ano corrente no rodapé
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Banner de cookies (LGPD / consentimento para anúncios do Google)
  var COOKIE_KEY = 'pef_cookie_consent';
  var bar = document.querySelector('.cookie-bar');
  if (bar) {
    if (!localStorage.getItem(COOKIE_KEY)) {
      bar.classList.add('show');
    }
    var accept = bar.querySelector('[data-cookie-accept]');
    if (accept) {
      accept.addEventListener('click', function () {
        localStorage.setItem(COOKIE_KEY, 'accepted');
        bar.classList.remove('show');
      });
    }
  }

  // Formulário de contato -> monta mensagem e abre WhatsApp
  var form = document.querySelector('#form-orcamento');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = form.nome.value.trim();
      var aparelho = form.aparelho.value;
      var bairro = form.bairro.value.trim();
      var mensagem = form.mensagem.value.trim();

      if (!nome || !aparelho) {
        form.reportValidity();
        return;
      }

      var texto = 'Olá! Meu nome é ' + nome +
        '. Preciso de orçamento para: ' + aparelho +
        (bairro ? ' (bairro: ' + bairro + ')' : '') +
        (mensagem ? '. Detalhes: ' + mensagem : '') + '.';

      window.dataLayer.push({ event: 'envio_formulario', aparelho: aparelho, pagina: location.pathname });
      var url = 'https://wa.me/5531991248002?text=' + encodeURIComponent(texto);
      window.open(url, '_blank', 'noopener');
    });
  }
});
