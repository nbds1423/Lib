export default interface iPlayers {
  userNum?: number,
  nickname: string,
  mmr: number,
  rank: number
}

export interface playerStatus extends iPlayers {
  gameStatus: string,
  userCode?: string,
}