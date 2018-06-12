const http = require('http');
const fs = require('fs');
const path = require('path');


const mimmeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css'
};


const server = http.createServer((req, res) => {
    const url = req.url;
    if(url === '/'){
        fs.readFile('public/index.html', (err, data) => {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data, 'utf-8');
        });
    }
    else {
        // /style.css
        
        fs.exists('public'+url, (exists) => {
            if(exists){
                const extension = path.extname(url);
                const currentMimeType = mimmeTypes[extension];
                fs.readFile('public'+url, (err, data) => {
                    res.writeHead(200, {
                        'Content-Type': currentMimeType,
                        'customHeader': 'hello'
                    });
                    res.end(data, 'utf-8');
                });
                
            }
            else if ( url === '/api/users'){
                fs.readFile('data/users.json', (err, users) => {
                    res.writeHead(200, {
                        'Content-Type': 'text/json'
                    });
                    res.end(users, 'utf-8');
                });
            }
            else {
                res.writeHead(404);
                res.end();
            }
        });
    }

});

server.listen(6500);