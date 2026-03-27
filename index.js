const text = "Save on hidden conversion fees when you use your Wise Travel card, or send money abroad.";
const speed = 50;      // typing speed
const eraseSpeed = 30; // deleting speed
const delay = 1500;    // wait before deleting

let i = 0;
let isDeleting = false;

function typeEffect() {
  const element = document.getElementById("typeText");

  if (!isDeleting) {
    element.innerHTML = text.substring(0, i++);
  } else {
    element.innerHTML = text.substring(0, i--);
  }

  let currentSpeed = isDeleting ? eraseSpeed : speed;

  if (!isDeleting && i === text.length) {
    currentSpeed = delay;
    isDeleting = true;
  } 
  else if (isDeleting && i === 0) {
    isDeleting = false;
  }

  setTimeout(typeEffect, currentSpeed);
}

typeEffect();