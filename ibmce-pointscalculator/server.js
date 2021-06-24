const http = require('http');

http.createServer(function (request, response) {
    let data = '';

    request.on('data', chunk => {
        data += chunk;
    });

    request.on('end', () => {
        let customerStatus = JSON.parse(data).customerstatus
        let orderTotal = JSON.parse(data).ordertotal
        let points = 0;

        switch (customerStatus) {
            case "gold":
                points = orderTotal * 10;
                break;
            case "silver":
                points = orderTotal * 5;
                break;
            case "bronze":
                points = orderTotal * 3;
                break;
            default:
                points = orderTotal;
                break;
        }

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({"rewardpoints": points}));
    });
}).listen(8080);

console.log('Server running at http://0.0.0.0:8080/');