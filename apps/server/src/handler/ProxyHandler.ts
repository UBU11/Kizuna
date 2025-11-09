import { undefined } from "better-auth";

export default async function createProxyHandler(
  serviceName: any,
  serviceHandler: any
) {
  return async (request: any, reply: any, server: any) => {
    try {
      const url = new URL(request.url, `http;//${request.headers.host}}`);
      const headers = new Headers();
      Object.entries(request.headers).forEach(([key, value]) => {
        if (value) headers.append(key, value.toString());
      });
      const req = new Request(url.toString(), {
        method: request.method,
        headers,
        body: request.body ? JSON.stringify(request.body) : undefined,
      });
      const response = await serviceHandler(req);

      reply.status(response.status);
      response.headers.forEach((value: any, key: any) => {
        reply.header(key, value);
      });
      reply.send(response.body ? await response.text() : null);
    } catch (error) {

      server.log.error(`${serviceName} Error:`, error);
      reply.status(500).send({
        error: `INTERNAL ${serviceName} Failure`,
        code: `Proxy error`,
      })
    }
  };
}
