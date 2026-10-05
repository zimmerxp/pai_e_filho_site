// Assistência Técnica Pai e Filho — comportamento do site
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

      var url = 'https://wa.me/5531991248002?text=' + encodeURIComponent(texto);
      window.open(url, '_blank', 'noopener');
    });
  }
});
