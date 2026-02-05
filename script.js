/* script.js - Renderiza produtos, controla modal e gera link WhatsApp */

// CONFIGURE AQUI o número do WhatsApp (somente dígitos, sem + ou espaços)
// Exemplo internacional: '5511999999999' para Brasil.
// Valor fornecido pelo usuário (via https://wa.me/): 5598986291605
const WHATSAPP_NUMBER = '5598986291605'; // número completo (código do país + DDD + número)

// Lista de produtos de exemplo. Atualize nomes, preços, descrições e paths de imagem em /img
const products = [
  {
    id: 1,
    name: 'Mochila Bolsa Básica Notebook 16 Escolar Impermeável Grande Masculina',
    category: 'Mochilas',
    price: 'R$ 89,90',
    images: ['https://http2.mlstatic.com/D_NQ_NP_2X_659264-MLA105022132723_012026-F.webp'],
    desc: 'Mochila impermeável para notebook 16" com espaço amplo e bolsos organizadores.'
  },
  {
    id: 2,
    name: 'Mochila Feminina Escolar Passeio Grande Capacidade Jovem',
    category: 'Mochilas',
    price: 'R$ 118,90',
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_964299-MLB76910829802_062024-F-mochila-feminina-escolar-passeio-grande-capacidade-jovem.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_633669-MLB77119877131_062024-F-mochila-feminina-escolar-passeio-grande-capacidade-jovem.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_776306-MLB76910798838_062024-F-mochila-feminina-escolar-passeio-grande-capacidade-jovem.webp'
    ],
    desc: 'Mochila feminina grande capacidade, ideal para escola e passeios. Variações de cor disponíveis.'
  }
  ,{
    id: 3,
    name: 'Mochila Feminina Escolar Grande Espaçosa Impermeável Robusta',
    category: 'Mochilas',
    price: 'R$ 119,90',
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_811893-MLB81073441080_122024-F-mochila-feminina-escolar-grande-espacosa-impermeavel-robusta.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_827339-MLB81341036219_122024-F-mochila-feminina-escolar-grande-espacosa-impermeavel-robusta.webp',
      'https://http2.mlstatic.com/D_NQ_NP_2X_768431-MLB81341037367_122024-F-mochila-feminina-escolar-grande-espacosa-impermeavel-robusta.webp'
    ],
    desc: 'Mochila feminina grande, espaçosa, robusta e impermeável. Disponível em várias cores.'
  }
];

// Elementos do DOM
const productsGrid = document.getElementById('productsGrid');
const modal = document.getElementById('productModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const whatsappLink = document.getElementById('whatsappLink');

// Atualiza o ano no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Renderiza os cards de produto dinamicamente
function renderProducts(){
  productsGrid.innerHTML = '';
  products.forEach(prod => {
    const card = document.createElement('article');
    card.className = 'card';
    const imgSrc = (prod.images && prod.images.length) ? prod.images[0] : (prod.image || '');
    card.innerHTML = `
      <div class="card-media">
        <img loading="lazy" src="${imgSrc}" alt="${prod.name}">
      </div>
      <div class="card-body">
        <h3 class="card-title">${prod.name}</h3>
        <div class="card-price">${prod.price || ''}</div>
        <div class="card-actions">
          <button class="btn btn-outline btn-detail" data-id="${prod.id}">Ver detalhes</button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
    // armazenar imagens no botão para uso no modal
    const btn = card.querySelector('.btn-detail');
    if(btn){
      const imgs = prod.images ? prod.images : (prod.image ? [prod.image] : []);
      btn.dataset.images = JSON.stringify(imgs);
    }
  });
}

// Abre modal com os detalhes do produto
function openModal(product){
  const imgs = product.images ? product.images : (product.image ? [product.image] : []);
  modalImage.src = imgs[0] || '';
  modalImage.alt = product.name;
  modalTitle.textContent = product.name;
  modalDesc.textContent = product.desc;
  modalPrice.textContent = product.price;

  // Gera link do WhatsApp com mensagem automática e url encode
  const message = `Olá, me interessei pelo produto ${product.name} da Thalia Modas.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  whatsappLink.href = url;

  // adicionar miniaturas de variações (se existirem)
  const existingThumbs = document.querySelector('.modal-thumbs');
  if(existingThumbs) existingThumbs.remove();
  if(imgs.length > 1){
    const thumbs = document.createElement('div');
    thumbs.className = 'modal-thumbs';
    imgs.forEach((src, idx)=>{
      const t = document.createElement('button');
      t.type = 'button';
      t.className = 'thumb-btn';
      t.innerHTML = `<img src="${src}" alt="variação ${idx+1}">`;
      t.addEventListener('click', ()=>{
        modalImage.src = src;
        // marcar ativo
        thumbs.querySelectorAll('.thumb-btn').forEach(b=>b.classList.remove('active'));
        t.classList.add('active');
      });
      if(idx===0) t.classList.add('active');
      thumbs.appendChild(t);
    });
    // inserir antes das ações
    const info = document.querySelector('.modal-info');
    if(info){ info.insertBefore(thumbs, info.querySelector('.modal-actions')); }
  }

  modal.classList.remove('hidden');
}

// Fecha o modal
function closeModal(){
  modal.classList.add('hidden');
  // limpa src para ajudar no carregamento de imagens
  modalImage.src = '';
}

// Delegação de eventos para os botões "Ver detalhes"
productsGrid.addEventListener('click', (e)=>{
  const btn = e.target.closest('.btn-detail');
  if(!btn) return;
  const id = Number(btn.dataset.id);
  const prod = products.find(p=>p.id===id);
  if(prod) openModal(prod);
});

// Fechar modal por overlay, botão e tecla ESC
modalOverlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
modalCloseBtn.addEventListener('click', closeModal);
window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal(); });

// Smooth scroll para âncoras
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    const href = this.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el){ el.scrollIntoView({behavior:'smooth',block:'start'}); }
    }
  });
});

// Inicialização
renderProducts();

// Configura link do botão flutuante do WhatsApp
const whatsappFloat = document.getElementById('whatsappFloat');
if(whatsappFloat){
  const msg = 'Olá, gostaria de informações sobre a Thalia Modas.';
  whatsappFloat.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// Configura link do WhatsApp no rodapé (se presente)
const whatsappFooter = document.getElementById('whatsappFooter');
if(whatsappFooter){
  const footerMsg = 'Olá, me interessei pelo catálogo da Thalia Modas.';
  whatsappFooter.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(footerMsg)}`;
}

/*
  Observações:
  - Substitua `WHATSAPP_NUMBER` pelo número real (somente dígitos, código do país + DDD + número).
  - Adicione as imagens reais na pasta /img com os nomes usados em `products[].image`.
  - Você pode estender os campos do array `products` conforme necessário.
*/