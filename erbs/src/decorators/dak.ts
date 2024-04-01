import getGameStatus from "../routine/getGameStatus";
import getUserCode from "../routine/getUserCode";
import Dak from "../services/Dak"

export default () => {
  const dak = new Dak({ serverName: 'SAOPAULO', teamMode: 'SQUAD' });
  return (target: any) => {
    setInterval(async () => {
      await dak.getPlayers()
      await getUserCode();
      await getGameStatus();
    }, 10 * 60000)
    setTimeout(async () => await getGameStatus());
  }
}
