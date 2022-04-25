import { serve } from "https://deno.land/std@0.136.0/http/server.ts";
import { fetchIkaStatus } from "./is-ika-active.ts";

async function handler(req: Request): Promise<Response> {
  const statusHtml = [
    "NO",
    `<a href="https://tibyte.net/is-kkiroserver-active/">YES, but...</a>`,
    `<a href="https://tibyte.net/is-kkiroserver-active/">YES</a>`,
  ][await fetchIkaStatus()];
  const template = await Deno.readFile("./template.html");
  const html = new TextDecoder().decode(template).replace("<!--status-->", statusHtml);
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

console.log("Listening on http://localhost:8000");
await serve(handler);