import { InlineKeyboard, InputFile } from 'grammy';
import { NekosRating } from '../../image_api/anime/nekos/types';
import { E621Rating } from '../../image_api/furry/e621/types';
import type { MyContext } from '../types';
import { logUserAction } from '../utils';

export function getSettingsKeyboard(ctx: MyContext): InlineKeyboard {
  return new InlineKeyboard()
    .text('🔞 Рейтинг')
    .row()
    .text(
      `⛩️ nekosapi.com (${
        ctx.session.rating.nekos === NekosRating.Safe ? '🌸' : '👨‍🦰'
      })`,
      'rating-nekos'
    )
    .row()
    .text('🌸 Безопасный', 'rating-nekos-s')
    .text('👨‍🦰 Для взрослых', 'rating-nekos-e')
    .row()
    .text(
      `🦊 e621.net (${
        ctx.session.rating.e621 === E621Rating.Safe ? '🌸' : '👨‍🦰'
      })`,
      'rating-e621'
    )
    .row()
    .text('🌸 Безопасный', 'rating-e621-s')
    .text('👨‍🦰 Для взрослых', 'rating-e621-e')
    .row()
    .text('📄 Теги')
    .row()
    .text(`e621.net (${ctx.session.tags})`, 'tags');
}

export async function showSettings(ctx: MyContext) {
  const keyboard = getSettingsKeyboard(ctx);

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
      await ctx.editMessageReplyMarkup({
        reply_markup: getSettingsKeyboard(ctx),
      });
      logUserAction(ctx, '⚙️ Настройки -> Рейтинг');
      break;
    }
    case 'rating-nekos-e': {
      ctx.session.rating.nekos = NekosRating.Explicit;
      await ctx.answerCallbackQuery('Рейтинг установлен');
      await ctx.editMessageReplyMarkup({
        reply_markup: getSettingsKeyboard(ctx),
      });
      logUserAction(ctx, '⚙️ Настройки -> Рейтинг');
      break;
    }
    case 'rating-e621-s': {
      ctx.session.rating.e621 = E621Rating.Safe;
      await ctx.answerCallbackQuery('Рейтинг установлен');
      await ctx.editMessageReplyMarkup({
        reply_markup: getSettingsKeyboard(ctx),
      });
      logUserAction(ctx, '⚙️ Настройки -> Рейтинг');
      break;
    }
    case 'rating-e621-e': {
      ctx.session.rating.e621 = E621Rating.Explicit;
      await ctx.answerCallbackQuery('Рейтинг установлен');
      await ctx.editMessageReplyMarkup({
        reply_markup: getSettingsKeyboard(ctx),
      });
      logUserAction(ctx, '⚙️ Настройки -> Рейтинг');
      break;
    }
    case 'tags': {
      await ctx.conversation.enter('setTags');
      await ctx.answerCallbackQuery('Установка тегов');
      break;
    }
    default: {
      await ctx.answerCallbackQuery('Не используемая кнопка');
      break;
    }
  }
}
