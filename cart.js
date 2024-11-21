let div = document.querySelector('#check-cart');
let getItem = JSON.parse(localStorage.getItem('CartItem'));
let totalAmount = document.querySelector('#total-amount');
const buyBtn = document.getElementById('buy-btn');

function render() {
    div.innerHTML = ''; 
    let total = 0;

    if (getItem != null && getItem.length > 0) {
        for (let i = 0; i < getItem.length; i++) {
            div.innerHTML += `
            <div class="card mt-4 rounded-sm bg-dark text-white border border-white " style="width: 18rem;">
                <div class="card-body">
                    <h3 class="card-title">Brand : ${getItem[i].brand}</h3>
                    <h5 class="card-text">Model : ${getItem[i].model}</h5>
                    <h5 class="card-text">Ram : ${getItem[i].ram}</h5>
                    <h5 class="card-text">Rom : ${getItem[i].rom}</h5>
                    <h5 class="card-text">Camera : ${getItem[i].camera}</h5>
                    <h5 class="card-text">Price : ${getItem[i].price}</h5>
                    <h5 class="card-text">Quantity : ${getItem[i].quantity}</h5>
                </div>
                <div class="card-body">
                    <button onclick="deleteItem(${i})" class="btn btn-primary">Delete Item</button>
                    <button class="btn btn-primary" onclick="addQuantity(${i})">+</button>
                    <button class="btn btn-primary" onclick="lessQuantity(${i})">-</button>
                </div>
            </div> <br>
            `;
            total += getItem[i].price * getItem[i].quantity;
        }
    }
    totalAmount.textContent = `Total: $${total}`;
}

render();

function deleteItem(index) {
    dataLayer.push({
        'event': 'remove_from_cart',
        'ecommerce': {
            'currency': 'USD',
            'items': [{
                'item_name': getItem[index].brand + ' ' + getItem[index].model,
                'item_id': index.toString(),
                'price': getItem[index].price,
                'item_brand': getItem[index].brand,
                'item_category': 'Phones',
                'quantity': getItem[index].quantity
            }]
        }
    });
    getItem.splice(index, 1);
    localStorage.setItem('CartItem', JSON.stringify(getItem));
    render();
}

function lessQuantity(index) {
    if (getItem[index].quantity <= 1) {
        deleteItem(index);
    } else {
        getItem[index].quantity -= 1;
        localStorage.setItem('CartItem', JSON.stringify(getItem));
        render();
    }
}

function addQuantity(index) {
    getItem[index].quantity += 1;
    localStorage.setItem('CartItem', JSON.stringify(getItem));
    dataLayer.push({
        'event': 'change_quantity',
        'ecommerce': {
            'currency': 'USD',
            'items': [{
                'item_name': getItem[index].brand + ' ' + getItem[index].model,
                'item_id': index.toString(),
                'price': getItem[index].price,
                'item_brand': getItem[index].brand,
                'item_category': 'Phones',
                'quantity': getItem[index].quantity
            }]
        }
    });
    render();
}

window.deleteItem = deleteItem;
window.addQuantity = addQuantity;
window.lessQuantity = lessQuantity;

buyBtn.addEventListener('click', () => {
    window.location.href = 'payment.html';
});

render();