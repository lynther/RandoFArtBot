import { InlineKeyboard, InputFile } from 'grammy';
import type { MyContext } from '../types';
import { logUserAction } from '../utils';

export async function showSettings(ctx: MyContext) {
  const keyboard = new InlineKeyboard()
    .text(`🔞 Рейтинг: ${ctx.session.rating}`, 'rating')
    .row()
    .text(`📄 Теги для e621.net: ${ctx.session.tags}`, 'tags');

  await ctx.replyWithPhoto(new InputFile('bot/attachments/settings.png'), {
    reply_markup: keyboard,
  });

  logUserAction(ctx, '⚙️ Настройки');
}

export async function setSettings(ctx: MyContext) {
  const data = ctx.callbackQuery?.data;

  switch (data) {
    case 'rating': {
      await ctx.conversation.enter('setRating');
      await ctx.answerCallbackQuery('Выбор рейтинга');

      logUserAction(ctx, '⚙️ Настройки -> Рейтинг');
      break;
    }
    case 'tags': {
      await ctx.conversation.enter('setTags');
      await ctx.answerCallbackQuery('Установка тегов');
      logUserAction(ctx, '⚙️ Настройки -> Теги');
      break;
    }
  }
}
