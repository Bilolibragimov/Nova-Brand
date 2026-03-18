const products = [
    { 
        id: 1, name: "Premium Angora Jacket", price: "750,000 UZS", img: "1.png", cat: "new",
        desc: "Воплощение элегантности и тепла. Эта куртка из премиальной ангорской шерсти — идеальный выбор для стильной весны в Ангрене.",
        sizes: ["S", "M", "L"]
    },
    { 
        id: 2, name: "Suit Midnight Classic", price: "890,000 UZS", img: "2.png", cat: "clothes",
        desc: "Безупречный черный костюм глубокого оттенка. Классический крой, который подчеркивает статус и вкус своего владельца.",
        sizes: ["M", "L", "XL"]
    },
    { 
        id: 3, name: "White Ivory Sport Set", price: "620,000 UZS", img: "3.png", cat: "clothes",
        desc: "Комфортный спортивный комплект в оттенке слоновой кости. Мягкий хлопок и свободный крой для активного отдыха.",
        sizes: ["S", "M"]
    },
    { 
        id: 4, name: "Lookbook Full Outfit 1", price: "1,200,000 UZS", img: "1.png", cat: "look",
        desc: "Готовый образ из Лукбука: куртка, брюки и аксессуары. Сбалансированный стиль, который не требует доработок.",
        sizes: ["S", "M", "L"]
    }
];

let selectedItem = null;
let selectedSize = null;

function renderProducts(filter = 'all') {
    const grid = document.getElementById('main-grid');
    grid.innerHTML = '';
    const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="img-container"><img src="${item.img}"></div>
            <div class="item-info">
                <h3>${item.name}</h3>
                <div class="price">${item.price}</div>
            </div>
        `;
        card.onclick = () => openModal(item);
        grid.appendChild(card);
    });
}

function openModal(item) {
    selectedItem = item;
    selectedSize = null; // Сбрасываем размер при новом открытии
    
    document.getElementById('m-img').src = item.img;
    document.getElementById('m-name').innerText = item.name;
    document.getElementById('m-price').innerText = item.price;
    document.getElementById('m-desc').innerText = item.desc;
    
    const sizeContainer = document.getElementById('m-sizes');
    sizeContainer.innerHTML = '';
    
    item.sizes.forEach(size => {
        const btn = document.createElement('button');
        btn.className = 'size-btn';
        btn.innerText = size;
        btn.onclick = (e) => {
            e.stopPropagation();
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedSize = size;
        };
        sizeContainer.appendChild(btn);
    });

    document.getElementById('productModal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Блокируем скролл сайта
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Возвращаем скролл
}

// ДОБАВЛЕНО: Закрытие окна при клике на темный фон
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeModal();
    }
}

function redirectToTelegram() {
    if(!selectedSize) {
        alert("Пожалуйста, выберите размер!");
        return;
    }
    const text = `Здравствуйте, Woman Shop! Хочу заказать модель: ${selectedItem.name}\nРазмер: ${selectedSize}\nДоставка в Ангрен. Цена: ${selectedItem.price}`;
    window.open(`https://t.me/ozoda_brend_?text=${encodeURIComponent(text)}`, '_blank');
}

function applyFilter(cat, btn) {
    document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(cat);
}

// Загрузка товаров при старте
window.onload = () => renderProducts();