var readlineSync = require('readline-sync');

var addFeatureToChecklist = function(){
	var feature = readlineSync.question('Feature or Input : ');
	var output = readlineSync.question('Description or Output : ');
	console.log(feature, output);
};

var main = function(){
	var option = process.argv[2];

	switch(option){
		case '--addFeature' :
			addFeatureToChecklist();
	};
};

main();