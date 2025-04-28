// Ждем, пока весь контент документа будет загружен
document.addEventListener("DOMContentLoaded", () => {
  // Объявляем часто встречаемые переменные
  const wrapper = document.querySelector(".wrapper");
  const ham = document.querySelector(".header__burger");
  const body = document.querySelector("body");
  const header = document.querySelector(".header");
  const headerMenu = document.querySelector(".header__menu");

  // Show/Remove scroll
  window.addEventListener(
    "scroll",
    function (Scroll) {
      if (window.scrollY > 100) {
        header.classList.add("header--scroll");
      } else if (window.scrollY < 100) {
        header.classList.remove("header--scroll");
      }
    },
    true
  );

  // Func for add and delete
  //  classes
  function toggleClasses() {
    const headerInner = document.querySelector(".header__inner");

    ham.classList.toggle("active");
    body.classList.toggle("overflow-hidden");
    header.classList.toggle("active");
    headerInner.classList.toggle("active");
    headerMenu.classList.toggle("active");
  }

  // Function to handle hamburger click
  ham.addEventListener("click", function (event) {
    toggleClasses();
  });

  // Function to handle header menu item click
  headerMenu.addEventListener("click", function (event) {
    if (
      headerMenu.classList.contains("active") &&
      event.target.tagName === "A"
    ) {
      toggleClasses();
    }
  });

  // Function to handle header menu item click
  headerMenu.addEventListener("click", function (event) {
    if (
      headerMenu.classList.contains("active") &&
      event.target.tagName === "A"
    ) {
      toggleClasses();
    }
  });

  // Popup ---
  // Объявляем popup
  const popupJoin = document.querySelector(".popup-join");

  // Находим все кнопки вызова popup
  const buttons = document.querySelectorAll(
    ".btn__sign-up, .btn__get-started, .btn__sign-up-free"
  );

  // Функция для обработки клика
  function handleButtonClick() {
    // Убираем класс active у всех уже открытых popup
    popupJoin.classList.remove("active");

    // Добавляем класс active к popup
    popupJoin.classList.add("active");
    wrapper.classList.add("blur");
  }

  // Назначаем обработчик клика каждой кнопке
  buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });

  // Video ---
  const video = document.querySelector(".video__offer");

  let hasClassActive = false; // Флаг для отслеживания состояния класса
  let canShowPopup = true; // Флаг для контроля возможности показа
  let popupShown = false; // Флаг для отслеживания, показан ли уже попап

  // Обработчик события timeupdate
  video.addEventListener("timeupdate", () => {
    // Показываем попап только если прошло больше половины видео и попап еще не был показан
    if (
      video.currentTime >= video.duration / 2 &&
      canShowPopup &&
      !popupShown
    ) {
      showPopup();
      popupShown = true; // Устанавливаем флаг, что попап уже показан
    }
  });

  // Функция для показа попапа
  function showPopup() {
    popupJoin.classList.add("active");
    wrapper.classList.add("blur");
    hasClassActive = true; // Устанавливаем флаг
  }

  // Функция для удаления класса active
  function removeActiveClass() {
    popupJoin.classList.remove("active");
    wrapper.classList.remove("blur");
    hasClassActive = false; // Сбрасываем флаг
    canShowPopup = false; // Запрещаем дальнейшие показы
  }

  // Обработчик клика для закрытия попапа
  const closeBtn = popupJoin.querySelector(".popup__close"); // Кнопка закрытия
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      removeActiveClass(); // Убираем активный класс, когда попап закрывается
    });
  }

  // Sliders

  // var Corporate = new Swiper(".Corporate", {
  //   slidesPerView: 1,
  //   spaceBetween: 0,
  //   watchSlidesProgress: true,
  //   loop: false,
  //   watchOverflow: true,
  //   keyboard: true,
  //   allowTouchMove: true,

  //   // Навигация
  //   navigation: {
  //     nextEl: ".corporate__button-next",
  //     prevEl: ".corporate__button-prev",
  //   },

  //   // Пагинация (точки)
  //   pagination: {
  //     el: ".corporate__pagination", // Селектор для контейнера пагинации
  //     clickable: true, // Делаем пагинацию кликабельной
  //     bulletClass: "swiper-pagination-bullet corporate__pagination-bullet", // Класс для каждой точки
  //     bulletActiveClass:
  //       "corporate__pagination-bullet--active swiper-pagination-bullet-active", // Класс для активной точки
  //   },

  //   on: {
  //     init: function () {
  //       this.update(); // Обновляем слайдер после инициализации
  //       this.navigation.update();
  //     },
  //     slideChangeTransitionEnd: function () {
  //       this.navigation.update();
  //     },
  //   },
  // });
});
