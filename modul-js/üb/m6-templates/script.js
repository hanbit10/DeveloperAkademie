let jokes = [
  `Wie viele Windows-Anwender braucht man um eine Glühbirne zu wechseln? 100! Einer wechselt die Birne, 99 klicken die Fehlermeldungen weg.`,
  `Linux wird nie das meistinstallierte Betriebssystem sein, wenn man bedenkt, wie oft man Windows neu installieren muss!`,
  `Warum hat der Mathematikbuch traurig ausgesehen? Weil es zu viele Probleme hatte!`,
  `Warum können Geister keine Lügen erzählen? Weil man durch sie hindurchsehen kann!`,
];

let named = "Franz"; // Für Aufgabe 4

/**
 * Aufgabe 1
 */
function joke(number) {
  document.getElementById(`joke`).innerHTML = jokes[number - 1];
}

/**
 * Aufgabe 2
 */
function addFruit(fruit) {
  document.getElementById(
    "food"
  ).innerHTML += `Frucht hinzugefügt: <b>${fruit}</b> <br>`;
}

function deleteFruits() {
  document.getElementById("food").innerHTML = "";
}

/**
 * Aufgabe 3
 */
function generatedCircle() {
  named = localStorage.getItem("named");
  document.getElementById("generatedHTML").innerHTML = `
      <div class="circle">
          <b>${named}<b>   
      </div>
      `;
}

/**
 * Aufgabe 4 (Hilfsfunktion um den Namen zu ändern)
 */
function setName(n) {
  let name = n;
  console.log(name);
  localStorage.setItem("named", name);
  generatedCircle();
}

/**
 * Aufgabe 5
 */
function sendMessage() {
  let message = document.getElementById("message"); // HTML Element mit ID message wird an die Variable 'message' zugewiesen.
  let chat = document.getElementById("chat");
  console.log(message);

  if (message.value == "") {
    alert("chat is empty");
  } else {
    chat.innerHTML += `
    <div class="chat"> <i>${named}</i>: ${message.value}</div>
    `;

    message.value = ""; // Inhalt von Textfeld mit id "message" löschen
  }
}
