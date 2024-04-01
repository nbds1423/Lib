import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    const { player } = req.query;
    if (!player) return res.status(404).json({ error: 'Player query not found.' });

    next();
}