import { Context, Markup, Telegraf } from "telegraf";
import { Command } from "./command.class.js";
import { TelegramService } from "../services/telegram_service.js";
import { iBotContext } from "../context/context.interface.js";

export class StartCommand extends Command {
  constructor(
    bot: Telegraf<iBotContext>,
    private readonly pushService: TelegramService
  ) {
    super(bot);
  }

  handle(): void {
    this.bot.start(async (ctx) => {
      try {
        const key = ctx.payload;
        let params;

        if (!ctx.session.chatId) {
          ctx.session.chatId = ctx.chat.id;
        }

        if (ctx.session.params) {
          params = ctx.session.params;
        } else {
          const user = await this.pushService.getUser(
            ctx.chat.id,
            ctx.botInfo["username"]
          );

          if (user) {
            if (user["params"].length > 0) {
              params = user["params"][0].params;
              ctx.session.params = params;
            } else {
              if (key) {
                params = await this.addParamsToUser(ctx, key, params);
                ctx.session.params = params;
              }
            }
          } else {
            await this.pushService.addUserToBot(
              ctx.botInfo["username"],
              ctx.from
            );
            if (key) {
              params = await this.addParamsToUser(ctx, key, params);
              ctx.session.params = params;
            }
          }
        }
        await this.showBanner(ctx, params, key);
      } catch (e: any) {
        console.log(e.message);
      }
    });
  }

  private async showBanner(ctx: any, params: any, key: string) {
    const bot = await this.pushService.getBot(ctx.botInfo["username"]);
    if (bot) {
      const random = Math.floor(Math.random() * bot!.banner.length);
      let link = bot!.banner[random].appUrl;
      if (params) {
        link += params + `&sub_id_8=${ctx.chat.id}`;
      } else {
        link += `?sub_id_1=${params}&sub_id_2=${key ?? "key clear"}&sub_id_3=${
          ctx.chat.id
        }`;
      }

      ctx.replyWithPhoto(
        { url: bot!.banner![random].imageUrl! },
        {
          caption: bot!.banner[random].textUrl,
          parse_mode: "HTML",
          ...Markup.inlineKeyboard([
            Markup.button.webApp(bot!.banner[random].buttonText, link),
          ]),
        }
      );
    } else {
      ctx.reply("Настройке бота");
    }
  }

  private async addParamsToUser(ctx: any, key: string, params: any) {
    const addParams = await this.pushService.addParamsToUser(ctx.chat.id, key);
    if (addParams) {
      if (addParams["params"][0]["params"].length > 0) {
        params = addParams["params"][0]["params"];
        ctx.session.params = params;
      }
      return params;
    } else {
      return (params = undefined);
    }
  }
}
