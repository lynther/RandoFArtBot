import type { Rating } from '../../image_api/anime/nekos/types';
import type { MyContext, MyConversation } from '../types';
import { logUserAction } from '../utils';

const availableRatings = ['safe', 'suggestive', 'borderline', 'explicit'];

export async function setRating(conversation: MyConversation, ctx: MyContext) {
  const msg = [
    'Отправьте рейтинг из списка:',
    `\`safe\``,
    `\`suggestive\``,
    `\`borderline\``,
    `\`explicit\``,
  ];

  await ctx.reply(msg.join('\n'), { parse_mode: 'MarkdownV2' });
  const rating = await conversation.form.select(availableRatings);
  await ctx.reply('Новый рейтинг установлен!');

  logUserAction(ctx, `⚙️ Настройки -> Рейтинг -> ${rating}`);
  conversation.session.rating = rating as Rating;
}
