let div = document.querySelector('#div');
const phones = [
    {
        brand: 'Samsung',
        model: 'S20',
        ram: 8,
        rom: 256,
        camera: '20 megapixel',
        price: 1100,
    },
    {
        brand: 'Xiomi',
        model: 'note10',
        ram: 4,
        rom: 64,
        camera: '10 megapixel',
        price: 1300
    },
    {
        brand: 'Infinix',
        model: 'z10',
        ram: 2,
        rom: 16,
        camera: '5 megapixel',
        price: 1500
    },
    {
        brand: 'Tecno',
        model: 'spark10',
        ram: 12,
        rom: 512,
        camera: '25 megapixel',
        price: 1100
    },
    {
        brand: 'Iphone',
        model: '14',
        ram: 4,
        rom: 1024,
        camera: '30 megapixel',
        price: 1540
    },
    {
        brand: 'Oppo',
        model: 'F11',
        ram: 8,
        rom: 256,
        camera: '20 megapixel',
        price: 1450
    },
    {
        brand: 'Vivo',
        model: 'y20',
        ram: 4,
        rom: 64,
        camera: '8 megapixel',
        price: 1300
    },
    {
        brand: 'Samsung',
        model: 's50',
        ram: 50,
        rom: 1024,
        camera: '60 megapixel',
        price: 1250,
    },


];
let arr = [];

function render (){

    dataLayer.push({
        'event': 'view_item_list',
        'ecommerce': {
            'currency': 'USD',
            'items': phones.map((phone, index) => ({
                'item_name': phone.brand + ' ' + phone.model,
                'item_id': index.toString(),
                'price': phone.price,
                'item_brand': phone.brand,
                'item_category': 'Phones',
                'quantity': 1
            }))
        }
    });


for(let i=0;i<phones.length;i++){

    div.innerHTML += `
    <div class="card mt-4 rounded-sm bg-dark text-white border border-white " style="width: 18rem;">
    <div class="card-body">
      <h3 class="card-title">Brand : ${phones[i].brand}</h3>
      <h5 class="card-text">Model : ${phones[i].model}</h5>
      <h5 class="card-text">Ram : ${phones[i].ram}</h5>
      <h5 class="card-text">Rom : ${phones[i].rom}</h5>
      <h5 class="card-text">Camera : ${phones[i].camera}</h5>
      <h5 class="card-text">Price : ${phones[i].price}</h5>
    </div>
    <div class="card-body">
      <button onclick="addTocart(${i})" class="btn btn-primary">Add to Cart</button>
    </div>
  </div>    
    
    `
}
}


function addTocart(index){

if(arr.includes(phones[index])){
    phones[index].quantity += 1;

}else{
    phones[index].quantity = 1
    arr.push(phones[index]);

}
console.log(arr);


dataLayer.push({
    'event': 'add_to_cart',
    'ecommerce': {
        'currency': 'USD',
        'items': [{
            'item_name': phones[index].brand + ' ' + phones[index].model,
            'item_id': index.toString(),
            'price': phones[index].price,
            'item_brand': phones[index].brand,
            'item_category': 'Phones',
            'quantity': phones[index].quantity
        }]
    }
});

}


function checkCart() {
    dataLayer.push({'event': 'begin_checkout'}); 
    localStorage.setItem('CartItem', JSON.stringify(arr));
    window.location='cart.html';
}

window.addTocart = addTocart;
window.checkCart = checkCart;

render();