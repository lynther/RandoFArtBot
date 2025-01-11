import type { MyContext } from './types';

export function logUserAction(ctx: MyContext, action: string) {
  console.log(
    `[${ctx.chatId}, ${ctx.chat?.first_name} ${ctx.chat?.last_name}, ${ctx.chat?.username}] - ${action}`
  );
}
