import { NekosRating } from '../../image_api/anime/nekos/types';
import type { E621Rating } from '../../image_api/furry/e621/types';
import { keyboard } from '../bot_commands/start';
import type { MyContext, MyConversation } from '../types';
import { logUserAction } from '../utils';

const ratingsNekos = ['safe', 'suggestive', 'borderline', 'explicit'];
const ratingsE621 = ['s', 'q', 'e'];
const msgNekos = [
  'Отправьте рейтинг из списка:',
  `\`safe\``,
  `\`suggestive\``,
  `\`borderline\``,
  `\`explicit\``,
].join('\n');
const msgE621 = [
  'Отправьте рейтинг из списка:',
  `\`s\``,
  `\`q\``,
  `\`e\``,
].join('\n');

export async function setRating(conversation: MyConversation, ctx: MyContext) {
  let msg = msgNekos;
  let site = 'nekos';
  let ratings = ratingsNekos;

  if (ctx.callbackQuery?.data !== 'rating-nekos') {
    msg = msgE621;
    site = 'e621';
    ratings = ratingsE621;
  }

  await ctx.reply(msg, {
    parse_mode: 'MarkdownV2',
    reply_markup: { remove_keyboard: true },
  });

  const rating = await conversation.form.select(ratings, async ctx => {
    await ctx.reply(msg, { parse_mode: 'MarkdownV2' });
  });

  await ctx.reply('Новый рейтинг установлен!', { reply_markup: keyboard });
  conversation.session.rating[site] = rating as NekosRating | E621Rating;
  logUserAction(ctx, `⚙️ Настройки -> Рейтинг nekosapi.com -> ${rating}`);
}
