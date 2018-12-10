layui.use(['carousel', 'form'], function(){
  var carousel = layui.carousel
  ,form = layui.form;
  
  //图片轮播
  carousel.render({
    elem: '#images'
    ,width: '300px'
    ,height: '230px'
    ,autoplay: false
    ,indicator: 'outside'
    ,index: getNowAstro() - 1
  });

  var obj = $(".cur-div > div").eq(getNowAstro() - 1).find('div');
  obj.html(obj.html() + ' <span class="layui-badge layui-bg-orange">NOW</span>');
  

  var k = $(".layui-this").eq(0).attr('data-key');
  flushInfo(k);
  //事件
  carousel.on('change(images-cut)', function(res){
    var key = res.item.eq(0).attr('data-key');
    flushInfo(key);
  });

 
});

function getNowAstro(){
  var myDate  = new Date();

  var m = myDate.getMonth()+1;
  var d = myDate.getDate();
  return getAstro(m,d);
}

 function getAstro(m,d){    
    return m-(d<"102223444433".charAt(m-1)- -19);   //输出0～12的数字，0表示摩羯，1表示水瓶，依此类推，...，11是射手，12是摩羯。
}