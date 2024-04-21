import Nina from "../../../database/Nina";
import Bser from "../services/Bser";

export default async (): Promise<void> => {

  const players = Nina.all('players', 'mmr');
  const userNum = players.filter((i: any) => i.userCode === 'false').map((i: any) => i.userNum);

  for (const un of userNum) {
    await Bser.userCode(un);
  }
}

