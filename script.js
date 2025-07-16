const albums = {
  naturaleza: Array.from({length:8}, (_,i)=>({
    src: `https://picsum.photos/seed/nat${i}/400/300`,
    name: `naturaleza${i+1}.jpg`
  })),
  ciudad: Array.from({length:8}, (_,i)=>({
    src: `https://picsum.photos/seed/ciud${i}/400/300`,
    name: `ciudad${i+1}.jpg`
  })),
  retrato: Array.from({length:8}, (_,i)=>({
    src: `https://picsum.photos/seed/retr${i}/400/300`,
    name: `retrato${i+1}.jpg`
  }))
};

let currentAlbum = [];
let currentIndex = 0;
let cart = [];

const intro = document.getElementById('intro'),
      logoSmall = document.getElementById('logo-small');

window.addEventListener('load', () => {
  setTimeout(()=> intro.classList.add('fade'), 3000);
  setTimeout(()=> logoSmall.classList.add('show'), 3500);
  populateAlbums();
});

function populateAlbums(){
  const container = document.querySelector('.album-buttons');
  container.innerHTML = '';
  Object.keys(albums).forEach(key => {
    const btn = document.createElement('button');
    btn.textContent = key.toUpperCase();
    btn.onclick = ()=> openAlbum(key);
    container.appendChild(btn);
  });
}

function openAlbum(name){
  intro.style.display = 'none';
  currentAlbum = albums[name];
  renderGallery();
}

function renderGallery(){
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  currentAlbum.forEach((img, idx)=>{
    const el = document.createElement('img');
    el.src = img.src; el.alt = img.name;
    el.className = 'thumb';
    el.onclick = ()=> openImage(idx);
    gallery.appendChild(el);
  });
}

function openImage(idx){
  currentIndex = idx;
  updateModal();
  showModal('image-modal');
}

function updateModal(){
  const modalImg = document.getElementById('modal-img');
  modalImg.src = currentAlbum[currentIndex].src;
}

document.getElementById('prev').onclick = () => {
  currentIndex = (currentIndex - 1 + currentAlbum.length) % currentAlbum.length;
  updateModal();
};
document.getElementById('next').onclick = () => {
  currentIndex = (currentIndex + 1) % currentAlbum.length;
  updateModal();
};
document.getElementById('add-cart').onclick = () => {
  const img = currentAlbum[currentIndex];
  if (!cart.find(i=> i.name === img.name)) {
    cart.push(img); updateCart();
  }
  hideModal('image-modal');
};

document.querySelectorAll('.modal .close').forEach(b => b.onclick = () => hideModal(b.closest('.modal')));
document.getElementById('cart').onclick = () => {
  populateCartModal(); showModal('cart-modal');
};

function updateCart(){
  document.getElementById('cart-count').textContent = cart.length;
  document.getElementById('cart-total').textContent = cart.length * 1500;
}

function populateCartModal(){
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  cart.forEach((item, i)=>{
    const div = document.createElement('div');
    div.className='item';
    div.innerHTML = `<span>${item.name}</span><div>
      <button class="remove" onclick="removeItem(${i})">Eliminar</button>
      <img src="${item.src}" alt="${item.name}" /></div>`;
    container.appendChild(div);
  });
  document.getElementById('cart-total-modal').textContent = cart.length * 1500;
}

window.removeItem = function(i){
  cart.splice(i,1);
  updateCart(); populateCartModal();
};

document.getElementById('checkout-btn').onclick = () => {
  const names = cart.map(i=>i.name).join(', ');
  const msg = `HOLA QUIERO COMPRAR LAS SIGUIENTES FOTOS: ${names}`;
  window.open(`https://wa.me/543584328924?text=${encodeURIComponent(msg)}`, '_blank');
};
  
function showModal(id){
  document.getElementById(id).classList.remove('hidden');
}
function hideModal(idOrEl){
  const el = typeof idOrEl === 'string' ? document.getElementById(idOrEl) : idOrEl;
  el.classList.add('hidden');
}
