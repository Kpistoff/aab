document.addEventListener('DOMContentLoaded', function() {
  // Обработчик для кнопки с классом to-copy1
  var copyButton1 = document.querySelector('.to-copy1');
  var cryptoAddress = document.querySelector('.crypto-adress');
  var image1 = copyButton1.querySelector('img');
  var originalWidth1 = image1.width;
  var originalHeight1 = image1.height;
  var isImage1Small = false;

  copyButton1.addEventListener('mousedown', function(event) {
    event.preventDefault();
    if (!isImage1Small) {
      image1.style.width = '20px';
      image1.style.height = '20px';
      isImage1Small = true;
    }

    var tempInput = document.createElement('input');
    tempInput.value = cryptoAddress.textContent;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  });

  copyButton1.addEventListener('mouseup', function() {
    if (isImage1Small) {
      image1.style.width = originalWidth1 + 'px';
      image1.style.height = originalHeight1 + 'px';
      isImage1Small = false;
    }
  });

  image1.addEventListener('contextmenu', function(event) {
    event.preventDefault();
  });

  // Обработчик для кнопки с классом to-copy2 (копирование sum-adress)
  var copyButton2 = document.querySelector('.to-copy2');
  var sumAddress = document.querySelector('.sum-adress');
  var image2 = copyButton2.querySelector('img');
  var originalWidth2 = image2.width;
  var originalHeight2 = image2.height;
  var isImage2Small = false;

  copyButton2.addEventListener('mousedown', function(event) {
    event.preventDefault();
    if (!isImage2Small) {
      image2.style.width = '20px';
      image2.style.height = '20px';
      isImage2Small = true;
    }

    var tempInput = document.createElement('input');
    tempInput.value = sumAddress.textContent;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  });

  copyButton2.addEventListener('mouseup', function() {
    if (isImage2Small) {
      image2.style.width = originalWidth2 + 'px';
      image2.style.height = originalHeight2 + 'px';
      isImage2Small = false;
    }
  });

  image2.addEventListener('contextmenu', function(event) {
    event.preventDefault();
  });
});



/* модальное окно при оплате */
document.addEventListener('DOMContentLoaded', function() {
  var confPayButton = document.querySelector('.conf-pay');
  var modal = document.querySelector('.modal');
  var overlay = document.querySelector('.overlay');
  var goButton = document.querySelector('.go_p');

  confPayButton.addEventListener('click', function() {
    // Показываем модальное окно и затемненный фон
    modal.style.display = 'block';
    overlay.style.display = 'block';
  });

  // Закрываем модальное окно при клике на затемненный фон или кнопку "Я оплатил"
  overlay.addEventListener('click', function() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  });

  goButton.addEventListener('click', function() {
    // Здесь замените "домашний_эндпоинт" на URL вашего домашнего эндпоинта
    var homeEndpoint = '/';
    window.location.href = homeEndpoint;
  });

  modal.querySelector('.conf-pay').addEventListener('click', function() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  });
});


/* модальное окно детали платежа */
document.addEventListener('DOMContentLoaded', function() {
  var detailsButton = document.querySelector('.details');
  var modal = document.querySelector('.modal-details');
  var overlay = document.querySelector('.overlay');
  var closeButton = document.querySelector(".close_w");

  detailsButton.addEventListener('click', function() {
    modal.style.display = 'block'; // Отобразить модальное окно
    overlay.style.display = 'block'; // Отобразить фон
  });

  overlay.addEventListener('click', function() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  });
  closeButton.addEventListener('click', function() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  });
});


 // Функция для генерации случайной строки (id заказа)
 function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}
// Получите ссылку на элемент <span> с классом "ur-id"
var urIdSpan = document.querySelector(".ur-id");
// Генерируйте случайную строку длиной 13 символов
var randomString = generateRandomString(26);
// Установите сгенерированную строку в текст элемента <span>
urIdSpan.textContent = randomString;



// таймер отсчета для оплаты
var countdownTime = 20 * 60 * 1000;
// Функция, которая будет обновлять таймер каждую секунду
function updateTimer() {
  var minutes = Math.floor(countdownTime / 60000);
  var seconds = Math.floor((countdownTime % 60000) / 1000);
  // Добавляем ноль перед однозначными числами
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  // Обновляем текст таймера
  document.getElementById("timer").innerHTML = formattedMinutes + ":" + formattedSeconds;
  // Уменьшаем оставшееся время
  countdownTime -= 1000;
  // Если время истекло, выполните здесь необходимые действия
  if (countdownTime < 0) {
    clearInterval(interval);
    document.getElementById("timer").innerHTML = "Время истекло!";
  }
}
// Начинаем обновление таймера каждую секунду
var interval = setInterval(updateTimer, 1000);