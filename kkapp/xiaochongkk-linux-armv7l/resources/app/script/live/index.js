$(function(){

  var iframe = document.createElement('iframe'); 
  iframe.height = '669';
  iframe.width = '1000';
  iframe.style.border = 0;
  iframe.frameboder = 'no';
  // iframe.scrolling = 'no';
iframe.src="http://p.qiao.baidu.com/cps/chat?siteId=12057177&userId=25643242";  

document.getElementById("chat").appendChild(iframe);

})