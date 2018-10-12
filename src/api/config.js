module.exports = (count, cb) => {
  var judge = (count) => {
      
  }
  if(judge > 10) {
    cb(judge(50));
  } else {
    cb('NO');
  }
}