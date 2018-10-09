// const APIS = require('/src/renderer/services/bitcoin-api.js');

importScripts("https://unpkg.com/axios/dist/axios.min.js");
function start() {
  axios.post('http://localhost:3000/generate', {
    coin: 'BTC',
    start: 0,
    end: 500
  })
  .then(function (response) {
    console.log(response);
    postMessage(JSON.stringify(response));
  })
  .catch(function (error) {
    console.log(error);
  });
 
}

start();