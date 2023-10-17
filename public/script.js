const mobileImage = document.querySelector('.mobile-image');
const overlay = document.querySelector('.overlay');

mobileImage.addEventListener('click', () => {
  overlay.style.display = 'block'; // Показываем overlay при клике
});

overlay.addEventListener('click', () => {
  overlay.style.display = 'none'; // Скрываем overlay при клике на него
});


// карточки товаров
document.addEventListener('DOMContentLoaded', () => {
  const productLinks = document.querySelectorAll('.product-card');

  productLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const productId = link.getAttribute('id');
      window.location.href = `/shop/${productId}`;
    });
  });
});


// faq script
var titles = document.querySelectorAll('.accordion-title');
var descriptions = document.querySelectorAll('.accordion-description');


titles.forEach(function(title) {
title.addEventListener('click', function() {
  var block = this.parentElement;
  block.classList.toggle('active');
});
});


// функция для изменения кнопки при вводе промокода
function applyPromo() {
  var input = document.querySelector('.enter_promo');
  var button = document.querySelector('.use_promo');
  var inputValue = input.value.trim(); // Получить значение поля ввода без пробелов

  if (inputValue !== "") { // Проверить, не пустое ли поле ввода
    button.textContent = 'Applied';
    button.style.backgroundColor = '#3EB489';
  }
}
