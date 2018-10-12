
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

// 生成助记词

router.post('/getMnemonic', (req, res, next) => {
  let words =  bitcoinOp.mnemonic();
  let seed = bitcoinOp.seed(words,  req.body.coin || 'BTC');
  let __result =  {
    mnemonic: words,
    seed: seed
  }
  res.json({
    code: '0',
    result: __result
  })
}) 

router.post('/generate', (req, res, next) => {
  const __coin =  req.body.coin;
  const __start = req.body.start;
  const __end = req.body.end; // 生成地址的数量
  
  let coin__ = {};
  coin__[__coin] = [];

  for(var i = __start; i < __end; i++) {
    (function(i){
      return function() {
        coin__[__coin].push(bitcoinOp[__coin](i));
      }()
    })(i)
  }
  // __result = Object.assign(__result, coin__);
  // __result[__coin].push(bitcoinBTC[__coin](root, __count));
  res.json({
    code: '0',
    result: coin__
  });
  next();
})
router.get('/test', (req, res, next) => {
   res.json({
    code: '0',
    result: 'success'
  });
})

// 表单下载
router.post('/doLoad', (req, res, next) => {
  console.log(1);
  next();
})

api.use('/', router);
api.listen(3000, function() {
  console.log(3000, 'port success');
})