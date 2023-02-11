import fastify from 'fastify';
import cors from '@fastify/cors';
import api from './api';

const server = fastify({
  logger: true,
});
await server.register(cors);
await server.register(api, { prefix: '/api' });

const host = process.env.SERVER_HOSTNAME ?? '0.0.0.0';
const port = parseInt(process.env.SERVER_PORT ?? '3000');

await server.listen({ host, port });
