import WSEngine from "../handler/wsEngine.ts";

export default async function wsRoutes(server: any) {
  server.get("/", { WebSocket: true }, WSEngine);
}
