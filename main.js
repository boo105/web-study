var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');


function templateHTMNL(title,list,body,control)
{
    return `<!doctype html>
                <html>
                <head>
                  <title>WEB1 - ${title}</title>
                  <meta charset="utf-8">
                </head>
                <body>
                  <h1><a href="/">WEB</a></h1>
                  ${list}
                  ${control}
                  ${body}
                </body>
                </html>`;
}

function templateList(filelist)
{
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
        var file = filelist[i].substring(0,filelist[i].length - 4);
        list += `<li><a href="/?id=${file}">${file}</a></li>`;
        i += 1;
    }
    list += '</ul>'
    return list;
}



var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query;
    var pathname = url.parse(_url,true).pathname;

    if(pathname === '/')
    {
        if(queryData.id === undefined)
        {
            fs.readdir('./data',function (err,filelist)
            {
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = templateList(filelist);
                var template = templateHTMNL(title,list,`<h2>${title}</h2>${description}`,`<a href="/create">create</a>`);
                response.writeHead(200);
                response.end(template);
            });
        }
        else
        {
            fs.readdir('./data',function (err,filelist){
                fs.readFile(`data/${queryData.id}.txt`,'utf-8',function (err,description)
                {
                    var title = queryData.id;
                    var list = templateList(filelist);
                    var control = `<a href="/create">create</a> 
                                   <a href="/update?id=${title}">update</a>
                                   <form action="delete_process", method="post">
                                    <input type="hidden" name="id" value="${title}">
                                    <input type="submit" value="delete">
                                   </form>`;
                    var template = templateHTMNL(title,list,`<h2>${title}</h2>${description}`,control);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    }
    else if(pathname === '/create')
    {
        fs.readdir('./data',function (err,filelist)
        {
            var title = 'Web - create';
            var list = templateList(filelist);
            var des = `<form action="/create_process" method="post">
                        <p><input type="text" name="title" placeholder="title"></p>
                        <p>
                            <textarea name="description" placeholder="description"></textarea>
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                       </form>`;
            var template = templateHTMNL(title,list,des,'');
            response.writeHead(200);
            response.end(template);
        });
    }
    else if(pathname === '/create_process')
    {
        var body = '';
        request.on('data',function (data){
            body += data;

            // 데이터가 엄청 크게 들어오면 접속 끊어버림  (보안)
            if(body.length > 1e6)
                request.connection.destroy();
        });
        request.on('end',function (){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}.txt`,description,'utf-8',function (err){
                response.writeHead(302,{Location:`/?id=${title}`});// redirection
                response.end();
            });
        });
    }
    else if(pathname === '/update')
    {
        fs.readdir('./data',function (err,filelist){
            fs.readFile(`data/${queryData.id}.txt`,'utf-8',function (err,description)
            {
                var title = queryData.id;
                var list = templateList(filelist);
                var des = `<form action="/update_process" method="post">
                            <input type="hidden" name="id" value="${title}">
                            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                            <p>
                                <textarea name="description" placeholder="description">${description}</textarea>
                            </p>
                            <p>
                                <input type="submit">
                            </p>
                           </form>`;
                var template = templateHTMNL(title,list,des,'');
                response.writeHead(200);
                response.end(template);
            });
        });
    }
    else if(pathname === '/update_process')
    {
        var body = '';
        request.on('data',function (data){
            body += data;
            // 데이터가 엄청 크게 들어오면 접속 끊어버림  (보안)
            if(body.length > 1e6)
                request.connection.destroy();
        });
        request.on('end',function (){
            var post = qs.parse(body);
            var title = post.title;
            var id = post.id;
            var description = post.description;
            fs.rename(`data/${id}.txt`,`data/${title}.txt`,function (err){
                fs.writeFile(`data/${title}.txt`,description,'utf-8',function (err){
                    response.writeHead(302,{Location:`/?id=${title}`});// redirection
                    response.end();
                });
            });
        });
    }
    else if(pathname === '/delete_process')
    {
        var body = '';
        request.on('data',function (data){
            body += data;
            // 데이터가 엄청 크게 들어오면 접속 끊어버림  (보안)
            if(body.length > 1e6)
                request.connection.destroy();
        });
        request.on('end',function (){
            var post = qs.parse(body);
            var id = post.id;
            fs.unlink(`data/${ id}.txt`,function (err){
                response.writeHead(302,{Location:`/`});// redirection
                response.end();
            });
        });
    }
    else
    {
        response.writeHead(404);
        response.end('Not Found');
    }

});

app.listen(3000);