export default function WSEngine(socket: any, req: any) {
  socket.on("message", (message) => {
    socket.send(`server:${message}`);
  });
}
