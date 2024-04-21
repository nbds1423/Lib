import axios, { AxiosInstance } from 'axios';
import iPlayers from '../interfaces/iPlayers';
import Nina from '../../../database/Nina';

type Settings = {
  serverName: 'SEOUL' | 'ASIA2' | 'OHIO' | 'FRANKURT' | 'SAOPAULO' | 'GLOBAL',
  teamMode: 'SOLO' | 'DUO' | 'SQUAD' | 'COBALT';
}

export default class Dak {

  private _instance: AxiosInstance;
  private readonly _seasonKey: string = '12';
  private readonly _serverName: string;
  private readonly _teamMode: string;

  constructor(private readonly _settings: Settings = { serverName: 'GLOBAL', teamMode: 'SQUAD' }) {

    this._serverName = this._settings.serverName as string;
    this._teamMode = this._settings.teamMode as string;

    this._instance = axios.create({
      baseURL: `https://er-node.dakgg.io/api/v0`
    });

  }

  private async players(id: number): Promise<iPlayers[] | undefined> {
    try {
      const response = await this._instance.get(`/leaderboard?page=${id}&seasonKey=SEASON_${this._seasonKey}&serverName=${this._serverName}&teamMode=${this._teamMode}`);
      const data: iPlayers[] = response.data.leaderboards;

      if (!data.length) return;

      Nina.add('players', data);
      return data;
    } catch (e) {
      console.log('[Dak] | players -> %s', e);
    }
  }

  public async getPlayers(): Promise<void> {
    let count: number = 1;
    while (true) {
      const data = await this.players(count);
      if (!data?.length) break;
      count++;
    }
  }

}