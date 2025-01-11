import type { MyContext } from '../types';
import { imageCommandAnime, imageCommandFurry } from './image';
import { showSettings } from './settings';

export async function onMessageText(ctx: MyContext) {
  switch (ctx.message?.text?.slice(3)) {
    case 'Получить изображение [Anime]': {
      await imageCommandAnime(ctx);
      break;
    }
    case 'Получить изображение [Furry]': {
      await imageCommandFurry(ctx);
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
