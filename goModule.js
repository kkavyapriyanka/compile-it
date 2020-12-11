var exec  = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');
var colors = require('colors');


exports.stats = false ;

exports.compileGo = function (envData , code , fn ){
	//creating source file
    var dirname = cuid.slug();
	path = './temp/'+dirname;

	fs.mkdir(path , 0777 , function(err){	
		if(err && exports.stats)
		console.log(err.toString().red);
		else
		{
			fs.writeFile( path  + "/main.go" , code  , function(err ){			
				if(err && exports.stats)
					console.log('ERROR: '.red + err);
			    else
			    {
			    	if(exports.stats)
			    		console.log('INFO: '.green + path + "/main.go created");				    	
			    	
			    	if(envData.OS === "linux")
						var command = "cd "+path+" && "+ "go build";
						console.log(command)
					exec(command , function( error , stdout , stderr ){
						if(error)
						{
							if(exports.stats)							
								console.log("INFO: ".green + path + "/main.go contained an error while compiling");
								var out = {error : stderr };
								console.log("INFO: ".green + out);
								fn(out);
						}
						else
						{
							console.log("INFO: ".green + "compiled a go file");
							var command = "cd "+path+" && ./"+dirname;
							exec(command , function( error , stdout , stderr ){
								if(error)
								{
												
									if(error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1)
									{
										var out = { error : 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.'};
										fn(out);
									}
									else
									{
										if(exports.stats)
										{
											console.log('INFO: '.green + path  + '/main.go contained an error while executing');
										}										
										var out = { error : stderr};
										fn(out);
									}	
								}
								else
								{						
									if(exports.stats)
									{
										console.log('INFO: '.green + path + '/main.go successfully compiled and executed !');
									}
									var out = { output : stdout};
									// console.log('INFO: '.green + fn(out.output));
									fn(out);										
								}
							});		
						}
					});
			    }		   
			});					
		}
	});
}



exports.compileGoWithInput = function (envData , code , input , fn ){
	//creating source file
    var dirname = cuid.slug();
	path = './temp/'+dirname;

	fs.mkdir(path , 0777 , function(err){	
		if(err && exports.stats)
		console.log(err.toString().red);
		else
		{
			fs.writeFile( path  + "/main.go" , code  , function(err ){			
				if(err && exports.stats)
					console.log('ERROR: '.red + err);
			    else
			    {
			    	if(exports.stats)
			    		console.log('INFO: '.green + path + "/main.go created");				    	
			    	 fs.writeFile( path + "/input.txt" , input , function (err){
			    		if(err && exports.stats)
							console.log('ERROR: '.red + err);
						else
						{
							if(envData.OS === "linux")
							var command = "cd "+path+ " && " + "go build";
							exec(command , function( error , stdout , stderr ){						
								if(error)
								{
									if(exports.stats)							
										console.log("INFO: ".green + path + "/main.go contained an error while compiling");
									var out = {error :  stderr };
									fn(out);
								}
								else
								{
									console.log("INFO: ".green + "compiled a go file");
									var command = "cd "+path+" && ./"+dirname+" < input.txt";
									exec(command , function( error , stdout , stderr ){
										if(error)
										{
											
											if(exports.stats)
											{
												console.log('INFO: '.green + path  + '/main.go contained an error while executing');
											}			
											if(error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1)
											{
												var out = { error : 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.'};
												fn(out);
											}
											else
											{
												var out = { error : stderr};
												fn(out);
											}	
										}
										else
										{						
											if(exports.stats)
											{
												console.log('INFO: '.green + path + '/main.go successfully compiled and executed !');
											}
											var out = { output : stdout};
											fn(out);										
										}
									});		
								}
			    			});
			    		}
					});
			    }		   
			});					
		}
	});
}
