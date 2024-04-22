const STORAGE_TOKEN = "6U2YAXN7TTD37K3TCPAOP1S1WVIZ78JPXBOOVELN";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

/**
 *
 * @param {String} key
 * @param {String} value
 * @returns
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) }).then((res) => res.json());
}

/**
 *
 * @param {String} key
 * @returns
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}
