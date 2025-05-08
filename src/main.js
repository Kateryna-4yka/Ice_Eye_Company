import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

//  ============відкриття модального вікна ==============

// const burger = document.querySelector(".icon-align-justify");
// const headerModalWindow = document.querySelector(".header-modal-window");
// const iconX = document.querySelector(".header-icon-x");

// burger.addEventListener("click", () => {
//   headerModalWindow.classList.add('header-modal-window-active'); 
//   document.body.classList.add('no-scroll');
// });

// iconX.addEventListener("click", () => {
//   headerModalWindow.classList.remove('header-modal-window-active');
//   document.body.classList.remove('no-scroll'); 
// });

//  ==============================відкриття order-now===========================

const consultationBtns = document.querySelectorAll(".consultation-btn, .consultation");
const orderNowIconX = document.querySelector(".order-now-icon-x");
const orderNow = document.querySelector(".order-now");
const orderNowform = document.querySelector(".order-now-form");

function openModal() {
  orderNow.classList.add('order-now-is-open');
  document.body.classList.add('no-scroll');

  window.addEventListener('click', closeModalOnBackdropClick); 
  window.addEventListener('keydown', closeFormByEsc);
}

// додай обробник до кожної кнопки
consultationBtns.forEach(btn => {
    btn.addEventListener("click", openModal);
  });

// закриття модалки по хрестику
orderNowIconX.addEventListener("click", closeModal);
function closeModal() {
    orderNow.classList.remove('order-now-is-open');
    document.body.classList.remove('no-scroll');
  
    window.removeEventListener('click', closeModalOnBackdropClick); 
    window.removeEventListener('keydown', closeFormByEsc);
  }

//  ============================== КЛІК ПОЗА ФОРМОЮ ===========================
function closeModalOnBackdropClick(event) {
    // ✅ Змінено: event.code більше не перевіряється тут, бо це click
    const isClickOutside = !orderNowform.contains(event.target) && !event.target.closest('.consultation-btn') && !event.target.closest('.consultation');
  
    if (isClickOutside) {
      closeModal(); // ✅ Використовуємо спільну функцію закриття
    }
  }
  
  //  ============================== ESCAPE ===========================
  function closeFormByEsc(event) {
    // ✅ Заміна: code → key — більш стабільно у всіх браузерах
    if (event.key === 'Escape') {
      closeModal(); // ✅ Використовуємо спільну функцію закриття
    }
  }
  
//  ==============================обробка інформації з order-now===========================

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("number");

function validateInput(input, regex, errorMessage) {
  if (!regex.test(input.value.trim())) {
    input.classList.add('invalid'); 
    showError(errorMessage);  
    return false;
  }
  input.classList.remove('invalid');  
  return true;
}

orderNowform.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;

  if (!nameInput.value.trim() || !phoneInput.value.trim()) {
    showError("Будь ласка, заповніть усі обов'язкові поля!");

    if (!nameInput.value.trim()) nameInput.classList.add('invalid');
    if (!phoneInput.value.trim()) phoneInput.classList.add('invalid');
    return; 
  }

  if (!validateInput(nameInput, /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]{2,}$/, "Ім'я має містити лише літери та не менше 2 символів!")) {
    isValid = false;
  }

  if (!validateInput(phoneInput, /^\+380\d{9}$/, "Телефон повинен бути у форматі +380XX XXX XX XX!")) {isValid = false;}

  if (isValid) {
    iziToast.success({
      title: "Successfully!",
      message: "Форма відправлена!",
      position: "topRight",
    });

    orderNow.classList.remove('order-now-is-open'); 
    document.body.classList.remove ('no-scroll');
    nameInput.classList.remove('invalid');  
    phoneInput.classList.remove('invalid');

    orderNowform.reset();  
    localStorage.removeItem(`feedback-form`);
  }
});

function showError(message) {
  iziToast.error({
    title: "error",
    message: message,
    position: "topRight",
  });
}

//  =================отримування інформації для order-now з локального сховища користувача===============

orderNowform.addEventListener ('change', remembInfoLS);

let formInfo = JSON.parse(localStorage.getItem(`feedback-form`)) || {
  name: '',
  number: '',
  textarea: '',
};
function remembInfoLS (event) {
  const valueInfo = event.target.value;
  const valueInfoName = event.target.name; 
  formInfo[valueInfoName]=valueInfo;
  try {
    localStorage.setItem(`feedback-form`, JSON.stringify(formInfo));
  } catch (error) {
    console.error("Error saving data to localStorage", error);
  }
};

function returnInfoLS (){
try {
  if (localStorage.length ===0) {return;}
  const getInfo = JSON.parse(localStorage.getItem(`feedback-form`))
  for (const key in getInfo) {orderNowform.elements[key].value = getInfo[key]} 
} 
catch (er) {console.log(er);}
};

returnInfoLS ();

//   ==============================перемикання теми основна іконка ==================================

// const changeColor = document.querySelector('.icon-change-color');
// const circle = document.querySelector('.icon-change-color-circle');

// if (changeColor && circle) {
//   changeColor.addEventListener('click', () => {
//   circle.classList.toggle('clicked');
//   });
// }
//   ==============================перемикання теми іконка у модальному вікні==================================

// const modalChangeColor = document.querySelector('.header-modal-icon-change-color');
// const modalCircle = document.querySelector('.header-modal-icon-change-color-circle');

// if (modalChangeColor && modalCircle) {
//   modalChangeColor.addEventListener('click', () => {
//   modalCircle.classList.toggle('clicked');
// });}

//   ==============================перемикання теми ==================================

// document.addEventListener("DOMContentLoaded", () => {

//   const buttons = document.querySelectorAll(".icon-change-color, .header-modal-icon-change-color");

//   function applyTheme(theme) {
//       if (theme === "dark") {
//           document.body.classList.add("dark-theme");
//       } else {
//           document.body.classList.remove("dark-theme");
//       }}

//   const savedTheme = localStorage.getItem("theme") || "light";
//   applyTheme(savedTheme);

//   buttons.forEach(button => {
//       button.addEventListener("click", () => {
//           const currentTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
//           applyTheme(currentTheme);
//           localStorage.setItem("theme", currentTheme);
//       });
//   });
// });


//==================================== кнопка для прокрутки вікна===================

const scrollButton = document.querySelector('.icon-arrow');

function checkScrollPosition() {
    if (window.scrollY > 300) { 
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
}

window.addEventListener('scroll', checkScrollPosition);

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

















const form = document.getElementById('testimonialForm');
const thankYouMsg = document.querySelector('.thank-you-message');
const testimonialList = document.getElementById('testimonialList');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = form.elements.name.value.trim();
  const message = form.elements.message.value.trim();

  if (!name || !message) return;

  // Створюємо новий блок з відгуком
  const testimonialItem = document.createElement('div');
  testimonialItem.className = 'testimonial-item';
  testimonialItem.innerHTML = `<strong>${name}:</strong> ${message}`;
  testimonialList.appendChild(testimonialItem);

  // Очищаємо форму
  form.reset();

  // Показуємо подяку на кілька секунд
  thankYouMsg.style.display = 'block';
  setTimeout(() => {
    thankYouMsg.style.display = 'none';
  }, 3000);
});