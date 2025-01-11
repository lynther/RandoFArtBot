import { env } from 'bun';
import { getNekosRandomImage } from '../../image_api/anime/nekos/mod';
import { getE621RandomImage } from '../../image_api/furry/e621/mod';
import type { MyContext } from '../types';
import { logUserAction } from '../utils';

export async function imageCommandAnime(ctx: MyContext) {
  const image = await getNekosRandomImage({ rating: ctx.session.rating, tags: ctx.session.tags });

  logUserAction(ctx, '⛩️ Получить изображение [Anime]');

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

export async function imageCommandFurry(ctx: MyContext) {
  const post = await getE621RandomImage('fox', env.PROXY!);

  logUserAction(ctx, '🦊 Получить изображение [Furry]');

  if (post !== null) {
    const description = [
      `*Автор*: ${post.tags.artist ?? 'не указан'}`,
      `*Теги*: ${post.tags.general.join(', ').replaceAll('_', '\\_')}`,
      `*Рейтинг*: \`${post.rating}\``,
    ];

    await ctx.replyWithChatAction('upload_photo');
    await ctx.replyWithPhoto(post.file.url, {
      caption: description.join('\n'),
      parse_mode: 'MarkdownV2',
    });
    return;
  }

  await ctx.reply('Не удалось получить ссылку на изображение :(');
}
