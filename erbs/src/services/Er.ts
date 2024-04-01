import axios, { AxiosInstance } from "axios"
import Nina from "../../../database/Nina";
import sleep from '../../src/utils/sleep';
import calcMinutes from "../utils/calcMinutes";

export default class Er {

  private static _database = new Nina();
  private static _instance: AxiosInstance = axios.create({
    baseURL: 'https://open-api.bser.io/v1',
    headers: {
      'x-api-key': Bun.env.API_TOKEN,
    }
  })

  public static async getLastGame(userNum: number): Promise<void> {
    try {
      await sleep(1500);
      const response = await this._instance.get(`/user/games/${userNum}`);
      const data = response.data.userGames[0];

      if(calcMinutes.diff(data.startDtm)) return;
      if (data.serverName !== 'SaoPaulo' || data.matchingMode < 3) return;

      this._database.setGames(this.calcMMR(data.mmrAfter));
    } catch (e: any) {
      console.log('[Er] | getLastGame -> %s', e);
    }
  }

  private static calcMMR(mmr: number): string {
    if (mmr > 0 && mmr < 1599) {
      return 'Low'
    } else if (mmr > 1600 && mmr < 6199) {
      return 'Middle'
    } else {
      return 'High'
    }
  }

}