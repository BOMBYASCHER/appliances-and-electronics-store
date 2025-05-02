let cart = [];

    // Получаем элементы корзины и кнопки


// Пример функции для добавления в корзину
function addToCart(product) {
    cart.push(product);
    updateCart();
}

// Функция для обновления отображения корзины
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="product-image">
            <div class="product-details">
                <strong>${item.name}</strong><br>
                Цена: ${item.price} рублей
            </div>
            <div class="quantity-controls">
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <input type="text" value="${item.quantity}" readonly>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">Удалить</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').innerText = 'Итог: ' + totalPrice + ' рублей';
}

// Функция для изменения количества
function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    }
    updateCart();
}

// Функция для удаления товара из корзины
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Обработчик события для открытия/закрытия корзины
document.querySelector('.cart-toggle').addEventListener('click', () => {
    const cartDiv = document.querySelector('.cart');
    cartDiv.style.display = cartDiv.style.display === 'block' ? 'none' : 'block';
});

document.querySelector('.close-cart').addEventListener('click', () => {
    document.querySelector('.cart').style.display = 'none';
});

// Пример добавления товара
addToCart({ name: 'Товар 1', price: 500, image: 'path/to/image1.jpg', quantity: 1 });
addToCart({ name: 'Товар 2', price: 300, image: 'path/to/image2.jpg', quantity: 1 });