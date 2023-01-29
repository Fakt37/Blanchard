document.addEventListener('DOMContentLoaded', () => {
  //preloader
  window.onload = function () {
    setTimeout(function () {
      document.querySelector('.preloader').classList.add('preloader__remove');
    }, 400);
  };
  //Scroll document
  const anchors = document.querySelectorAll('a[href*="#"]');
  for (let anchor of anchors) {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();

      const blockId = anchor.getAttribute('href').substring(1);
      document.getElementById(blockId).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
  //Scroll dropdown
  document
    .querySelectorAll('.header__dropdown-list')
    .forEach((dropdownList) => {
      new SimpleBar(dropdownList, {
        autoHide: false,
        scrollbarMaxSize: 28,
      });
    });

  const dropdowns = document.querySelectorAll('.header__menu-link'),
    dropdownWrapper = document.querySelectorAll('.header__menu-wrapper'),
    dropdownParent = document.querySelector('.header__menu-list');

  function hideDropdownContent() {
    dropdownWrapper.forEach((item) => {
      item.classList.remove('header__menu-wrapper_active');

      dropdowns.forEach((item) => {
        item.classList.remove('header__menu-link_active');
      });
    });
  }

  function showDropdownContent(i) {
    dropdownWrapper[i].classList.add('header__menu-wrapper_active');
    dropdowns[i].classList.add('header__menu-link_active');
  }

  dropdownWrapper.forEach;

  dropdownParent.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target;

    if (target && target.classList.contains('header__menu-link')) {
      dropdowns.forEach((item, i) => {
        if (target == item) {
          if (target.classList.contains('header__menu-link_active')) {
            hideDropdownContent();
          } else {
            hideDropdownContent();
            showDropdownContent(i);
          }
        }
      });
    }
  });

  //Swiper hero
  const swiperHero = new Swiper('.hero__slider', {
    pagination: false,
    direction: 'horizontal',
    speed: 10000,
    effect: 'fade',
    autoplay: {
      delay: 2000,
    },
    loop: true,
  });

  //Swiper gallery

  const swiperGallery = new Swiper('.gallery__slider', {
    pagination: {
      el: '.gallery__pagination',
      clickable: true,
      type: 'fraction',
    },
    navigation: {
      nextEl: '.arrow-next',
      prevEl: '.arrow-prev',
    },
    a11y: {
      nextSlideMessage: 'Следующая страница',
      prevSlideMessage: 'Предыдущая страница',
      slideLabelMessage: 'Слайд {{index}} из {{slidesLength}}',
      slideRole: 'none',
    },
    breakpoints: {
      1025: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
        allowTouchMove: false,
      },
      993: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
        allowTouchMove: true,
      },
      577: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 38,
        allowTouchMove: true,
      },
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 30,
        allowTouchMove: true,
      },
    },
  });

  const swiperDevelopments = new Swiper('.developments__slider', {
    navigation: {
      nextEl: '.developments__swiper-btn-next',
      prevEl: '.developments__swiper-btn-prev',
    },
    pagination: {
      el: '.developments__swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    a11y: {
      nextSlideMessage: 'Следующая страница',
      prevSlideMessage: 'Предыдущая страница',
      slideLabelMessage: 'Слайд {{index}} из {{slidesLength}}',
      slideRole: 'none',
    },
    breakpoints: {
      1025: {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 50,
        allowTouchMove: false,
      },
      769: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 27,
        allowTouchMove: true,
      },
      577: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
        allowTouchMove: true,
      },
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 30,
        allowTouchMove: true,
      },
    },
  });
  const swiperPartners = new Swiper('.partners__slider', {
    navigation: {
      nextEl: '.partners__swiper-btn-next',
      prevEl: '.partners__swiper-btn-prev',
    },
    breakpoints: {
      1025: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
        allowTouchMove: false,
      },
      769: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 50,
        allowTouchMove: true,
      },
      577: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30,
        allowTouchMove: true,
      },
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        allowTouchMove: true,
      },
    },
  });

  //Mod select
  const element = document.querySelector('.gallery__select');
  const choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
    renderChoiceLimit: 0,
  });

  //Modal
  const modal = document.querySelector('.modal');
  const modalClose = document.querySelector('[data-close]');
  const modalTrigger = document.querySelectorAll('[data-modal]');
  const modalImg = document.querySelector('.modal__img');

  modalTrigger.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const style = window.getComputedStyle(e.target, false);
      const backgroundImage = style.backgroundImage
        .slice(4, -1)
        .replace(/"/g, '');
      modalImg.src = backgroundImage;
      modal.classList.add('modal-active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('modal-active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('modal-active')) {
      closeModal();
    }
  });

  //Accordion
  new Accordion('.dates__list', {
    triggerClass: 'dates__btn',
    panelClass: 'dates__wrap',
  }).open(0);

  document.querySelector('.dates__btn').addEventListener('click', (e) => {
    e.blur();
  });
  //Tabs
  document.querySelectorAll('.artist-list__link').forEach((tabsBtn) => {
    tabsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const path = e.currentTarget.dataset.path;
      document.querySelectorAll('.artist-list__link').forEach((btn) => {
        btn.classList.remove('artist-list__link--active');
        btn.blur();
      });
      e.currentTarget.classList.add('artist-list__link--active');
      document.querySelectorAll('.catalog__card ').forEach((tabsBtn) => {
        tabsBtn.classList.remove('catalog__card--active');
      });
      document
        .querySelector(`[data-target="${path}"]`)
        .classList.add('catalog__card--active');
    });
  });

  //Tooltip

  tippy(document.querySelectorAll('.projects__tooltip'), {
    theme: 'purple',
    trigger: 'click',
    onShow(instance) {
      instance.reference.classList.add('projects__tooltip--active');
    },
    onHide(instance) {
      instance.reference.classList.remove('projects__tooltip--active');
    },
    content: (reference) => reference.getAttribute('data-tooltip-content'),
  });

  //map
  ymaps.ready(init);
  function init() {
    // Создание карты.
    const myMap = new ymaps.Map('map', {
      center: [55.75846806898367, 37.60108849999989],
      zoom: 14,
    });
    const myPlacemark = new ymaps.Placemark(
      [55.758468, 37.601088],
      {
        hintContent: 'Шоурум №4',
        balloonContent: 'Леонтьевский переулок, дом 5/1',
      },
      {
        iconLayout: 'default#image',
        iconImageHref: 'img/mapMarker.svg',
        iconImageSize: [20, 20],
        iconImageOffset: [0, 0],
      },
    );
    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.disable('drag');
    myMap.geoObjects.add(myPlacemark);
  }

  //burger
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.header__nav');
  const body = document.querySelector('.page');

  burger.addEventListener('click', () => {
    burger.classList.toggle('burger--active');
    menu.classList.toggle('header__nav--active');
    body.classList.toggle('page__overflow');
  });

  //search
  const btnSearch = document.querySelector('.open');
  const formSearch = document.querySelector('.header__form--mobile');
  const closeForm = document.querySelector('.header__close');

  btnSearch.addEventListener('click', () => {
    btnSearch.classList.toggle('header__open--active');
    formSearch.classList.toggle('header__form--mobile-active');
  });

  closeForm.addEventListener('click', (e) => {
    e.preventDefault();
    formSearch.classList.toggle('header__form--mobile-active');
    btnSearch.classList.toggle('header__open--active');
  });

  //mask & validate
  const selector = document.querySelector('input[type="tel"]');
  const im = new Inputmask('+7 (999)-999-99-99');

  im.mask(selector);

  const validation = new JustValidate('.form', {
    lockForm: true,
    errorFieldCssClass: 'is-invalid',
  });
  validation
    .addField('.form__input-name', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Не достаточное количество символов',
      },
      { rule: 'required', errorMessage: 'Вы не ввели имя' },
      {
        rule: 'maxLength',
        value: 15,
        errorMessage: 'Вы ввели больше чем положено',
      },
      {
        validator: (value) => {
          return !/[^A-Za-zА-Яа-я \s]/.test(value);
        },
        errorMessage: 'Недопустимый формат',
      },
    ])
    .addField('.form__input-phone', [
      {
        rule: 'required',
        errorMessage: 'Вы не ввели телефон',
      },
      {
        rule: 'function',
        validator: function (name, value) {
          const phone = selector.inputmask.unmaskedvalue();
          return phone.length === 10;
        },
        errorMessage: 'Недопустимый формат',
      },
    ]);
});
