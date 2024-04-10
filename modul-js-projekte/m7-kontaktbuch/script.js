let names = [];
let phoneNumbers = [];

//app zu rendern
function render() {
  let content = document.getElementById("content");

  content.innerHTML = "";
  content.innerHTML += `<h1>My Contacts</h1>`;
  content.innerHTML += /*html*/ `
  <div>
  <input placeholder="name" id="name">
  <input placeholder="number" id="number">
  <button onclick="addContact()">Hinzufügen</button>
  </div>`;

  getContact();

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const phoneNumber = phoneNumbers[i];
    content.innerHTML += /*html*/ `<div class='card'>
    <b> Name: </b> ${name} <br>
    <b> Telefon: </b> ${phoneNumber} <br>
    <button onclick="deleteContact(${i})">Löschen</button>
    </div>`;
  }
}

function addContact() {
  let newName = document.getElementById("name");
  let newNumber = document.getElementById("number");
  names.push(newName.value);
  phoneNumbers.push(newNumber.value);

  saveContact();
  render();
}

function deleteContact(index) {
  names.splice(index, 1);
  phoneNumbers.splice(index, 1);

  saveContact();
  render();
}

function saveContact() {
  localStorage.setItem("names", JSON.stringify(names));
  localStorage.setItem("numbers", JSON.stringify(phoneNumbers));
}

function getContact() {
  let nameAsText = localStorage.getItem("names");
  let phoneNumberAsText = localStorage.getItem("numbers");
  if (nameAsText && phoneNumberAsText) {
    names = JSON.parse(nameAsText);
    phoneNumbers = JSON.parse(phoneNumberAsText);
  }
}
