function greeting() {
  let name = document.getElementById("name").value;
  document.getElementById("greet").innerHTML = "Hallo " + name;

  changeGreeting("Hello", 2000, name);
  changeGreeting("Bonjour", 4000, name);
  changeGreeting("hassa", 6000, name);
  changeGreeting("fdadf", 8000, name);
}

function changeGreeting(text, time, name) {
  setTimeout(function () {
    document.getElementById("greet").classList.add("animate");
    document.getElementById("greet").innerHTML = text + " " + name;

    setTimeout(function () {
      document.getElementById("greet").classList.remove("animate");
    }, 1000);
  }, time);
}
