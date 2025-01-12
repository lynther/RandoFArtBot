import { conversations, createConversation } from '@grammyjs/conversations';
import { FileAdapter } from '@grammyjs/storage-file';
import { env } from 'bun';
import { Bot, session } from 'grammy';
import { NekosRating } from '../image_api/anime/nekos/types';
import { E621Rating } from '../image_api/furry/e621/types';
import { onMessageText } from './bot_commands/message';
import { setSettings } from './bot_commands/settings';
import { startCommand } from './bot_commands/start';
import { setRating } from './conversation/set_rating';
import { setTags } from './conversation/set_tags';
import type { MyContext, SessionData } from './types';

const bot = new Bot<MyContext>(env.TOKEN!);

function initial(): SessionData {
  return {
    rating: {
      nekos: NekosRating.Safe,
      e621: E621Rating.Safe,
    },
    tags: 'fox',
  };
}

bot.use(
  session({
    initial,
    storage: new FileAdapter<SessionData>({ dirName: 'sessions' }),
  })
);
bot.use(conversations());
bot.use(createConversation(setRating));
bot.use(createConversation(setTags));

bot.command('start', startCommand);

bot.on('message:text', onMessageText);
bot.on('callback_query:data', setSettings);
bot.catch(async err => {
  console.error(err.message);
});

export async function startPolling() {
  await bot.api.setMyShortDescription(
    'Отправляет случайное изображение с nekosapi.com или e621.net'
  );
  await bot.api.setMyDescription(
    'Отправляет случайное изображение с nekosapi.com или e621.net'
  );
  await bot.api.setMyCommands([
    { command: 'start', description: 'Показать клавиатуру' },
  ]);

  bot.start();
  console.log('Бот запустился');
}
