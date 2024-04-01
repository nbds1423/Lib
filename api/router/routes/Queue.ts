import _, { Request, Response } from 'express';
import Route from '../../decorators/route';
import playerStatistics from '../../../erbs/src/controller/playerStatistics';
import playersStatus from '../../../erbs/src/controller/playersStatus';
import statusByPlayer from '../../../erbs/src/controller/statusByPlayer';
import ApiError from '../../../errors/ApIError';

export default class Queue {

    @Route('get', '/queue')
    static async statistics(req: Request, res: Response) {
        res.status(200).send({ data: await playerStatistics() });
    }

    @Route('get', '/players')
    static async playersStatus(req: Request, res: Response) {
        try {
            res.status(200).send({ data: playersStatus() });
        } catch (e: any) {
            res.status(e.code).send({ error: e.message });
        }
    }

    @Route('get', '/status')
    static async statusByPlayer(req: Request, res: Response) {
        try {
            res.status(200).send({ data: await statusByPlayer(req.query.player as string) });
        } catch (e: any) {
            res.status(e.code).send({ error: e.message })
        }
    }

}