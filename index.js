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

// menu code for media queries
const menuToggle = document.getElementById("menuToggle");
const menu = document.querySelector(".ul2");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
});
// ===================================================================================================================================================
// CURRENCY CHANGE
const amount = document.getElementById("amount");
const from = document.getElementById("from");
const to = document.getElementById("to");
const result = document.getElementById("result");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");

const currencies = ["USD","INR","EUR","GBP","JPY","AUD","CAD"];

// ✅ Fill dropdown (clear first to avoid duplicates)
function loadCurrencies() {
  from.innerHTML = "";
  to.innerHTML = "";

  currencies.forEach(cur => {
    let o1 = document.createElement("option");
    let o2 = document.createElement("option");

    o1.value = o2.value = cur;
    o1.textContent = o2.textContent = cur;

    from.appendChild(o1);
    to.appendChild(o2);
  });

  from.value = "USD";
  to.value = "INR";
}

// ✅ Convert function
async function convert() {
  let amt = parseFloat(amount.value);

  if (!amt || amt <= 0) {
    result.innerText = "Enter amount";
    rate.innerText = "";
    return;
  }

  result.innerText = "Converting...";
  rate.innerText = "";

  try {
    let res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amt}&from=${from.value}&to=${to.value}`
    );

    if (!res.ok) throw new Error("Network error");

    let data = await res.json();

    let converted = data?.rates?.[to.value];

    if (converted === undefined) {
      result.innerText = "Conversion error";
      return;
    }

    result.innerText = `${converted.toFixed(2)} ${to.value}`;

    // ✅ Fetch rate (clean way)
    let rateRes = await fetch(
      `https://api.frankfurter.app/latest?from=${from.value}&to=${to.value}`
    );

    let rateData = await rateRes.json();
    let liveRate = rateData?.rates?.[to.value];

    if (liveRate) {
      rate.innerText = `1 ${from.value} = ${liveRate} ${to.value}`;
    }

  } catch (e) {
    result.innerText = "API Error";
    rate.innerText = "";
  }
}

// ✅ Swap
swap.addEventListener("click", () => {
  let temp = from.value;
  from.value = to.value;
  to.value = temp;

  convert();
});

// ✅ Events
amount.addEventListener("input", convert);
from.addEventListener("change", convert);
to.addEventListener("change", convert);

// ✅ Init
loadCurrencies();
convert();



// =================================================================
// toggle menu
document.querySelector(".menu-toggle").onclick = () => {
  document.querySelector(".navbar ul").classList.toggle("show");
};

// scroll effect
window.addEventListener("scroll", () => {
  document.querySelector("nav")
    .classList.toggle("scrolled", window.scrollY > 50);
});