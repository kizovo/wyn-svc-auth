import { Elysia } from "elysia";
import routes from "./routes";
import conf from "./conf";

const app = new Elysia()
  .use(routes({
        prefix: 'users'
    }))
  .get("/", () => "Hello Elysia")
  .listen(Number(conf.APP_PORT));

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
