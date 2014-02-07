//http://www.hongkiat.com/blog/node-js-server-side-javascript/
//http://stackoverflow.com/questions/6084360/node-js-as-a-simple-web-server

//Install: add --debug=8081 in Node parameters

var sys = require("sys"),
    my_http = require("http"),
    path = require("path"),
    url = require("url"),
    filesys = require("fs");

my_http.createServer(function(request,response){
    //debugger;
    sys.puts(request.url);
    var my_path = url.parse(request.url).pathname;
    var full_path = path.join(process.cwd(),my_path);
    sys.puts(full_path);
    //path.exists(full_path,function(exists){
    filesys.exists(full_path,function(exists){
        if(!exists){
            response.writeHeader(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
        }
        else{
            filesys.readFile(full_path, "binary", function(err, file) {
                if(err) {
                    response.writeHeader(500, {"Content-Type": "text/plain"});
                    response.write(err + "\n");
                    response.end();

                }
                else{
                    response.writeHeader(200);
                    response.write(file, "binary");
                    response.end();
                }

            });
        }
    });
}).listen(8080);
sys.puts("Server Running on 8080");			
