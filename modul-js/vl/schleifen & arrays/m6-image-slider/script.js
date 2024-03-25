let i = 1;

function slideRight() {
  if (i < 3) {
    document.getElementById(`img-${i + 1}`).classList.add("slider-start");
    i++;
  } else {
    i = 3;
  }
  console.log(i);
}

function slideLeft() {
  if (1 < i) {
    document.getElementById(`img-${i}`).classList.remove("slider-start");
    i--;
  }
  console.log(i);
}
