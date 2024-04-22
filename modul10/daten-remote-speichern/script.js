async function setItem(key, value) {
  const url = "https://remote-storage.developerakademie.org";
  const payload = { key, value };

  return fetch(url, { method: "POST", body: JSON.stringify(payload) });
}

function init() {
  setItem("name", "Hanbit");
  setItem("name", "Davina");
}
