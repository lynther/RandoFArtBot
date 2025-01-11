import { getRandomImage } from '../../nekos_api/mod';
import type { MyContext } from '../types';
import { logUserAction } from '../utils';

export async function imageCommand(ctx: MyContext) {
  const image = await getRandomImage({ rating: ctx.session.rating, tags: ctx.session.tags });

  logUserAction(ctx, '🎨 Получить изображение');

  if (image !== null) {
    const description = [
      `*Автор*: ${image.artist_name ?? 'не указан'}`,
      `*Теги*: ${image.tags.join(', ').replaceAll('_', '\\_')}`,
      `*Рейтинг*: \`${ctx.session.rating}\``,
    ];

    await ctx.replyWithChatAction('upload_photo');
    await ctx.replyWithPhoto(image.url, {
      caption: description.join('\n'),
      parse_mode: 'MarkdownV2',
    });
    return;
  }

  await ctx.reply('Не удалось получить ссылку на изображение :(');
}
