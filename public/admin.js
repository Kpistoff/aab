// переключение страниц заказы - отзывы
document.addEventListener("DOMContentLoaded", function () {
  const firstPageBtn = document.getElementById("firstPageBtn");
  const secondPageBtn = document.getElementById("secondPageBtn");
  const firstPage = document.getElementById("firstPage");
  const secondPage = document.getElementById("secondPage");
  const thirdPage = document.getElementById("thirdPage");

  // Скрываем вторую страницу при загрузке
  secondPage.style.display = "none";
 

  firstPageBtn.addEventListener("click", function () {
    // При нажатии на кнопку "Первая страница"
    firstPage.style.display = "block";   // Показываем первую страницу
    secondPage.style.display = "none";   // Скрываем вторую страницу
    
  });

  secondPageBtn.addEventListener("click", function () {
    // При нажатии на кнопку "Вторая страница"
    firstPage.style.display = "none";   // Скрываем первую страницу
    secondPage.style.display = "block";   // Показываем вторую страницу
    
  });

  thirdPageBtn.addEventListener("click", function () {
    window.location.href = "/admin12";
  });
});
