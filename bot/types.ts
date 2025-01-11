import type { Conversation, ConversationFlavor } from '@grammyjs/conversations';
import type { Context, SessionFlavor } from 'grammy';
import type { Rating } from '../nekos_api/types';

export interface SessionData {
  rating: Rating;
  tags: string;
}

export type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;
