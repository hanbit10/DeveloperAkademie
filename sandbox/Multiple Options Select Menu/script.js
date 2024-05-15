const selectBtn = document.querySelector(".select-btn");
const items = document.querySelectorAll(".item");

selectBtn.addEventListener("click", () => {
  selectBtn.classList.toggle("open");
});
