let food = ["Apple", "Spinach", "Cookie", "Pumpkin"];

/**
 * Aufgabe 1
 */
function greet(name) {
  console.log(`Hallo ${name}`);
}

/**
 * Aufgabe 2
 */
function multiply(number1, number2) {
  let result = number1 * number2;
  console.log(`Das Ergebnis ist ${result}`);
}

let getAge = 0;

/**
 * Aufgabe 3
 */
function contactInfo(name, age) {
  console.log(`Mein Name ist ${name}`);
  getAge = age;

  showMyAge();
}

/**
 * Aufgabe 3
 */
function showMyAge() {
  console.log(`Ich bin ${getAge} Jahre alt.`);
}

/**
 * Aufgabe 4
 */
function eatCookie(i) {
  let item = food[i]; // Lädt das Element an der Stelle "i" aus dem Array
  if (item == "Cookie") {
    console.log("Om nom nom");
  } else {
    console.log("I don't like " + item);
  }
}

/**
 * Aufgabe 5
 */
function pythagoras(a, b, container) {
  let aabb = a * a + b * b; // Caclulates a² + b²
  let result = Math.sqrt(aabb); // Calculates the root (dt: Wurzel) of the variable aabb
  document.getElementById(container).innerHTML = result;
}

/**
 * Aufgabe 6
 */
function calculateDistance(km, time, id) {
  // TODO: Diese Funktion muss (inklusive Funktionsparameter) implementiert werden.
  // Orientiere dich an der Funktion aus Aufgabe 5.
  let result = km * time;
  document.getElementById(id).innerHTML = `${result} km`;
}
