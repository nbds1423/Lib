import Nina from "../../../database/Nina";
import Bser from "../services/Bser";
import getGames from "./getGames";

export default async (): Promise<void> => {

  const database = Nina.all('players', 'mmr');

  const userCode = database.map((i: any) => i.userCode);
  for (let i = 0; i < userCode.length; i += 100) {
    const players = userCode.slice(i, i + 100);
    await Bser.playerStatus(players);
  }
  await getGames();
}