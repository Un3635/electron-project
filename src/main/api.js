
const express = require('express');
const api = express();

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}
var router = express.Router([options])
router.get('/getAddress', (req, res, next) => {
  console.log(12);
})
api.get('/', function(){
  console.log('/');
})