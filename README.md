# random_aniFurry_pic_bot
Бот для получения случайного изображения с api nekosapi.com и e621.

Можно менять рейтинг изображения и в будущем планируется поддержка тегов.

To install dependencies:

```bash
bun install
```

Переменные окружения:

| Имя   | Описание                                   |
|-------|--------------------------------------------|
| TOKEN | Токен бота, без него работать не будет     |
| PROXY | HTTP прокси, возможно потребуется для e621 |

Для запуска:

Перед запуском задать переменную окружения TOKEN в файле `.env` либо другим способом.

Для e621 может понадобится `http` прокси.


```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.42. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
