var exec  = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');
var colors = require('colors');

exports.stats = false ;

exports.compilePython = function (envData , code , fn){

	var filename = cuid.slug();
	path = './temp/';
	var outputfilename=path+filename+"output.txt"
	const fd = fs.openSync(outputfilename, 'w')

	fs.writeFile( path  +  filename +'.py' , code  , function(err ){			
		if(exports.stats)
		{
			if(err)
			console.log('ERROR: '.red + err);
		    else
		    console.log('INFO: '.green + filename +'.py created');	
		}
		if(!err)
		{
			var command = 'python3 ' + path + filename +'.py '+ outputfilename;
			exec( command , function ( error , stdout , stderr ){
				if(error)
				{
					if(error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1)
					{
						var out = { error : 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.' };
						fs.unlink(outputfilename,(err)=>{
							if (err) throw err;
							// console.log('path/file.txt was deleted');
						})
						//fs.unlink(path+filename+'input.txt')
						fs.unlink(path+filename+".py",(err)=>{
							if (err) throw err;
							// console.log('path/file.txt was deleted');
						})
						fn(out);								
					}
					else
					{
						if(exports.stats)
						{
							console.log('INFO: '.green + filename + '.py contained an error while executing');
						}
							var out = { error : stderr };
							fs.unlink(outputfilename,(err)=>{
								if (err) throw err;
								// console.log('path/file.txt was deleted');
							})
							//fs.unlink(path+filename+'input.txt')
							fs.unlink(path+filename+".py",(err)=>{
								if (err) throw err;
								// console.log('path/file.txt was deleted');
							})
							fn(out);								
					}													
				}
				else
				{
					if(exports.stats)
					{
						console.log('INFO: '.green + filename + '.py successfully executed !');
					}
					fs.readFile(outputfilename, "utf8",function(err, data) {
						if(err){
						  console.log('ERROR: '.red + err);
						}
						else{
							var out = { output : data};
							console.log('INFO: '.green + data);
							// console.log('INFO: '.green + out);
							
							if(data){
								fs.unlink(outputfilename,(err)=>{
									if (err) throw err;
									// console.log('path/file.txt was deleted');
								})
								//fs.unlink(path+filename+'input.txt')
								fs.unlink(path+filename+".py",(err)=>{
									if (err) throw err;
									// console.log('path/file.txt was deleted');
								})
							  }
							  fn(out);
						}

					  });
					 
				}
		    });
		}
	});
}

exports.compilePythonWithInput = function( envData , code , input ,  fn){
	var filename = cuid.slug();
	path = './temp/';
	var outputfilename=path+filename+"output.txt"
	const fd = fs.openSync(path+filename+"output.txt", 'w')
	fs.writeFile( path  +  filename +'.py' , code  , function(err ){			
		if(exports.stats)
		{
			if(err)
			console.log('ERROR: '.red + err);
		    else
		    console.log('INFO: '.green + filename +'.py created');	
		}
		if(!err)
		{

			fs.writeFile(path + filename + 'input.txt' , input , function(err){
				if(exports.stats)
				{
					if(err)
					console.log('ERROR: '.red + err);
				    else
				    console.log('INFO: '.green + filename +'input.txt created');	
				}
				if(!err)
				{
					var command = 'python3 ' + path + filename +'.py '+ outputfilename+ ' < ' + path + filename +'input.txt ' ;
					exec( command , function ( error , stdout , stderr ){
						if(error)
						{
							if(error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1)
							{
								var out = { error : 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.' };
								fs.unlink(outputfilename,(err)=>{
							if (err) throw err;
							// console.log('path/file.txt was deleted');
						})
								fs.unlink(path+filename+'input.txt',(err)=>{
							if (err) throw err;
							// console.log('path/file.txt was deleted');
						})
								fs.unlink(path+filename+".py"),(err)=>{
							if (err) throw err;
							// console.log('path/file.txt was deleted');
						}	
								fn(out);		
										
							}
							else
							{
								if(exports.stats)
								{
									console.log('INFO: '.green + filename + '.py contained an error while executing');
								}
								var out = { error : stderr };
								fs.unlink(outputfilename,(err)=>{
							if (err) throw err;
							// console.log('path/file.txt was deleted');
						})
										fs.unlink(path+filename+'input.txt',(err)=>{
							if (err) throw err;
							// console.log('path/file.txt was deleted');
						})
										fs.unlink(path+filename+".py",(err)=>{
							if (err) throw err;
							// console.log('path/file.txt was deleted');
						})
								fn(out);								
							}													
						}
						else
						{
							if(exports.stats)
							{
								console.log('INFO: '.green + filename + '.py successfully executed !');
							}
							fs.readFile(outputfilename, "utf8",function(err, data) {
								if(err){
                                  console.log('ERROR: '.red + err);
								}
								else{
									var out = { output : data};
									console.log('INFO: '.green + data);
									// console.log('INFO: '.green + out);
									
									if(data){
										fs.unlink(outputfilename,(err)=>{
							if (err) throw err;
							// console.log('path/file.txt was deleted');
						})
										fs.unlink(path+filename+'input.txt',(err)=>{
							if (err) throw err;
							// console.log('path/file.txt was deleted');
						})
										fs.unlink(path+filename+".py",(err)=>{
							if (err) throw err;
							// console.log('path/file.txt was deleted');
						})
									  }
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
