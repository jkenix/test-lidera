// Ждем, пока весь контент документа будет загружен
document.addEventListener("DOMContentLoaded", () => {
  // Объявляем часто встречаемые переменные ---
  const wrapper = document.querySelector(".wrapper");
  const ham = document.querySelector(".header__burger");
  const body = document.querySelector("body");
  const header = document.querySelector(".header");
  const headerMenu = document.querySelector(".header__menu");
  const popupJoin = document.querySelector(".popup-join");

  // Функция проверки условий прокрутки и появления меню header ---
  function checkConditions() {
    // Проверка значения scroll
    if (window.scrollY > 300 && window.innerWidth < 992) {
      header.classList.add("header--scroll");
    } else {
      header.classList.remove("header--scroll");
    }
  }
  // Обработчик события scroll
  window.addEventListener("scroll", checkConditions);
  // Обработчик события resize
  window.addEventListener("resize", checkConditions);
  // Проверяем условия при загрузке страницы
  checkConditions();

  // Header Menu ---
  // Func for add and delete
  //  classes
  function toggleClassesMenu() {
    const headerInner = document.querySelector(".header__inner");

    ham.classList.toggle("active");
    header.classList.toggle("active");
    headerInner.classList.toggle("active");
    headerMenu.classList.toggle("active");
  }

  // Function to handle hamburger click
  ham.addEventListener("click", function (event) {
    body.classList.toggle("overflow-hidden");

    toggleClassesMenu();
  });

  // Function to handle header menu item click
  headerMenu.addEventListener("click", function (event) {
    if (
      headerMenu.classList.contains("active") &&
      event.target.tagName === "A"
    ) {
      toggleClassesMenu();
    }
  });

  // Popup и Video ---
  // Объявляем кнопку запуска видео
  const playButton = document.querySelector(".offer__play-button");

  // Находим все кнопки вызова popup
  const buttons = document.querySelectorAll(
    ".btn__sign-up, .btn__get-started, .btn__sign-up-free"
  );

  // Функция для обработки клика и вызова Popup
  function showPopup() {
    // Убираем класс active у всех уже открытых popup
    popupJoin.classList.remove("active");

    // Добавляем класс active к popup
    popupJoin.classList.add("active");
    wrapper.classList.add("blur");

    // Добавляем класс скрытия прокрутки
    body.classList.add("overflow-hidden");
  }

  // Назначаем обработчик клика каждой кнопке
  buttons.forEach((button) => {
    button.addEventListener("click", showPopup);
  });

  // Функция для удаления класса active из попапа, снятие блюра, остановка видео, закрытие меню
  function removeActiveClass() {
    popupJoin.classList.remove("active");
    wrapper.classList.remove("blur");
    // Video классы
    video.removeAttribute("controls", "controls"); // добавляем атрибут controls
    video.pause(); // запускаем воспроизведение видео
    playButton.classList.remove("active");

    // Удаляем класс overflow-hidden из body, ТОЛЬКО если нет активного класса Header menu (.header active)
    if (!header.classList.contains("active")) {
      body.classList.remove("overflow-hidden");
    }
  }

  // Обработчик клика для закрытия Попапа
  const closeBtn = popupJoin.querySelector(".popup__close"); // Кнопка закрытия
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      removeActiveClass(); // Убираем активный класс, когда попап закрывается
    });
  }

  // Video ---
  const video = document.querySelector(".offer__video"); // Объявляем видео
  let popupShown = false; // Флаг для отслеживания, показан ли уже попап после просмотра половины видео

  // Обработчик события timeupdate
  video.addEventListener("timeupdate", () => {
    // Показываем попап только если прошло больше половины видео и попап еще не был показан
    if (video.currentTime >= video.duration / 2 && !popupShown) {
      showPopup(); // Показываем popup
      popupShown = true; // Устанавливаем флаг, что попап уже показан
    }
  });

  playButton.addEventListener("click", () => {
    video.classList.add("active"); // Добавляем активный класс к video
    video.setAttribute("controls", "controls"); // добавляем атрибут controls
    video.play(); // запускаем воспроизведение видео
    playButton.classList.add("active"); // Скрываем кнопку запуска
  });

  // Sliders
  var Features = new Swiper(".Features", {
    slidesPerView: "auto",
    spaceBetween: 24,
    watchSlidesProgress: true,
    loop: false,
    watchOverflow: true,
    keyboard: true,
    allowTouchMove: true,
    navigation: true,

    // Навигация
    navigation: {
      nextEl: ".features__button-next",
      prevEl: ".features__button-prev",
    },

    breakpoints: {
      991.98: {
        pagination: {
          enabled: true, // Включаем пагинацию для экранов выше 991.98px
        },
      },
    },

    // Пагинация (точки)
    pagination: {
      enabled: false, // Скрываем пагинацию по умолчанию
      el: ".features__pagination", // Селектор для контейнера пагинации
      clickable: true, // Делаем пагинацию кликабельной
      bulletClass: "swiper-pagination-bullet features__pagination-bullet", // Класс для каждой точки
      bulletActiveClass:
        "features__pagination-bullet--active swiper-pagination-bullet-active", // Класс для активной точки
      renderBullet: function (index, className) {
        const totalSlides = this.slides.length;

        // Ограничиваем количество точек до 4
        if (totalSlides > 8 && index >= 4) {
          return ""; // не рендерим дополнительные точки
        }

        return `<span class="${className}"></span>`;
      },
    },
  });
});
