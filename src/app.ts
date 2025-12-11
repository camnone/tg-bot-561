import { IConfigService } from "./config/config.interface.js";
import { ConfigService } from "./config/config.service.js";
import { Command } from "./commands/command.class.js";
import { StartCommand } from "./commands/start.command.js";
import { Telegraf } from "telegraf";
import { TelegramService } from "./services/telegram_service.js";
import LocalSession from "telegraf-session-local";
import { iBotContext } from "./context/context.interface.js";

class Bot {
  bot: Telegraf<iBotContext>;

  command: Command[] = [];
  constructor(
    private readonly configService: IConfigService,
    private readonly telegramService: TelegramService
  ) {
    this.bot = new Telegraf<iBotContext>(this.configService.get("TOKEN_KEY"));
    this.bot.use(new LocalSession({ database: "bot.json" }).middleware());
  }
  async init() {
    this.command = [new StartCommand(this.bot, this.telegramService)];
    for (const command of this.command) {
      command.handle();
    }
    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService(), new TelegramService());

bot.init();
