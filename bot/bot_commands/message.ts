import type { MyContext } from '../types';
import { imageCommand } from './image';
import { showSettings } from './settings';

export async function onMessageText(ctx: MyContext) {
  switch (ctx.message?.text?.slice(3)) {
    case 'Получить изображение': {
      await imageCommand(ctx);
      break;
    }
    case 'Настройки': {
      await showSettings(ctx);
      break;
    }
    default: {
      break;
    }
  }
}
