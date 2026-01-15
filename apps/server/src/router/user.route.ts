import type { FastifyInstance , FastifyRequest, FastifyReply } from "fastify";


export async function userRoutes(server: FastifyInstance): Promise<void>{

  server.get('/',(req:FastifyRequest, reply: FastifyReply)=>{
    reply.send({
      message:"route hit"
    })
  })

  server.post("/register",()=>{})

  server.post("/login",()=>{})

  server.delete("/logout",()=>{})

  server.log.info('user route registered')
}
