function onloadFunc() {
  console.log("test")
  // loadData("/name");
  // postData("", {"banana": "rama"})
  // deleteData("/-NxwesXJxlWe_JiM0E18")
  putData("-NxwizWbkjD2ElVJPFk_", {"banana": "ramass"})
}

const BASE_URL = "https://developer-akademie-8f103-default-rtdb.europe-west1.firebasedatabase.app/"

async function loadData(path="") {
  let response = await fetch(BASE_URL + path + ".json");
  let responseToJson = await response.json();
  console.log(responseToJson)
}

async function postData(path="", data={}){
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    body: JSON.stringify(data),
    header: {
      "Content-Type": "application/json"
    }
  });
  return responseToJson = await response.json();
}

async function deleteData(path="") {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "DELETE",
    header: {
      "Content-Type": "application/json"
    }
  });
  return responseToJson = await response.json();
}

async function putData(path="", data={}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    body: JSON.stringify(data),
    header: {
      "Content-Type": "application/json"
    }
  });
  return responseToJson = await response.json();
}