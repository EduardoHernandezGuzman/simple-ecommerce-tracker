const paymentForm = document.getElementById('payment-form');

paymentForm.addEventListener('submit', (event) => {
    event.preventDefault();

  
    console.log("Pago simulado procesado");

 
    window.location.href = 'thankyou.html';
});