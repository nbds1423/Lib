import express from 'express';
import Queue from './routes/Queue';
import checkQuery from '../middleware/checkQuery';

const router = express();
router.use('/', Queue.statistics);
router.use('/', Queue.playersStatus);
router.use('/', checkQuery, Queue.statusByPlayer);

export default router;