let users = [{ email: "chanbit10@gmail.com", password: "test1234" }];

function addUser() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  users.push({ email: email.value, password: password.value });
  console.log(users);
  window.location.href = "login.html?msg=Du hast registriert";
}
