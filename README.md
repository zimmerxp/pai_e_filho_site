# Site Pai e Filho — novo site

Site estático (HTML/CSS/JS puro, sem dependências de build), pronto para hospedar em qualquer lugar — inclusive GitHub Pages, como seus outros projetos.

## Estrutura
```
index.html        → página inicial
servicos.html      → detalhe de cada tipo de conserto (bom para SEO por palavra-chave)
sobre.html         → confiança / história
contato.html       → formulário que abre o WhatsApp já preenchido + mapa
blog.html          → conteúdo original (ajuda no SEO e na aprovação do AdSense)
privacidade.html   → política de privacidade (exigida pelo AdSense e pela LGPD)
css/style.css      → todo o visual
js/main.js         → menu mobile, banner de cookies, formulário → WhatsApp
robots.txt         → libera indexação e aponta o sitemap
sitemap.xml        → mapa do site para o Google
ads.txt            → placeholder, precisa do seu Publisher ID real
```

## O que já está pronto para SEO
- Cada página tem `title`, `meta description`, `canonical` e Open Graph próprios.
- Dados estruturados (schema.org): `LocalBusiness`, `FAQPage` e `BreadcrumbList` em JSON-LD.
- HTML semântico (`h1` único por página, `main`, `nav`, `footer`).
- `robots.txt` + `sitemap.xml`.
- Site rápido: sem frameworks pesados, fontes carregadas via `preconnect`.
- Totalmente responsivo (testar de 360px a desktop).

## O que você precisa preencher antes de publicar
1. **AdSense**: crie a conta em https://www.google.com/adsense, cole o script de verificação no `<head>` de cada página (já deixei o comentário indicando o local) e troque `ca-pub-XXXXXXXXXXXXXXXX` pelo seu ID nos blocos `<!-- Espaço reservado... -->`.
2. **ads.txt**: troque o conteúdo de `ads.txt` pelo valor exato mostrado no painel do AdSense.
3. **Depoimentos**: os 3 depoimentos da home são placeholders (marcados com comentário `ATENÇÃO`) — troque por relatos reais de clientes. O AdSense e o Google não toleram depoimentos falsos apresentados como reais.
4. **Fotos reais**: hoje a identidade visual usa ilustração vetorial (sem fotos). Se quiser, posso adicionar fotos reais da equipe/atendimentos depois — ajuda tanto na conversão quanto na confiança do visitante.
5. **Google Search Console**: depois de publicar, cadastre o domínio, envie o `sitemap.xml` e confirme a propriedade (pode usar a mesma verificação do Wix atual, se quiser manter o histórico).
6. **Mapa**: o iframe do Google Maps em `contato.html` está usando uma busca genérica por "Belo Horizonte" — se quiser, troque pelo endereço exato do ponto de atendimento.

## Como publicar
- **GitHub Pages** (mesmo modelo do seu projeto `gestao_paiefilho`): suba esta pasta para um repositório e ative o Pages nas configurações.
- **Domínio atual**: aponte `www.assistenciatecnicapaiefilho.com` para o novo host e mantenha o domínio — isso preserva todo o SEO já construído.
