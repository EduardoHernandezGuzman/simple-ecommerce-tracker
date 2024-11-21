const paymentForm = document.getElementById('payment-form');
const getItem = JSON.parse(localStorage.getItem('CartItem'));
const totalAmountValue = getItem.reduce((total, item) => total + (item.price * item.quantity), 0);

paymentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    dataLayer.push({
        'event': 'purchase',
        'ecommerce': {
            'currency': 'USD',
            'transaction_id': Date.now().toString(),
            'value': totalAmountValue,
            'items': getItem.map((item, index) => ({
                'item_name': item.brand + ' ' + item.model,
                'item_id': index.toString(),
                'price': item.price,
                'item_brand': item.brand,
                'item_category': 'Phones',
                'quantity': item.quantity
            }))
        }
    });

    localStorage.removeItem('CartItem');
    window.location.href = 'thankyou.html';
});