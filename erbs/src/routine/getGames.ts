import Nina from "../../../database/Nina";
import Er from "../services/Er";

export default async (): Promise<void> => {

  Nina.deleteAll('lastGame');

  const players = Nina.all('players', 'mmr');
  const userNum = players.filter((i: any) => i.gameStatus !== 'Offline').map((i: any) => i.userNum);
  
  for (const un of userNum) {
    await Er.getLastGame(un);
  }
}
