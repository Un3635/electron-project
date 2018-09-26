
const express = require('express');
const bodyParser = require("body-parser");  
const api = express();
const bitcoinOp = require('./bitcoin');

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: false}));
const router = express.Router({
  mergeParams:true, // 父级路由合并到子级路由
  caseSensitive:true, // 区分子路由中的大小写
  strict:true // 区分 /mnemonic, /mnemonic/
});

// 跨域
api.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type,Access-Token,Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  next();
});

router.get('/getAddress', (req, res, next) => {
  console.log(req);
  res.send('123');
})
router.post('/mnemonic', (req, res, next) => { 
  const __coin =  req.body.coin;

  let __result =  {
    mnemonic: bitcoinOp.mnemonic(),
    seed:  bitcoinOp.seed(),
    seedHex: bitcoinOp.seedHex()
  }
  let coin__ = {};
  coin__[__coin] = bitcoinOp[__coin]();

  __result = Object.assign(__result, coin__);

  res.json({
    code: '0',
    result: __result
  });
  next();
})

// 表单下载
router.post('/doLoad', (req, res, next) => {
  console.log(req.body)
  next();
})

api.use('/', router);
api.listen(3000, function() {
  console.log(3000, 'port success');
})