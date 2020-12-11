# CompileIt

Supported Languages 
===================
compileIt is currently in initial development stage . As the library grows , so does the list here .

| Language | Support |
|---------|:-------:|
|C |&#x2714;|
|C++ | &#x2714; |
|Java | &#x2714; |
|Python | &#x2714; |
|R | &#x2714; |
|C# | &#x2714; |
|Go | &#x2714; |
|Java Script | &#x2714; |
|.Net | &#x2714; |
|Perl | &#x2714; |
|Php | &#x2714; |
|Ruby | &#x2714; |

Work Flow
=========
1) Get the program as input from the client as a request<br/>
2) Use CompileIt modules to compile the program <br/>
3) Get the output and errors in json and string formats <br/>
4) Respond the output to the client<br/>

Setting Up Compilers 
====================
Inorder to compile any programming language , you need to first have the compiler for that programming language in the server machine.

Documentation For Few Languages
================================
<h5>1)Require compileIt </h5>

```javascript
var compiler = require('compileIt');
var options = {stats : true}; //prints stats on console 
compiler.init(options);
```
init() creates a folder named temp in your project directory which is used for storage purpose.
Before using other methods , make sure to call init() method.

<h5>2)C and C++ </h5>

```javascript
    //if windows  
    var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
    //else
    var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
    compiler.compileCPP(envData , code , function (data) {
        res.send(data);
        //data.error = error message 
        //data.output = output value
    });
    
    //res is the response object
```

<h5>3)C and C++ with inputs </h5>

```javascript
    //if windows  
    var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
    //else
    var envData = { OS : "linux" , cmd : "gcc" }; // ( uses gcc command to compile )
    compiler.compileCPPWithInput(envData , code , input , function (data) {
        res.send(data);
    });
```

<h5>4)Java</h5>

```javascript
    //if windows  
    var envData = { OS : "windows"}; 
    //else
    var envData = { OS : "linux" }; // (Support for Linux in Next version)
    compiler.compileJava( envData , code , function(data){
        res.send(data);
    });    
```

<h5>5)Java with inputs</h5>

```javascript
    //if windows  
    var envData = { OS : "windows"}; 
    //else
    var envData = { OS : "linux" }; // (Support for Linux in Next version)
    compiler.compileJavaWithInput( envData , code , input ,  function(data){
        res.send(data);
    });
```
<h5>6)Python</h5>

```javascript
    //if windows  
    var envData = { OS : "windows"}; 
    //else
    var envData = { OS : "linux" }; 
    compiler.compilePython( envData , code , function(data){
        res.send(data);
    });    
```

<h5>7)Python with inputs</h5>

```javascript
    //if windows  
    var envData = { OS : "windows"}; 
    //else
    var envData = { OS : "linux" }; 
    compiler.compilePythonWithInput( envData , code , input ,  function(data){
        res.send(data);        
    });
```

<h5>12)Memory Management </h5>

All the temporary files ( source code and executables ) are created in your temp directory.
flush and flushSync helps you to free the memory by deleting the temporary files.
```javascript
    compiler.flush(function(){
    console.log('All temporary files flushed !'); 
    });
```
Synchronous version of flush
```javascript
    compiler.flushSync();
```

<h5>13)Statistical Data</h5>

Getting statistics about your compileIt server has been taken care.
fullStat returns json data about your server.
```javascript
    compiler.fullStat(function(data){
        res.send(data);
    });
```
<h5>1)options : (windows only c/c++ only)</h5>
timeout: number of milliseconds to wait before killing the compiled program
```javascript
    //compile and execute the file and kill it after 1 second if it still running
    var envData = { OS : "linux" , cmd : "gcc" ,options: {timeout:1000 } };
    compiler.compileCPP(envData , code , function (data) {
        res.send(data);
        //data.error = error message 
        //data.output = output value
    });
```

