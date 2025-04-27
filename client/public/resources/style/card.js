document.getElementById('cart-button').addEventListener('click', function() {
    document.getElementById('cartContainer').classList.toggle('active');
});

document.getElementById('closeButton').addEventListener('click', function() {
    document.getElementById('cartContainer').classList.remove('active');
});