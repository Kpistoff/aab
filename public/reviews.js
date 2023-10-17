// редирект на оставить или просмотреть отзывы
function redirectToReviewsShow() {
  window.location.href = "/reviews/reviews-show";
}


document.addEventListener('DOMContentLoaded', function() {
  const reviewForm = document.getElementById('reviewForm');
  const reviewInput = document.getElementById('reviewInput');
  const reviewText = document.getElementById('reviewText');

  reviewForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы

    // Обновляем текст в <p> на основе введенного в <input> значения
    reviewText.textContent = reviewInput.value;
  });
});




  // Функция для отображение выбранной карточки в форме отзыва
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


  // Функция для отображения активного css стиля у кнопки
  function activateButtonOnClick(buttonSelector) {
    const buttons = document.querySelectorAll(buttonSelector);
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Удаляем активный класс у всех кнопок
        buttons.forEach(btn => btn.classList.remove('active'));
  
        // Добавляем активный класс к нажатой кнопке
        button.classList.add('active');
      });
    });
  }
  activateButtonOnClick('.button');



  