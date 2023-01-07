import { RouteDataArgs } from "solid-start";
// handles HTTP GET requests to /api/students
export function GET({ params }: RouteDataArgs) {
  const name = params.name;
  debugger;
  console.log("/api/greetings", params);
  return new Response(`Hello ${name}!`);
}
