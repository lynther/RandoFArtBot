import type { Rating } from '../../image_api/anime/nekos/types';
import { keyboard } from '../bot_commands/start';
import type { MyContext, MyConversation } from '../types';
import { logUserAction } from '../utils';

const availableRatings = ['safe', 'suggestive', 'borderline', 'explicit'];
const msg = [
  'Отправьте рейтинг из списка:',
  `\`safe\``,
  `\`suggestive\``,
  `\`borderline\``,
  `\`explicit\``,
].join('\n');

export async function setRating(conversation: MyConversation, ctx: MyContext) {
  await ctx.reply(msg, {
    parse_mode: 'MarkdownV2',
    reply_markup: { remove_keyboard: true },
  });
  const rating = await conversation.form.select(availableRatings, async ctx => {
    await ctx.reply(msg, { parse_mode: 'MarkdownV2' });
  });
  await ctx.reply('Новый рейтинг установлен!', { reply_markup: keyboard });

  logUserAction(ctx, `⚙️ Настройки -> Рейтинг -> ${rating}`);
  conversation.session.rating = rating as Rating;
}
