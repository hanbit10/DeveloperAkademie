// 1. Möglichkeit
function init() {
  fetch("bundesland.json").then(
    () => {
      console.log("Fertig");
    },
    () => {
      console.log("Fehler aufgetreten");
    }
  );
}

// 2. Möglichkeit
async function init() {
  try {
    await fetch("bundesland.json");
    console.log("Fertig");
  } catch (e) {
    console.log("Fehler aufgetreten");
  }
}

// 3. Möglichkeit
async function init() {
  await fetch("bundesland.json").catch(errorFunction);
  console.log("Fertig");
}

function errorFunction() {
  console.log("Fehler aufgetreten");
}

// 4. Möglichkeit
async function init() {
  let [resp, err] = await resolve(fetch("bundesland.json"));
  if (resp) {
    console.log("Fertig");
  }

  if (err) {
    console.error("Fehler");
  }
}

async function resolve(p) {
  try {
    let response = await p;
    return [response, null];
  } catch (e) {
    return [null, e];
  }
}
