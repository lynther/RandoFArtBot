import { Keyboard, type CommandContext } from 'grammy';
import type { MyContext } from '../types';
import { logUserAction } from '../utils';

const keyboard = new Keyboard()
  .text('🎨 Получить изображение')
  .row()
  .text('⚙️ Настройки')
  .resized()
  .persistent();

export async function startCommand(ctx: CommandContext<MyContext>) {
  await ctx.reply('Привет', { reply_markup: keyboard });
  logUserAction(ctx, '/start');
}
