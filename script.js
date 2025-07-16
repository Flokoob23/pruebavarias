const albums = {
  naturaleza: Array.from({length:12}, (_,i)=>({
    src:`https://picsum.photos/seed/nat${i}/400/300`,
    name:`naturaleza${i+1}.jpg`
  })),
  ciudad: Array.from({length:12}, (_,i)=>({
    src:`https://picsum.photos/seed/ciud${i}/400/300`,
    name:`ciudad${i+1}.jpg`
  })),
  retrato: Array.from({length:12}, (_,i)=>({
    src:`https://picsum.photos/seed/retr${i}/400/300`,
    name:`retrato${i+1}.jpg`
  }))
};

let currentAlbum = [], currentIndex = 0, cart = [];

const intro = document.getElementById('intro'),
      header = document.getElementById('main-header'),
      mainC = document.getElementById('main-content'),
      logoSmall = document.getElementById('logo-small');

window.addEventListener('load',()=>{
  setTimeout(()=>{
    intro.style.display='none';
    header.classList.remove('hidden');
    mainC.classList.remove('hidden');
  },4000);
  populateAlbums();
});

function populateAlbums(){
  const cont = document.querySelector('.album-buttons');
  cont.innerHTML='';
  for(let key of Object.keys(albums)){
    let btn = document.createElement('button');
    btn.textContent = key.toUpperCase();
    btn.onclick = ()=>selectAlbum(key);
    cont.appendChild(btn);
  }
}

function selectAlbum(key){
  currentAlbum = albums[key];
  showGallery();
}

function showGallery(){
  const gal = document.getElementById('gallery');
  gal.innerHTML='';
  currentAlbum.forEach((img,i)=>{
    let el = document.createElement('img');
    el.src=img.src;el.alt=img.name;el.className='thumb';
    el.onclick=()=>openImage(i);
    gal.appendChild(el);
  });
}

function openImage(i){
  currentIndex=i;
  updateModal();
  document.getElementById('image-modal').classList.remove('hidden');
}

function updateModal(){
  document.getElementById('modal-img').src = currentAlbum[currentIndex].src;
}

['prev','next'].forEach(dir=>{
  document.getElementById(dir).onclick = ()=>{
    currentIndex = dir==='prev' ? (currentIndex-1+currentAlbum.length)%currentAlbum.length
                                 : (currentIndex+1)%currentAlbum.length;
    updateModal();
  };
});

document.getElementById('add-cart').onclick=()=>{
  const img = currentAlbum[currentIndex];
  if(!cart.some(x=>x.name===img.name)) cart.push(img);
  updateCartDisplay();
  document.getElementById('image-modal').classList.add('hidden');
};

document.querySelectorAll('.close').forEach(x=>x.onclick=()=>{
  x.closest('.modal').classList.add('hidden');
});

document.getElementById('cart').onclick=()=>{
  buildCartModal();
  document.getElementById('cart-modal').classList.remove('hidden');
};

function updateCartDisplay(){
  document.getElementById('cart-count').textContent = cart.length;
  document.getElementById('cart-total').textContent = cart.length * 1500;
}

function buildCartModal(){
  const cont = document.getElementById('cart-items');
  cont.innerHTML='';
  cart.forEach((item,i)=>{
    const div = document.createElement('div');
    div.className='item';
    div.innerHTML = `
      <span>${item.name}</span>
      <div>
        <button class="remove" onclick="removeFromCart(${i})">Eliminar</button>
        <img src="${item.src}" alt="${item.name}" />
      </div>`;
    cont.appendChild(div);
  });
  document.getElementById('cart-total-modal').textContent = cart.length * 1500;
}

window.removeFromCart = function(i){
  cart.splice(i,1);
  updateCartDisplay();
  buildCartModal();
};

document.getElementById('checkout-btn').onclick=()=>{
  const names = cart.map(x=>x.name).join(', ');
  const txt = `HOLA QUIERO COMPRAR LAS SIGUIENTES FOTOS: ${names}`;
  window.open(`https://wa.me/543584328924?text=${encodeURIComponent(txt)}`, '_blank');
};

