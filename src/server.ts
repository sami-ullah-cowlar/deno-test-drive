import { oak } from "./../deps.ts";
import { hello } from "./utils.ts";

const { Application, Router } = oak;

type Book = {
  id: number;
  title: string;
  author: string;
};

const books: Book[] = [
  {
    id: 1,
    title: "The Hobbit",
    author: "J. R. R. Tolkien",
  },
];

const app = new Application();

// Logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
});

const router = new Router();

router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/book", (context) => {
    context.response.body = books;
  })
  .get("/book/:id", (context) => {
    if (context.params && context.params.id) {
      let id: any = context.params.id;
      context.response.body = books.find((book) => book.id === parseInt(id));
    }
  })
  .post("/book", async (context) => {
    const body: any = await context.request.body();
    if (!body.value.title || !body.value.author) {
      context.response.status = 400;
      return;
    }
    const newBook: Book = {
      id: 2,
      title: body.value.title,
      author: body.value.author,
    };
    books.push(newBook);
    context.response.status = 201;
  });

app.use(router.routes());
app.use(router.allowedMethods());

// Make Api Call
try {
  const jsonResponse = await fetch("https://api.github.com/users/denoland");
  const jsonData = await jsonResponse.json();
  // throw new Error("sdd");
  const textResponse = await fetch("https://deno.land/");
  const textData = await textResponse.text();

  const response: object = { jsonData, textData };
  console.log(response);
} catch (error) {
  console.log("--------------- Api Calling Error ---------------");
  console.log(error);
  console.log("--------------- Api Calling Error ---------------");
}

console.log(hello("john"));
console.log(hello("Sarah"));
console.log(hello("kai"));

await app.listen({ port: 8000 });
