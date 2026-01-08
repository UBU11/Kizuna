
import Fastify from 'fastify';

const fastify = Fastify({
    logger: true
});


await fastify.register(import('@fastify/websocket'));

export default async function WShandler(server:any) {

}{
fastify.register(async function (fastify) {
    fastify.get('/', { websocket: true }, (connection, request) => {
        const clientIP = request.socket.remoteAddress;
        console.log(`Client connected from ${clientIP}`);

        connection.send('Connected to Fastify WebSocket server!');

        connection.on('message', message => {
            try {
                const text = message.toString();
                console.log(`Received from ${clientIP}:`, text);

                if (connection.readyState === connection.OPEN) {
                    connection.send(`Echo: ${text}`);
                }
            } catch (error) {
                console.error('Error processing message:', error);
            }
        });


        connection.on('error', (error) => {
            console.error(`WebSocket error for ${clientIP}:`, error);
        });

        connection.on('close', (code, reason) => {
            console.log(`Client ${clientIP} disconnected - Code: ${code}, Reason: ${reason?.toString() || 'none'}`);
        });

    });
});

}
