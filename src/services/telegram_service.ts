import axios from "axios";
import { BotType, UserType } from "./telegram.model.js";

const token = "ndsanon29321ndsanfjbuo39121ndjsanbo2130921hfdns;nok!!dnsklanon";

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const url = "https://hammerhead-app-wpsna.ondigitalocean.app";
export class TelegramService {
  async getLinkParams(key: string) {
    try {
      const response = await axios.get(`${url}/tg/fb/params/get/${key}`);
      return response.data;
    } catch (e) {
      throw new Error(String(e));
    }
  }
  async getUser(chatId: number, botUserName: string): Promise<UserType | null> {
    try {
      const response = await axios.get<UserType>(
        `${url}/tg/user/${chatId}/${botUserName}`
      );

      if (response.status == 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }
  async getBot(username: string): Promise<BotType> {
    try {
      const response = await axios.post<BotType>(`${url}/tg/bot/get`, {
        username: username,
      });
      return response.data;
    } catch (e) {
      throw new Error(String(e));
    }
  }

  async addUserToBot(botUserName: string, user: any) {
    try {
      const response = await axios.post<UserType>(`${url}/tg/bot/add-user`, {
        username: botUserName,

        user: {
          chatId: user.id,
          first_name: user.first_name,
          username: user.username,
          language_code: user.language_code,
          status: "open",
        },
      });
      return response.data;
    } catch (e) {
      throw new Error(String(e));
    }
  }

  async addParamsToUser(userId: number, key: string) {
    try {
      const response = await axios.get(
        `${url}/tg/user/add/params/${userId}/${key}`
      );
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async updateUser(user: any, queryParams: string): Promise<UserType[]> {
    try {
      const response = await axios.post<UserType[]>(`${url}/tg/user/update`, {
        chatId: user.id,
        first_name: user.first_name,
        username: user.username,
        language_code: user.language_code,
        queryParams: queryParams,
      });
      return response.data;
    } catch (e) {
      throw new Error(String(e));
    }
  }
}
