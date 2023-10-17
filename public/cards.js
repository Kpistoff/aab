// ОГРАНИЧЕНИЯ ВВОДА ИНПУТА
const inputElement = document.querySelector('.enter_id');

inputElement.addEventListener('input', function(event) {
  this.value = this.value.replace(/\D/g, ''); // Оставляем только цифры
});



// АКТИВНЫЙ КЛАСС ДЛЯ КАРТОЧЕК
const cards = document.querySelectorAll('.card');
    
cards.forEach(card => {
    card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});



  // Функция для обновления значения activeCard
  function updateActiveCard(cardId) {
    document.getElementById('isActive').value = cardId;
  }
  // Назначаем обработчики событий для каждой карточки
  document.getElementById('card1').addEventListener('click', function() {
    updateActiveCard('card1');
  });
  document.getElementById('card2').addEventListener('click', function() {
    updateActiveCard('card2');
  });
  document.getElementById('card3').addEventListener('click', function() {
    updateActiveCard('card3');
  });



  


