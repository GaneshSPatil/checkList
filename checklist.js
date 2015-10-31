var readlineSync = require('readline-sync');
var fs = require('fs');

var addFeatureToChecklist = function(){
	var feature = readlineSync.question('Feature or Input : ');
	var output = readlineSync.question('Description or Output : ');
	var allInfo = "allInformation.push({ input  : '"+feature+"', output : '"+output+"', status : 'Pending' });"
	fs.appendFile('./information.js', allInfo);
};

var main = function(){
	var option = process.argv[2];

	switch(option){
		case '--addFeature' :
			addFeatureToChecklist();
	};
};

main();