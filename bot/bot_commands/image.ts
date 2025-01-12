import { env } from 'bun';
import { getNekosRandomImage } from '../../image_api/anime/nekos/mod';
import { getE621RandomImage } from '../../image_api/furry/e621/mod';
import type { MyContext } from '../types';
import { logUserAction, mdEscape } from '../utils';

const errorMsg = [
  'Не удалось получить ссылку на изображение.',
  'Попробуйте ещё раз, или поменяйте теги.',
].join('\n');

export async function imageCommandAnime(ctx: MyContext) {
  const image = await getNekosRandomImage(ctx.session.rating);

  logUserAction(ctx, '⛩️ Получить изображение [Anime]');

  if (image !== null) {
    const description = [
      `*Автор*: ${image.artist_name ?? 'не указан'}`,
      `*Теги*: ${mdEscape(image.tags.join(', '))}`,
      `*Рейтинг*: \`${ctx.session.rating}\``,
    ];

    await ctx.replyWithChatAction('upload_photo');
    await ctx.replyWithPhoto(image.url, {
      caption: description.join('\n'),
      parse_mode: 'MarkdownV2',
    });
    return;
  }

  await ctx.reply(errorMsg);
}

export async function imageCommandFurry(ctx: MyContext) {
  const post = await getE621RandomImage(
    `${ctx.session.tags} rating:e -type:gif -type:swf -type:webm`,
    env.PROXY!
  );

  logUserAction(ctx, '🦊 Получить изображение [Furry]');

  if (post === null) {
    await ctx.reply(errorMsg);
    return;
  }

  let tags;

  if (post.tags.general.length > 30) {
    tags = post.tags.general.slice(0, 30);
  } else {
    tags = post.tags.general;
  }

  const { artist } = post.tags;
  const description = [
    artist.length == 1
      ? `*Автор*: ${mdEscape(artist[0])}`
      : `*Авторы*: ${mdEscape(artist.join(', '))}`,
    `*Теги*: ${mdEscape(tags.join(', '))}`,
    `*Рейтинг*: \`${post.rating}\``,
    `[Ссылка на пост](https://e621.net/posts/${post.id})`,
  ];

  await ctx.replyWithChatAction('upload_photo');

  if (post.file.size > 5242880 || post.file.url === null) {
    await ctx.reply(description.join('\n'), { parse_mode: 'MarkdownV2' });
    return;
  }

  await ctx.replyWithPhoto(post.file.url, {
    caption: description.join('\n'),
    parse_mode: 'MarkdownV2',
  });
  return;
}
