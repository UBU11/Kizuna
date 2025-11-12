

export default function WSEngine(socket: any, req: any) {
  try {
    //websocket is not connecting because of it does'nt detect socket.io
    console.log("New client connected");

    socket.on("message", (message: any) => {
      socket.send(`server:${message}`);

    });
  } catch (error) {

    console.log(`Error: ${error}`);

  }
  finally{
    socket.on("close",()=>{
      console.log("Client disconnected");
    })
  }
}
