import { Keyboard, type CommandContext } from 'grammy';
import type { MyContext } from '../types';
import { logUserAction } from '../utils';

export const keyboard = new Keyboard()
  .text('⛩️ Получить изображение [Anime]')
  .row()
  .text('🦊 Получить изображение [Furry]')
  .row()
  .text('⚙️ Настройки')
  .resized()
  .persistent();

export async function startCommand(ctx: CommandContext<MyContext>) {
  await ctx.reply('Привет', { reply_markup: keyboard });
  logUserAction(ctx, '/start');
}
