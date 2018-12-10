var os=require('os');

var arch=os.arch();

var cpus=os.cpus();

var endianness=os.endianness();

var freemem=os.freemem()

var homedir=os.homedir();

var hostname=os.hostname()

var loadavg=os.loadavg();

var platform=os.platform();

var tmpdir=os.tmpdir()

var ostype = os.type();

var computerInfo = "PC:" + hostname + "    " + ostype + " " + arch;

$(function(){
	$("#computerInfo").html(computerInfo);
})
