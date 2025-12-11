import { Context } from "telegraf";

export interface SessionData {
  chatId: number;
  params: string;
}

export interface iBotContext extends Context {
  session: SessionData;
}
