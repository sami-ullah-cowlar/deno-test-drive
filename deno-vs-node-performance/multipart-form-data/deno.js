const listener = Deno.listen({ port: 3004 });
for await (const conn of listener) {
  handleNewConnection(conn);
}

async function handleNewConnection(conn) {
  for await (const { request, respondWith } of Deno.serveHttp(conn)) {
    const reqBody = await request.formData();
    let len = 0;
    for (const i of reqBody.entries()) len++;
    if (reqBody) {
      respondWith(
        new Response(JSON.stringify({ totalFields: len }), {
          headers: { "content-type": "application/json" },
        }),
      );
    }
  }
}
