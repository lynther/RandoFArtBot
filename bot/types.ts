import type { Conversation, ConversationFlavor } from '@grammyjs/conversations';
import type { Context, SessionFlavor } from 'grammy';
import type { NekosRating } from '../image_api/anime/nekos/types';
import type { E621Rating } from '../image_api/furry/e621/types';

export interface SessionData {
  rating: Rating;
  tags: string;
}

interface Rating {
  nekos: NekosRating;
  e621: E621Rating;
}

export type MyContext = Context &
  SessionFlavor<SessionData> &
  ConversationFlavor;
export type MyConversation = Conversation<MyContext>;
