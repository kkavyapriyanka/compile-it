var exec  = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');
var colors = require('colors');

exports.stats = false ;

exports.compileRuby = function (envData , code , fn){

	var filename = cuid.slug();
	path = './temp/';
	var outputfilename=path+filename+"output.txt"
	const fd = fs.openSync(outputfilename, 'w')
	fs.writeFile( path  +  filename +'.rb' , code  , function(err ){			
		if(exports.stats)
		{
			if(err)
			console.log('ERROR: '.rbed + err);
		    else
		    console.log('INFO: '.green + filename +'.rb created');	
		}
		if(!err)
		{
			var command = 'ruby ' + path + filename +'.rb '+outputfilename;
			exec( command , function ( error , stdout , stderr ){
				if(error)
				{
					if(error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1)
					{
						var out = { error : 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.' };
					
						fs.unlinkSync(outputfilename)
										// fs.unlinkSync(path+filename+'input.txt')
										fs.unlinkSync(path+filename+".rb")	
												fn(out);						
					}
					else
					{
						if(exports.stats)
						{
							console.log('INFO: '.green + filename + '.rb contained an error while executing');
						}
							var out = { error : stderr };
							fs.unlinkSync(outputfilename)
										// fs.unlinkSync(path+filename+'input.txt')
										fs.unlinkSync(path+filename+".rb")
							fn(out);								
					}													
				}
				else
				{
					if(exports.stats)
					{
						console.log('INFO: '.green + filename + '.rb successfully executed !');
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
								fs.unlinkSync(outputfilename)
								//fs.unlinkSync(path+filename+'input.txt')
								fs.unlinkSync(path+filename+".rb")
							  }
							  fn(out);
						}

					  });
				}
		    });
		}
	});
}

exports.compileRubyWithInput = function( envData , code , input ,  fn){
	var filename = cuid.slug();
	path = './temp/';
	var outputfilename=path+filename+"output.txt"
	const fd = fs.openSync(outputfilename, 'w')
	fs.writeFile( path  +  filename +'.rb' , code  , function(err ){			
		if(exports.stats)
		{
			if(err)
			console.log('ERROR: '.rbed + err);
		    else
		    console.log('INFO: '.green + filename +'.rb created');	
		}
		if(!err)
		{

			fs.writeFile(path + filename + 'input.txt' , input , function(err){
				if(exports.stats)
				{
					if(err)
					console.log('ERROR: '.rbed + err);
					
				    else
				    console.log('INFO: '.green + filename +'input.txt created');	
				}
				if(!err)
				{
					var command = 'ruby ' + path + filename +'.rb  '+outputfilename+' '+ path + filename +'input.txt ' ;
					exec( command , function ( error , stdout , stderr ){
						if(error)
						{
							if(error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1)
							{
								var out = { error : 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.' };
								fn(out);	
								fs.unlinkSync(outputfilename)
										fs.unlinkSync(path+filename+'input.txt')
										fs.unlinkSync(path+filename+".rb")							
							}
							else
							{
								if(exports.stats)
								{
									console.log('INFO: '.green + filename + '.rb contained an error while executing');
								}
								var out = { error : stderr };
								fs.unlinkSync(outputfilename)
										fs.unlinkSync(path+filename+'input.txt')
										fs.unlinkSync(path+filename+".rb")
								fn(out);								
							}													
						}
						else
						{
							if(exports.stats)
							{
								console.log('INFO: '.green + filename + '.rb successfully executed !');
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
										fs.unlinkSync(outputfilename)
										fs.unlinkSync(path+filename+'input.txt')
										fs.unlinkSync(path+filename+".rb")
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
