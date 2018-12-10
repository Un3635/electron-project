const superagent = require('superagent');
const cheerio = require('cheerio');

const reptileUrl = "http://www.xzw.com/fortune/aries/";

var map = new Map();
map.set(1, "http://www.xzw.com/fortune/aries/");
map.set(2, "http://www.xzw.com/fortune/taurus/");
map.set(3, "http://www.xzw.com/fortune/gemini/");
map.set(4, "http://www.xzw.com/fortune/cancer/");
map.set(5, "http://www.xzw.com/fortune/leo/");
map.set(6, "http://www.xzw.com/fortune/virgo/");
map.set(7, "http://www.xzw.com/fortune/libra/");
map.set(8, "http://www.xzw.com/fortune/scorpio/");
map.set(9, "http://www.xzw.com/fortune/sagittarius/");
map.set(10, "http://www.xzw.com/fortune/capricorn/");
map.set(11, "http://www.xzw.com/fortune/aquarius/");
map.set(12, "http://www.xzw.com/fortune/pisces/");

function flushInfo(key){
	var url = map.get(parseInt(key));
	console.log(url)
	superagent.get(url).end(function (err, res) {
	     if(err){
	         throw Error(err);
	     }
		var jquery = window.$;
	    let $ = cheerio.load(res.text);

	    for(var i = 1; i < 6; i ++){
	    	var id = 'p' + i;
	    	
	    	jquery("#" + id).html($(".c_cont ." + id).next().html());
	    }
	    
	});
}

