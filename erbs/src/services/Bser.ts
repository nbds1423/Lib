import axios, { AxiosInstance } from "axios"
import ApiError from "../../../errors/ApIError";
import { erError } from "../types/erError";
import Nina from "../../../database/Nina";

export default class Bser {

  private _instance: AxiosInstance;
  private readonly _version: string = '1.17.0';
  private readonly _token: string | undefined = Bun.env.TOKEN;
  private readonly _userCode: string | undefined = Bun.env.USERCODE;
  private readonly _defaultError: erError = { cod: 500, message: 'Internal Server Error' };
  private readonly _database: Nina;

  constructor() {
    this._database = new Nina();
    this._instance = axios.create({
      baseURL: 'https://bser-rest-release.bser.io/api',
      headers: {
        'User-Agent': 'Nina 1.0.0',
        'X-BSER-AuthProvider': 'STEAM',
        'X-BSER-SessionKey': 'Session:' + this._token?.replace('Session:', ''),
        'X-BSER-Version': this._version,
      }
    })
  }

  updateHeaders(key: string, value: string) {
    return this._instance.defaults.headers[key] = value;
  };

  private listExceptions(code: number): erError {
    const erros: { [key: number]: erError } = {
      1102: { cod: 498, message: 'expired.token' },
      1007: { cod: 498, message: 'invalid.version' },
      1004: { cod: 498, message: 'outdated.version' }
    }
    return erros[code] ?? this._defaultError;
  }

  private handleExceptions(code: any) {
    if (code < 1000) return;

    const { cod, message } = this.listExceptions(code);
    throw new ApiError(cod, message);
  }

  public async userCode(userNum: number): Promise<void> {
    try {
      const response = await this._instance.get(`/users/other/simple/${userNum}`);

      this.handleExceptions(response.data?.cod);
      if (!response.data?.rst?.user?.userCode) return;

      this._database.updateUserCode(userNum, response.data.rst.user.userCode)
    } catch (e: any) {
      console.log('[Bser] | userCode -> %s', e?.message || e);
    }
  }

  public async playerStatus(players: string[]): Promise<string | undefined> {
    try {
      const response = await axios.post('https://api-proxy.eternalreturn.io/user/presence', {
        "userCode": this._userCode,
        "userCodes": players
      });

      this.handleExceptions(response.data?.cod);

      let gameStatus: string = '';

      players.forEach(player => {
        const presence = response.data.userPresences.find((i: any) => i.userCode === player);
        presence ? this._database.updateStatus(presence.userCode, presence.gamestatus) : this._database.updateStatus(player, 'Offline');
        return gameStatus = presence ? presence.gamestatus : 'Offline';
      });

      return gameStatus;

    } catch (e: any) {
      console.log('[Bser] | playerStatus -> %s', e?.message || e);
    }
  }
}