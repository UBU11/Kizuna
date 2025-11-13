import fastify from "fastify";

const server = fastify({
  logger: true,
});

export default function WSEngine(socket: any, req: any) {
  try {
    server.log.info("Client connected");

    socket.on("message", (message: any) => {
      let data = message.toString();

      server.log.info(`Recieved message: ${data}`);
      socket.send(`server:${data}`);
    });

    socket.on("close", () => {
      console.log("Client disconnected");
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
