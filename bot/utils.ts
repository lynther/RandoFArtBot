import type { MyContext } from './types';

export function logUserAction(ctx: MyContext, action: string) {
  console.log(
    `[${ctx.chatId}, ${ctx.chat?.first_name} ${ctx.chat?.last_name}, ${ctx.chat?.username}] - ${action}`
  );
}

const replacements = [
  [/\*/g, '\\*', 'asterisks'],
  [/#/g, '\\#', 'number signs'],
  [/\//g, '\\/', 'slashes'],
  [/\(/g, '\\(', 'parentheses'],
  [/\)/g, '\\)', 'parentheses'],
  [/\[/g, '\\[', 'square brackets'],
  [/\]/g, '\\]', 'square brackets'],
  [/</g, '&lt;', 'angle brackets'],
  [/>/g, '&gt;', 'angle brackets'],
  [/_/g, '\\_', 'underscores'],
  [/`/g, '\\`', 'codeblocks'],
  [/-/g, '\\-', 'codeblocks'],
  [/\./g, '\\.', 'dot'],
];

// https://www.npmjs.com/package/markdown-escape?activeTab=code
export function mdEscape(s: any, skips?: any) {
  skips = skips || [];

  return replacements.reduce(function (string, replacement) {
    var name = replacement[2];

    return name && skips.indexOf(name) !== -1
      ? string
      : string.replace(replacement[0], replacement[1]);
  }, s);
}
