var allInformation = require('./information.js').allInformation;
var colors = require('colors');
var readline = require('readline');
var colors = require('colors');

//------------------------------------------------------------------------------------------------------------------//

var charm = require('charm')();
charm.pipe(process.stdout);
charm.reset();

//------------------------------------------------------------------------------------------------------------------//

colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue'
});

//------------------------------------------------------------------------------------------------------------------//

var clearWindow = function(){
	console.log("\033[2J\033[0f");
};

var printHeading = function(){
	printVerticalLine(0,1,65);
	printVerticalLine(0,1,130);
	printHorizontalLine(2);

	readline.cursorTo(process.stdout,30,1);
	process.stdin.write('Input'.cyan);

	readline.cursorTo(process.stdout,95,1);
	process.stdin.write('Output'.cyan);

	readline.cursorTo(process.stdout,137,1);
	process.stdin.write('Status'.cyan);
};

var printVerticalLine = function(from, upto, where){
	for(var i = from; i <= upto; i++){
		readline.cursorTo(process.stdout,where,i);
		process.stdin.write('|'.grey)
	};
}

var printHorizontalLine = function(yAxis){
	for(var i = 0; i <= 156; i++){
		readline.cursorTo(process.stdout,i,yAxis);
		process.stdin.write('-'.grey)
	};
};

var getLongestLength = function(array){
	return array.reduce(function(str1, str2){
		return (str1.length > str2.length) ? str1 : str2;
	});
};

var printInfo = function(xAxis, yAxis, info){
	readline.cursorTo(process.stdout,xAxis,yAxis);
	console.log(info);
};

var divideInBlocks = function(info, blockLength){
	var startIndex = 0;
	var endIndex = blockLength;
	var infoInBlocks = [];
	while(startIndex <= info.length){
		infoInBlocks.push( info.substring(startIndex, endIndex) );
		startIndex = endIndex ;
		endIndex = endIndex + blockLength;
	};
	return infoInBlocks;
};

var printSummery = function(){
	console.log("\n\nToatal No of Features   :".magenta, total.toString().green);
	console.log("Completed               :".magenta,completed.toString().green);
	console.log("In Development          :".magenta,(total - completed - pending).toString().green);
	console.log("Pending                 :".magenta,pending.toString().green);
	console.log("Progress                :".magenta,Math.round(((completed/total) * 100)).toString().green+"%".green);
};

//------------------------------------------------------------------------------------------------------------------//

var completed = 0;
var pending = 0;
var total = allInformation.length;

var printEachInfo = function(allInformation, yAxis){
	if(allInformation.length == 0){
		printSummery();
		return;
	};

	var currentInfo = allInformation.shift();

	var allInfo = [];
	allInfo.push(currentInfo['input']);
	allInfo.push(currentInfo['output']);
	allInfo.push(currentInfo['status']);

	(currentInfo['status'] == 'Done') && (completed++);
	(currentInfo['status'] == 'Pending') && (pending++);

	var allXAxis = [1, 67, 132];
	var colors = [ 'yellow', 'cyan', 'white' ];

	allInfo.forEach(function(data,index){
		info = divideInBlocks(data, 62);
		charm.foreground(colors[index]);
		for(var i = yAxis, j = 0; i < yAxis + info.length; i++, j++){
			printInfo(allXAxis[index], i, info[j]);
		};
	});

	var y = yAxis;
	var height =  yAxis + Math.ceil(getLongestLength(allInfo).length/63);

	printVerticalLine(y, height - 1, 65)
	printVerticalLine(y, height - 1, 130)
	printHorizontalLine(height);

	var nextYxis = yAxis + Math.ceil(getLongestLength(allInfo).length/63) + 1;

	printEachInfo(allInformation, nextYxis);
};

//------------------------------------------------------------------------------------------------------------------//

clearWindow();

printHeading();
printEachInfo(allInformation,3);

// console.log("\n");