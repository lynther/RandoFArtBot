import type { Conversation, ConversationFlavor } from '@grammyjs/conversations';
import type { Context, SessionFlavor } from 'grammy';
import type { NekosRating } from '../image_api/anime/nekos/types';
import type { E621Rating } from '../image_api/furry/e621/types';

export interface SessionData {
  rating: Record<string, E621Rating | NekosRating>;
  tags: string;
}

export type MyContext = Context &
  SessionFlavor<SessionData> &
  ConversationFlavor;
export type MyConversation = Conversation<MyContext>;
