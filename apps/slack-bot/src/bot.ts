import { RTMClient } from '@slack/rtm-api';
import { WebClient } from '@slack/web-api';
import { createMessageAdapter } from '@slack/interactive-messages';
import db from './db';
import { every, isString, isStaticSelectAction } from './utils/guards';
import { formatAdress } from './utils/format';
import type { Payload } from './types';
import type { Order } from 'types/data';
import type { Nullable } from 'types/common';
import orderForm from './assets/orderForm.json' assert { type: 'json' };

if (process.env.SLACK_SIGNING_SECRET === undefined) {
  throw new Error('Переменная SLACK_SIGNING_SECRET не определена');
}

if (process.env.SLACK_TOKEN === undefined) {
  throw new Error('Переменная SLACK_TOKEN не определена');
}

const slackInteractions = createMessageAdapter(
  process.env.SLACK_SIGNING_SECRET
);

const token = process.env.SLACK_TOKEN;
const port = 80;

const currentOrders: Map<string, Nullable<Order>> = new Map();

function createNewOrder(userName: string) {
  if (!currentOrders.has(userName)) {
    currentOrders.set(userName, {
      user_name: null,
      name: null,
      size: null,
      dough: null,
      side: null,
      additive: null,
      adress: null,
      comment: null,
      date: null,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return currentOrders.get(userName)!;
}

//SLACKBOT REALIZATION...
slackInteractions.action({ type: 'button' }, async (payload: Payload) => {
  const adressData = Object.keys(payload.state.values).reduce<
    (string | null)[]
  >((acc, item) => {
    if ('input_adress' in payload.state.values[item]) {
      const value = payload.state.values[item]['input_adress'];
      if (value.type === 'plain_text_input') {
        acc.push(value.value);
      }
    }

    return acc;
  }, []);

  if (adressData.some((value) => value === null)) {
    postMessage(
      'Не все поля адреса заполнены, проверьте форму заказа',
      payload.user.id
    );

    return;
  }

  const newOrder = createNewOrder(payload.user.id);
  if (
    newOrder.name === null ||
    newOrder.size === null ||
    newOrder.dough === null ||
    newOrder.side === null ||
    newOrder.additive === null
  ) {
    postMessage(
      'Не все поля с выбором заполнены, проверьте форму заказа',
      payload.user.id
    );

    return;
  }

  if (every(adressData, isString)) {
    newOrder.adress = formatAdress(adressData);
  }

  newOrder.user_name = payload.user.username;
  newOrder.date = new Date().toISOString();

  const orderMessage = [
    `Пицца ${newOrder.name}`,
    `размер: ${newOrder.size}`,
    `тесто: ${newOrder.dough}`,
    `борт: ${newOrder.side}`,
    `с добавкой: ${newOrder.additive}`,
    `по адресу: ${newOrder.adress}`,
  ].join(', ');

  await web.chat.update({
    text: 'Обновление сообщения',
    token: token,
    channel: payload.channel.id,
    ts: payload.container.message_ts,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: `Ваш заказ -  ${orderMessage} успешно создан, в случае возникновения вопросов наш менеджер напишет вам в этот чат`,
        },
      },
    ],
  });

  const ordersCollection = db.collection('orders');
  await ordersCollection.insertOne(newOrder);

  const userOrdersCount = await ordersCollection.countDocuments({
    user_name: newOrder.user_name,
  });
  postMessage(
    `Количество заказанных вами пицц: ${userOrdersCount}`,
    payload.user.id
  );
});
//...<make new order button> click

//static_select choice...
slackInteractions.action({ type: 'static_select' }, (payload: Payload) => {
  const action = payload.actions.at(0);

  if (action !== undefined && isStaticSelectAction(action)) {
    const newOrder = createNewOrder(payload.user.id);
    const value = action.selected_option?.text.text ?? null;
    switch (action.placeholder.text) {
      case 'Выбрать пиццу':
        newOrder.name = value;
        break;
      case 'Выбрать размер':
        newOrder.size = value;
        break;
      case 'Выбрать тесто':
        newOrder.dough = value;
        break;
      case 'Выбрать бортик':
        newOrder.side = value;
        break;
      case 'Выбрать добавку':
        newOrder.additive = value;
        break;
    }
  }
});
//...static_select choice

await slackInteractions.start(port);

const web = new WebClient(token); //отвеает за отправку сообщений в чат и в личку(через бота Slackbot)
//от лица приложения "Пицца"
const rtm = new RTMClient(token); //отвечает за события, связанные с приложением "Пицца"

rtm.on(
  'message',
  async (event: {
    bot_id: string;
    subtype: string;
    text: string;
    channel: string;
    user: string;
  }) => {
    if (event.bot_id || event.subtype === 'channel_join') {
      //отвечает только на сообщения(!) людей(не ботов)
      return;
    }

    const str = event.text.toLowerCase();
    if (str.includes('ты где') || str.includes('бот')) {
      postMessage(
        `Я здесь! Чтобы заказать пиццу, напиши "хочу"!`,
        event.channel
      );
    }

    if (str === 'хочу') {
      postMessage(null, event.user, orderForm.blocks);
    }
  }
);

async function postMessage(
  aText: string | null = null,
  aChannel: any,
  aBlocks: any = null
) {
  if (aText) {
    await web.chat.postMessage({
      text: aText,
      channel: aChannel,
    });
  }

  if (aBlocks) {
    await web.chat.postMessage({
      channel: aChannel,
      blocks: aBlocks,
      text: 'Заполните форму',
    });
  }
}

await rtm.start();
//...SLACKBOT REALIZATION
