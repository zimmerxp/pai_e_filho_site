// Assistência Técnica Pai e Filho — comportamento do site
document.addEventListener('DOMContentLoaded', function () {

  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
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
