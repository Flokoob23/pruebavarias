let cart = [];

const albumImages = {
    naturaleza: [
        { src: 'https://picsum.photos/id/1018/300', name: 'naturaleza1.jpg' },
        { src: 'https://picsum.photos/id/1020/300', name: 'naturaleza2.jpg' }
    ],
    ciudad: [
        { src: 'https://picsum.photos/id/1035/300', name: 'ciudad1.jpg' },
        { src: 'https://picsum.photos/id/1043/300', name: 'ciudad2.jpg' }
    ]
};

window.onload = () => {
    setTimeout(() => {
        document.getElementById('logo').classList.add('shrink');
    }, 2000);
};

function loadAlbum(name) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    albumImages[name].forEach((img, index) => {
        const image = document.createElement('img');
        image.src = img.src;
        image.className = 'thumbnail';
        image.onclick = () => viewImage(img);
        gallery.appendChild(image);
    });
}

function viewImage(img) {
    const isInCart = cart.find(c => c.name === img.name);
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.innerHTML = `
        <div style="background:white; padding:20px; text-align:center;">
            <img src="${img.src}" style="max-width:500px; max-height:80vh;"><br>
            <button onclick="addToCart('${img.src}', '${img.name}')">Agregar al carrito ($1500)</button>
            <button onclick="this.parentElement.parentElement.remove()">Cerrar</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function addToCart(src, name) {
    cart.push({ src, name });
    updateCart();
    document.querySelectorAll('div[style*="position: fixed"]').forEach(modal => modal.remove());
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('cart-total').innerText = cart.length * 1500;
}

function showCheckout() {
    document.getElementById('checkout').style.display = 'block';
    const container = document.getElementById('checkout-images');
    const total = document.getElementById('checkout-total');
    const whatsappLink = document.getElementById('whatsapp-link');
    container.innerHTML = '';

    let message = 'HOLA QUIERO COMPRAR LAS SIGUIENTES FOTOS:\n';

    cart.forEach(item => {
        const img = document.createElement('img');
        img.src = item.src;
        container.appendChild(img);
        message += `- ${item.name}\n`;
    });

    const totalAmount = cart.length * 1500;
    total.innerText = totalAmount;
    whatsappLink.href = `https://wa.me/543584328924?text=${encodeURIComponent(message)}`;
}

document.getElementById('cart').addEventListener('click', showCheckout);
