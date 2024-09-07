const img = document.querySelector(".image");
const explText = document.querySelector(".expl-text");
const dateText = document.querySelector(".date-text");

function mapData({ date, explanation, hdurl }) {
  dateText.innerText = date;
  explText.innerText = explanation;
  img.src = hdurl;
}

async function fetchAPOD(date) {
  try {
    const key = "Ey8XW3ZheKSoDfHpMjoqP0UbvtAlzV46gRMgBcXU";
    let response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`
    );
    if (!response.ok) {
      throw Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    mapData(data);
  } catch (e) {
    console.error("Fetch error: ", e);
  }
}

let date = new Date();

function formatDate(date) {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

fetchAPOD(formatDate(date));

function datesAreEqual(date1, date2) {
  if (date1.getFullYear() !== date2.getFullYear()) {
    return false;
  } else if (date1.getMonth() !== date2.getMonth()) {
    return false;
  } else if (date1.getDate() !== date2.getDate()) {
    return false;
  } else {
    return true;
  }
}
function incrementDate() {
  if (!datesAreEqual(date, new Date())) {
    date.setDate(date.getDate() + 1);
    fetchAPOD(formatDate(date));
    dateInput.value = formatDate(date);
  }
}

function decrementDate() {
  if (!datesAreEqual(date, new Date("0001-01-01"))) {
    date.setDate(date.getDate() - 1);
    fetchAPOD(formatDate(date));
    dateInput.value = formatDate(date);
  }
}

let decrBtn = document.querySelector(".decr-btn");
let incrBtn = document.querySelector(".incr-btn");
decrBtn.addEventListener("click", decrementDate);
incrBtn.addEventListener("click", incrementDate);

const dateInput = document.querySelector(".date-input");
dateInput.value = formatDate(date);

dateInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    let date = new Date(dateInput.value);
    if (date < new Date("0001-01-01")) {
      dateInput.value = "0001-01-01";
    } else if (date > new Date()) {
      dateInput.value = formatDate(new Date());
    } else {
      fetchAPOD(dateInput.value);
    }
  }
});
