const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.setHeader('X-Powered-By', 'NodeJS');

  response.statusCode = 200;

  const method = request.method;

  const { url } = request;

  if (url === "/") {
    // curl http://localhost:5000/
    if (method === "GET") {
      response.statusCode = 200;
      response.end("<h1>Hello, ini adalah landingpage</h1>");
    } else if (method === "POST") {
      response.statusCode = 200;
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(`<h1>Hai, ${name}! Ini adalah landingpage</h1>`);
      });
    } else if (method === "PUT") {
      response.statusCode = 200;
      response.end("<h1>Lah, anda kenapa PUT di /landingpage?!</h1>");
      response.statusCode = 200;
      response.end("<h1>Didelete knp sih di /landingpage woy</h1>");
    } else {
      response.statusCode = 400;
      response.end(
        `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`
      );
    }
  } else if (url === "/about") {
    // curl http://localhost:5000/about
    if (method === "GET") {
      response.end("<h1>Hello, ini adalah halaman about</h1>");
    } else if (method === "POST") {
      response.statusCode = 200;
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(`<h1>Hai, ${name}! Kenapa anda POST di about?</h1>`);
      });
    } else if (method === "PUT") {
      response.statusCode = 200;
      response.end("<h1>Lah, anda kenapa PUT di about?!</h1>");
    } else if (method === "DELETE") {
      response.statusCode = 200;
      response.end("<h1>Didelete knp di /about woy</h1>");
    } else {
      response.statusCode = 400;
      response.end(
        `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`
      );
    }
  } else {
    // curl http://localhost:5000/<any>
    response.statusCode = 404;
    response.end("<h1>Uh... kok bisa ke sini linknya?</h1>");
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
