const options = {
  hostname: "localhost",
  port: 3002,
  certFile: "./localhost.pem",
  keyFile: "./localhost-key.pem",
};

const listener = Deno.listenTls(options);
for await (const conn of listener) {
  handleNewConnection(conn);
}

async function handleNewConnection(conn) {
  for await (const { request: req, respondWith: res } of Deno.serveHttp(conn)) {
    res(
      new Response(JSON.stringify({ name: (await req.json()).name }), {
        headers: {
          "content-type": "application/json",
        },
      }),
    );
  }
}
