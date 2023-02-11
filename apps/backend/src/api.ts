import type { FastifyPluginCallback } from 'fastify';
import db from './db';

const api: FastifyPluginCallback = (server, options, done) => {
  server.get('/orders', async (request, response) => {
    const orders = await db.collection('orders').find().toArray();

    await response.send(orders);
  });

  done();
};

export default api;
