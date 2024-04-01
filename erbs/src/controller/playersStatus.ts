import Nina from "../../../database/Nina";
import ApiError from "../../../errors/ApIError";
import _, { playerStatus } from "../interfaces/iPlayers";

export default (): playerStatus[] | ApiError => {

    const database: playerStatus[] = new Nina().all('players', 'mmr') as playerStatus[];
    const players: playerStatus[] = database.filter((i: playerStatus) => i.gameStatus.toLowerCase() !== 'offline');

    if (!players) throw new ApiError(404, 'no.online.players');
    return players.map(({ userCode, userNum, id, createdAt, updatedAt, ...rest }: any) => rest);
}