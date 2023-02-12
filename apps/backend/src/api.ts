import type { FastifyPluginCallback } from 'fastify';
import db from './db';
import { ObjectId } from 'db';

const api: FastifyPluginCallback = (server, options, done) => {
  server.get('/orders', async (request, response) => {
    const orders = await db.collection('orders').find().toArray();

    await response.send(orders);
  });

  server.post<{
    Params: { orderId: string };
  }>('/orders/:orderId/done', async (request, response) => {
    await db
      .collection('orders')
      .updateOne(
        { _id: new ObjectId(request.params.orderId) },
        { $set: { status: 'Доставлен' } }
      );

    await response.send();
  });

  server.post<{
    Params: { orderId: string };
  }>('/orders/:orderId/cancel', async (request, response) => {
    await db
      .collection('orders')
      .updateOne(
        { _id: new ObjectId(request.params.orderId) },
        { $set: { status: 'Отменён' } }
      );

    await response.send();
  });

  server.post<{
    Params: { orderId: string };
  }>('/orders/:orderId/confirm', async (request, response) => {
    await db
      .collection('orders')
      .updateOne(
        { _id: new ObjectId(request.params.orderId) },
        { $set: { status: 'Принят' } }
      );

    await response.send();
  });

  server.post<{
    Params: { orderId: string };
  }>('/orders/:orderId/cooking', async (request, response) => {
    await db
      .collection('orders')
      .updateOne(
        { _id: new ObjectId(request.params.orderId) },
        { $set: { status: 'Готовится' } }
      );

    await response.send();
  });

  server.post<{
    Params: { orderId: string };
  }>('/orders/:orderId/delivering', async (request, response) => {
    await db
      .collection('orders')
      .updateOne(
        { _id: new ObjectId(request.params.orderId) },
        { $set: { status: 'В доставке' } }
      );

    await response.send();
  });

  done();
};

export default api;
