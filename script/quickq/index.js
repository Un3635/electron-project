$(function(){

  var iframe = document.createElement('iframe'); 
  iframe.height = '669';
  iframe.width = '1000';
  iframe.style.border = 0;
  iframe.frameboder = 'no';
  // iframe.scrolling = 'no';
iframe.src="http://p.qiao.baidu.com/cps2/chatIndex?reqParam=%7B%22from%22%3A0%2C%22sid%22%3A%22-100%22%2C%22tid%22%3A%22-1%22%2C%22ttype%22%3A1%2C%22siteId%22%3A%2211685983%22%2C%22userId%22%3A%2224941751%22%2C%22pageId%22%3A0%7D";  

document.getElementById("chat").appendChild(iframe);

})