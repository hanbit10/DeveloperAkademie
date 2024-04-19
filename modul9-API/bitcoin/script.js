const API_KEY = "C7BD3VXG793OJKF0";

async function init() {
  loadRecentCourse();
  loadMontlyCourse();
}

async function loadRecentCourse() {
  let url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=${API_KEY}`;
  let response = await fetch(url);
  let responseAsJSON = await response.json();
  let realTime = +responseAsJSON["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
  let realTimeFixed = realTime.toFixed(2);
  console.log(realTimeFixed);
  let container = document.getElementById("container");
  container.innerHTML = /*html*/ `
  <div>Exchange Rate: ${realTimeFixed} €</div>
  `;
}

async function loadMontlyCourse() {
  let url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=EUR&apikey=${API_KEY}`;
  let response = await fetch(url);
  let responseAsJSON = await response.json();
  console.log(responseAsJSON);
}
