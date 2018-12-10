/**
 * electron 与 jquery 兼容
 * @param  {[type]} typeof module        [description]
 * @return {[type]}        [description]
 */
if (typeof module === 'object') {window.jQuery = window.$ = module.exports;};

//配置参数
var CONFIG = {
	
  //用户token名
  userToken: 'uToken',

  api_account_register: '/v1/normal/account/register'
}


layui.use('element', function(){
  var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
  
  	//监听导航点击
	element.on('nav(demo)', function(elem){
		layer.msg(elem.text());
	});

 	 //判断是否登录
  	// var hasBeenLogin = getCookie(CONFIG.userToken) != null;
    var hasBeenLogin = true; 
  	var loginTag = '<a href="/page/login/login.html">登录</a>';
  	if(hasBeenLogin){
  		loginTag = '<a href="javascript:;" style="padding:0 10px"><i class="fa fa-align-justify" aria-hidden="true"></i></a>'+
					'<dl class="layui-nav-child">'+
					'  <dd><a href="javascript:;">修改信息</a></dd>'+
					'  <dd><a href="javascript:;">安全管理</a></dd>'+
					'  <dd><a href="javascript:;">退了</a></dd>'+
					'</dl>';
  	}
	$("#login").html(loginTag);	


});
  


function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return null;
}

/**
 * 窗口放大缩小
 * @return {[type]} [description]
 */
var defaultWidth = 900;
var defaultHeight = 600;
var defaultX = (screen.availWidth - defaultWidth)/2;
var defaultY = (screen.availHeight - defaultHeight)/2;

function resizeWindow(){
  if(screen.availWidth == window.outerWidth){
    window.top.resizeTo(defaultWidth,defaultHeight);
    window.moveTo(defaultX, defaultY);
  }else{
    window.top.resizeTo(screen.availWidth,screen.availHeight);
  }
}

$(function(){

  /**
 * 绑定事件
 * @type {[type]}
 */
var ipc = require('electron').ipcRenderer;
  $("#maxbt").click(function(){
    ipc.send('window-max');
  })
  $("#minbt").click(function(){
    ipc.send('window-min');

  })
  $("#closebt").click(function(){
    ipc.send('window-close');

  })
})

