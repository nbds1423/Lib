import Nina from "../../../database/Nina";
import Bser from "../services/Bser";

export default async (): Promise<void> => {

  const database = new Nina();
  const bser = new Bser();

  const players = database.all('players', 'mmr');
  const userNum = players.filter((i: any) => i.userCode === 'false').map((i: any) => i.userNum);

  for (const un of userNum) {
    await bser.userCode(un);
  } 
}

