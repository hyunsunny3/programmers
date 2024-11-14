// require : 모듈 가져오기
let http = require('http');
let url = require('url');

function start(route, handle){
  function onRequest(request, response){
    let pathname = url.parse(request.url).pathname;
    route(pathname, handle, response);
  }
  
  http.createServer(onRequest).listen(8888);
  // http://localhost:8888/
}

exports.start = start;