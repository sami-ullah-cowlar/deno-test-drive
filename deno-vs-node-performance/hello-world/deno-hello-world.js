const resBody = { body: "Hello world" };
const listener = Deno.listen({ port: 3000 });
for await (const conn of listener) {
  handleNewConnection(conn);
}

async function handleNewConnection(conn) {
  for await (const { request, respondWith } of Deno.serveHttp(conn)) {
    respondWith(
      new Response(JSON.stringify(resBody), {
        headers: { "content-type": "application/json" },
      }),
    );
  }
}
