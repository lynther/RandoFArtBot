import { InlineKeyboard, InputFile } from 'grammy';
import { NekosRating } from '../../image_api/anime/nekos/types';
import { E621Rating } from '../../image_api/furry/e621/types';
import type { MyContext } from '../types';
import { logUserAction } from '../utils';

export async function showSettings(ctx: MyContext) {
  const keyboard = new InlineKeyboard()
    .text('🔞 Рейтинг')
    .row()
    .text(`nekosapi.com (${ctx.session.rating.nekos})`, 'rating-nekos')
    .row()
    .text('🌸 Безопасный', 'rating-nekos-s')
    .text('👨‍🦰 Для взрослых', 'rating-nekos-e')
    .row()
    .text(`e621.net (${ctx.session.rating.e621})`, 'rating-e621')
    .row()
    .text('🌸 Безопасный', 'rating-e621-s')
    .text('👨‍🦰 Для взрослых', 'rating-e621-e')
    .row()
    .text('📄 Теги')
    .row()
    .text(`e621.net (${ctx.session.tags})`, 'tags');

  await ctx.replyWithPhoto(new InputFile('bot/attachments/settings.png'), {
    reply_markup: keyboard,
  });

  logUserAction(ctx, '⚙️ Настройки');
}

export async function setSettings(ctx: MyContext) {
  const data = ctx.callbackQuery?.data;

  switch (data) {
    case 'rating-nekos-s': {
      ctx.session.rating.nekos = NekosRating.Safe;
      await ctx.answerCallbackQuery('Рейтинг установлен');
      break;
    }
    case 'rating-nekos-e': {
      ctx.session.rating.nekos = NekosRating.Explicit;
      await ctx.answerCallbackQuery('Рейтинг установлен');
      break;
    }
    case 'rating-e621-s': {
      ctx.session.rating.e621 = E621Rating.Safe;
      await ctx.answerCallbackQuery('Рейтинг установлен');
      break;
    }
    case 'rating-e621-e': {
      ctx.session.rating.e621 = E621Rating.Explicit;
      await ctx.answerCallbackQuery('Рейтинг установлен');
      break;
    }
    case 'tags': {
      await ctx.conversation.enter('setTags');
      await ctx.answerCallbackQuery('Установка тегов');
      logUserAction(ctx, '⚙️ Настройки -> Теги');
      break;
    }
    default: {
      await ctx.answerCallbackQuery('Не используемая кнопка');
      break;
    }
  }
}
