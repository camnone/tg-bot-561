import { Telegraf } from "telegraf";
import { iBotContext } from "../context/context.interface.js";

export abstract class Command {
  constructor(public bot: Telegraf<iBotContext>) {}

  abstract handle(): void;
}
