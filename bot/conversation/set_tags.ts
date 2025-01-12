import { keyboard } from '../bot_commands/start';
import type { MyContext, MyConversation } from '../types';
import { logUserAction } from '../utils';

export async function setTags(conversation: MyConversation, ctx: MyContext) {
  await ctx.reply(`Текущие теги:\n \`${ctx.session.tags}\``, {
    parse_mode: 'MarkdownV2',
    reply_markup: { remove_keyboard: true },
  });
  const waitCtx = await conversation.wait();
  const text = waitCtx.message?.text!;
  await ctx.reply('Теги установлены!', { reply_markup: keyboard });

  logUserAction(ctx, `⚙️ Настройки -> Теги -> ${waitCtx.message?.text}`);
  conversation.session.tags = text;
}
