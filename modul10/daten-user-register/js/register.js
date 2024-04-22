let users = [];

/**
 * Init function
 */
async function init() {
  loadUsers();
}

/**
 * load all the Users with getItem function
 */
async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * register a user in the storage
 */
async function register() {
  users.push({
    email: email.value,
    password: password.value,
  });
  await setItem("users", JSON.stringify(users));
  resetForm();
}

/**
 *  resets the Form
 */
function resetForm() {
  email.value = "";
  password.value = "";
  registerBtn.disabled = false;
}
