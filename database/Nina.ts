import { Database } from 'bun:sqlite';

type Tables = 'players' | 'lastGame';
type Types = 'userNum' | 'nickname' | 'mmr' | 'rank' | 'userCode' | 'gameStatus';

export default class Nina extends Database {

  constructor(name: string = 'nina.sqlite') {
    super(name, { create: true })
  }

  public add(table: string = 'players', players: any[]) {
    players.map(player => {
      const allPlayers = this.all('players', 'userNum');
      const existingPlayer = allPlayers.find((i: any) => i.userNum === player.userNum);

      if (!existingPlayer) {
        this.query(`INSERT INTO ${table} (userNum, nickname, mmr, rank) VALUES (${player.userNum}, '${player.nickname}', ${player.mmr}, ${player.rank})`).run();
      } else {
        this.query(`UPDATE ${table} SET nickname = '${player.nickname}', mmr = ${player.mmr}, rank = ${player.rank} WHERE userNum = ${player.userNum}`).run();
      }

    });
  }

  public get(table: Tables = 'players', type: Types = 'userNum', content: any) {
    return this.query(`SELECT * FROM ${table} WHERE ${type} = ${content};`).get();
  }

  public all(table: Tables = 'players', order?: Types) {
    const ord = order ? `ORDER BY ${order} DESC;` : '';
    return this.query(`SELECT * FROM ${table} ${ord}`).all();
  }

  public updateUserCode(userNum: number, userCode: string) {
    return this.query(`UPDATE players SET userCode='${userCode}' WHERE userNum='${userNum}';`).run();
  }

  public updateStatus(userCode: string, gameStatus: string) {
    return this.query(`UPDATE players SET gameStatus='${gameStatus}' WHERE userCode='${userCode}';`).run();
  }

  public deleteAll(table: Tables = 'players') {
    return this.query(`DELETE FROM ${table};`).run();
  }

  public setGames(type: string) {
    return this.query(`INSERT INTO lastGame (ranked) VALUES ('${type}')`).run();
  }

}
