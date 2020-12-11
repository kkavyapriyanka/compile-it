var exec  = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');
var colors = require('colors');


exports.stats = false ;

exports.compileNet = function (envData , code , fn ){
	//creating source file
    var dirname = cuid.slug();
	path = './temp/'+dirname;

	fs.mkdir(path , 0777 , function(err){	
		if(err && exports.stats)
		console.log(err.toString().red);
		else
        {  
        command="cd "+path+" && dotnet new console"
        exec(command , function( error , stdout , stderr ){
            if(error){
                if(exports.stats)							
                console.log("INFO: ".green + path + "error created succesfully");
                var out = {error : stderr };
                console.log("INFO: ".green + out);
                fn(out);
        }
            else{
                console.log("INFO: ".green + path + " project created succesfully");
                fs.writeFile( path  + "/Program.cs" , code  , function(err ){			
                    if(err && exports.stats)
                        console.log('ERROR: '.red + err);
                    else
                    {
                        if(exports.stats)
                            console.log('INFO: '.green + path + "/Program.cs created");				    	
                        
                        // if(envData.OS === "windows")
                            var command = "cd "+path+ " && " + "dotnet build";
                            console.log(command)
                        exec(command , function( error , stdout , stderr ){
                            if(error)
                            {
                                if(exports.stats)							
                                    console.log("INFO: ".green + path + "/Program.cs1 contained an error while compiling");
                                    var out = {error : stderr };
                                    console.log("INFO: ".green + out.error);
                                    fn(out);
                            }
                            else
                            {
                                console.log("INFO: ".green + "compiled a Net file");
                                var command = "cd "+path+" && dotnet run";
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
                                                console.log('INFO: '.green + path  + '/Program.cs2 contained an error while executing');
                                            }										
                                            var out = { error : stderr};
                                            fn(out);
                                        }	
                                    }
                                    else
                                    {						
                                        if(exports.stats)
                                        {
                                            console.log('INFO: '.green + path + '/Program.cs3 successfully compiled and executed !');
                                        }
                                        var out = { output : stdout};
                                        console.log('INFO: '.green + out.output);
                                        fn(out.output);										
                                    }
                                });		
                            }
                        });
                    }		   
                })
            }
        });
            
        }
							
		}
	);
}



exports.compileNetWithInput = function (envData , code , input , fn ){
	//creating source file
    var dirname = cuid.slug();
	path = './temp/'+dirname;

	fs.mkdir(path , 0777 , function(err){	
		if(err && exports.stats)
		console.log(err.toString().red);
		else
		{
            command="cd "+path+" && dotnet new console"
            exec(command , function( error , stdout , stderr ){
                if(error){
                    if(exports.stats)							
                    console.log("INFO: ".green + path + "Error created succesfully");
                    var out = {error : stderr };
                    console.log("INFO: ".green + out);
                    fn(out);
            }
                else{
                    console.log("INFO: ".green + path + " project created succesfully");
                    fs.writeFile( path  + "/Program.cs" , code  , function(err ){			
                        if(err && exports.stats)
                            console.log('ERROR: '.red + err);
                        else
                        {
                            if(exports.stats)
                                console.log('INFO: '.green + path + "/Program.cs created");				    	
                                fs.writeFile( path + "/input.txt" , input , function (err){
                                if(err && exports.stats)
                                    console.log('ERROR: '.red + err);
                                else
                                {
                                    // if(envData.OS === "linux")
                                    var command = "cd "+path+ " && " + "dotnet build";
                                    exec(command , function( error , stdout , stderr ){						
                                        if(error)
                                        {
                                            if(exports.stats)							
                                                console.log("INFO: ".green + path + "/Program.cs contained an error while compiling");
                                            var out = {error :  stderr };
                                            fn(out);
                                        }
                                        else
                                        {
                                            console.log("INFO: ".green + "compiled a Net file");
                                            var command = "cd "+path+" && dotnet run < input.txt";
                                            exec(command , function( error , stdout , stderr ){
                                                if(error)
                                                {
                                                    
                                                    if(exports.stats)
                                                    {
                                                        console.log('INFO: '.green + path  + '/Program.cs contained an error while executing');
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
                                                        console.log('INFO: '.green + path + '/Program.cs successfully compiled and executed !');
                                                    }
                                                    var out = { output : stdout};
                                                    fn(out.output);										
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
	});
}
