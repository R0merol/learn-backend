const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.setHeader("X-Powered-By", "NodeJS");

  response.statusCode = 200;

  const method = request.method;

  const { url } = request;

  if (url === "/") {
    // curl http://localhost:5000/
    if (method === "GET") {
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: "Ini adalah homepage, hasil method GET",
        })
      );
    } else if (method === "POST") {
      response.statusCode = 200;
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(
          JSON.stringify({
            message: `Hai, ${name}! Ini adalah landingpage`,
          })
        );
      });
    } else if (method === "PUT") {
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: "Lah, anda kenapa PUT di /landingpage?!",
        })
      );
    } else {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `Halaman tidak dapat diakses dengan ${method} request`,
        })
      );
    }
  } else if (url === "/about") {
    // curl http://localhost:5000/about
    if (method === "GET") {
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: "Ini adalah /about, hasil method GET",
        })
      );
    } else if (method === "POST") {
      response.statusCode = 200;
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(
          JSON.stringify({
            message: `Hai, ${name}! Ini adalah /about`,
          })
        );
      });
    } else if (method === "PUT") {
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: "Lah, anda kenapa PUT di /about?!",
        })
      );
    } else if (method === "DELETE") {
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: "Lah, anda kenapa PUT didelete /about?!",
        })
      );
    } else {
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `Halaman tidak dapat diakses dengan ${method} request`,
        })
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
