function openDialog(text) {
  document.getElementById("dialog").classList.remove("d-none");
  document.getElementById("dialog-message").innerHTML = text;
}

function closeDialog() {
  document.getElementById("dialog").classList.add("d-none");
}
