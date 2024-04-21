import Nina from "../../../database/Nina";
import _, { playerStatus } from "../interfaces/iPlayers";

type serverName = 'SEOUL' | 'ASIA2' | 'OHIO' | 'FRANKURT' | 'SAOPAULO' | 'GLOBAL';

interface Statistics {
    playersGameStatus: { [key: string]: number };
    playersInQueue: { [key: string]: number };
    tier: { [key: (number | string)]: any[] };
    playersOnline: number;
    region: serverName;
}

export default async (): Promise<Statistics> => {

    const statistics: Statistics = {
        playersOnline: 0,
        region: 'SAOPAULO',
        playersGameStatus: {
            MatchCompleted: 0,
            InGame: 0,
            InMatching: 0,
            InCheckResult: 0,
            InLobby: 0,
            AwayFromKeyboardLobby: 0,
            InPracticeGame: 0,
            InCustomLobby: 0,
            InCustomGame: 0,
            InCobalt: 0,
            Invisible: 0

        },
        playersInQueue: {
            Low: 0,
            Middle: 0,
            High: 0
        },
        tier: {
            Low: [],
            Middle: [],
            High: []
        },
    }

    const allPlayers = Nina.all('players', 'mmr');
    const lastGame = Nina.all('lastGame');

    const players: playerStatus[] = allPlayers.filter((i: any) => i.gameStatus.toLowerCase() !== 'offline') as playerStatus[];

    if (!players.length) return statistics;

    const lastId = players.length > 1 ? players.length - 1 : 0;

    statistics.tier.Low = formatElo(players[lastId].mmr, players[lastId].rank);
    statistics.tier.Middle = rankedMiddle(players);
    statistics.tier.High = formatElo(players[0].mmr, players[0].rank);

    statistics.playersOnline = players.length;

    players.forEach((i: any) => statistics.playersGameStatus[i.gameStatus]++);
    lastGame.forEach((i: any) => statistics.playersInQueue[i.ranked]++);

    return statistics;
}

function rankedMiddle(players: playerStatus[]): (number | string)[] {
    const mmrs = players.map(player => player.mmr);
    const sumMMR = mmrs.reduce((total, mmr) => total + mmr, 0);
    const averageMMR = sumMMR / mmrs.length;

    return formatElo(Math.round(averageMMR));
}

function formatElo(mmr: number, rank: number = 0): (number | string)[] {
    let elo: string = "";
    if (mmr > 0 && mmr < 1000) {
        elo = "Ferro";
    } else if (mmr >= 1000 && mmr < 2000) {
        elo = "Bronze";
    } else if (mmr >= 2000 && mmr < 3000) {
        elo = "Prata";
    } else if (mmr >= 3000 && mmr < 4000) {
        elo = "Ouro";
    } else if (mmr >= 4000 && mmr < 5000) {
        elo = "Platina";
    } else if (mmr >= 5000 && mmr < 6200) {
        elo = "Diamante";
    } else if (mmr >= 6200 && rank > 700) {
        elo = "Mythril";
    } else if (rank >= 201 && rank <= 700) {
        elo = "Titan";
    } else if (rank <= 200) {
        elo = "Immortal";
    } else {
        elo = "No Elo";
    }

    return [mmr, elo]
}
