const selectBtns = document.querySelectorAll(".select-btn");
const assignedItems = document.querySelectorAll(".assigned-item");
const categoryItems = document.querySelectorAll(".category-item");

selectBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btn.classList.toggle("open");
  });
});

assignedItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("checked");

    let checked = document.querySelectorAll(".checked"),
      btnText = document.querySelector(".btn-text");

    if (checked && checked.length > 0) {
      btnText.innerText = `${checked.length} Selected`;
    } else {
      btnText.innerText = "Select Language";
    }
  });
});

categoryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const selectButton = document.querySelector(".category-editCard .select-btn.open");
    if (selectButton) {
      selectButton.classList.remove("open");
    }
  });
});
