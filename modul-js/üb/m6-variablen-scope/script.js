let x = 2;

function test() {
  if (true) {
    console.log(x);
  }

  console.log(x);

  test2();
}

function test2() {
  console.log(x);
}

function greet() {
  let name = "Junus";
  let age = 31;
  console.log("Hello " + name);

  sayGoodbye(name);
  sayGoodbye(age);
  sayGoodbye("Hans");
}

function sayGoodbye(name) {
  console.log("Bye, bye " + name);
}

greet();
