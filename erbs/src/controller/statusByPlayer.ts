import Nina from "../../../database/Nina";
import ApiError from "../../../errors/ApIError";
import _, { playerStatus } from "../interfaces/iPlayers";
import Bser from "../services/Bser";

type Data = {
    gameStatus: string
}

export default async (userName: string): Promise<Data | ApiError> => {

    const database = new Nina().all('players', 'mmr');
    const bser = new Bser();

    const player: playerStatus = database.find((i: any) => i.nickname.toLowerCase() === userName.toLocaleLowerCase()) as playerStatus;

    if (!player) throw new ApiError(404, 'player.not.found');
    const gameStatus = await bser.playerStatus([player.userCode as string]) as string;

    return { gameStatus };
}