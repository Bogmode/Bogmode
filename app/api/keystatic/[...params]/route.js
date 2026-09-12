import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../keystatic.config";
const handlers = makeRouteHandler({ config });
export async function GET(...args) { return process.env.NODE_ENV === "production" ? new Response(null, {status:404}) : handlers.GET(...args); }
export async function POST(...args) { return process.env.NODE_ENV === "production" ? new Response(null, {status:404}) : handlers.POST(...args); }
