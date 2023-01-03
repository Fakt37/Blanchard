//document.addEventListener('DOMContentLoaded', () => {
//Scroll dropdown
document.querySelectorAll('.header__submenu-list').forEach((dropdownList) => {
  new SimpleBar(dropdownList, {
    autoHide: false,
    scrollbarMaxSize: 28,
  });
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
  slidesPerView: 3,
  spaceBetween: 50,
  slidesPerGroup: 3,
  pagination: {
    el: '.gallery__pagination',
    clickable: true,
    type: 'fraction',
  },
  navigation: {
    nextEl: '.arrow-next',
    prevEl: '.arrow-prev',
  },
});

const swiperDevelopments = new Swiper('.developments__slider', {
  slidesPerView: 3,
  spaceBetween: 50,
  slidesPerGroup: 1,
  navigation: {
    nextEl: '.developments__swiper-btn-next',
    prevEl: '.developments__swiper-btn-prev',
  },
});
const swiperPartners = new Swiper('.partners__slider', {
  slidesPerView: 3,
  spaceBetween: 50,
  slidesPerGroup: 3,
  navigation: {
    nextEl: '.partners__swiper-btn-next',
    prevEl: '.partners__swiper-btn-prev',
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
  myMap.geoObjects.add(myPlacemark);
}
//});
