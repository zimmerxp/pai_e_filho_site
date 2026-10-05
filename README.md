# Site Pai e Filho — novo site

Site estático (HTML/CSS/JS puro, sem dependências de build). Hoje publicado só no GitHub Pages, sem domínio próprio ainda (isso foi removido de propósito — ver seção abaixo).

## Estrutura (tudo na raiz, sem pastas)
```
index.html        → página inicial
servicos.html      → detalhe de cada tipo de conserto (bom para SEO por palavra-chave)
sobre.html         → confiança / história
contato.html       → formulário que abre o WhatsApp já preenchido + mapa
blog.html          → conteúdo original (ajuda no SEO e na aprovação do AdSense)
privacidade.html   → política de privacidade (exigida pelo AdSense e pela LGPD)
style.css          → todo o visual
main.js            → menu mobile, banner de cookies, formulário → WhatsApp, animação do hero
robots.txt         → libera indexação e aponta o sitemap
sitemap.xml        → mapa do site para o Google
CNAME              → domínio próprio no GitHub Pages
ads.txt            → placeholder, precisa do seu Publisher ID real quando ativar o AdSense
```

## Domínio próprio
O site está configurado para `www.assistenciatecnicapaiefilho.com`:
- Arquivo `CNAME` na raiz (o GitHub Pages usa para reconhecer o domínio).
- `canonical` e `og:url` em todas as páginas, `BreadcrumbList` e `url` no schema `LocalBusiness`.
- `sitemap.xml` e referência a ele no `robots.txt`.

DNS (já configurado no Wix): 4 registros A para 185.199.108.153, .109.153, .110.153 e .111.153, e CNAME `www` para `zimmerxp.github.io`.
Depois de propagar: Settings > Pages > Custom domain > `www.assistenciatecnicapaiefilho.com` e marcar Enforce HTTPS.
Depois, cadastre o domínio no Google Search Console e envie o `sitemap.xml`.

## O que já está pronto para SEO
- `title` e `meta description` únicos por página.
- Dados estruturados (schema.org): `LocalBusiness` e `FAQPage` em JSON-LD.
- HTML semântico (`h1` único por página, `main`, `nav`, `footer`).
- Site rápido: sem frameworks pesados, fontes carregadas via `preconnect`.
- Totalmente responsivo, com ajustes específicos para celular (a maior parte do tráfego).

## O que falta antes de publicar "pra valer"
1. **AdSense**: os espaços de anúncio foram removidos por enquanto. Quando for ativar, me avise que eu volto a incluir os blocos e o script de verificação.
2. **ads.txt**: troque o conteúdo pelo valor exato mostrado no painel do AdSense, quando ativar.
3. **Depoimentos**: os 3 depoimentos da home são placeholders com avatar ilustrado (não é foto real de ninguém, de propósito) — troque por relatos e fotos reais de clientes antes de publicar oficialmente. Depoimentos falsos apresentados como reais violam as políticas do Google.
4. **Mapa**: os iframes do Google Maps (`contato.html` e a seção de área de atendimento em `index.html`) usam uma busca genérica por "Belo Horizonte" — troque pelo endereço exato quando quiser.
5. **Google Search Console**: quando o domínio final estiver decidido, cadastre a propriedade e envie o sitemap (depois de recriá-lo).

## Como publicar
- **GitHub Pages**: suba os arquivos (sem subpastas) para a raiz do repositório e ative o Pages em Settings > Pages, branch `main`, pasta `/ (root)`.
- Sem domínio customizado por enquanto — o site fica em `seu-usuario.github.io/nome-do-repo/`.
