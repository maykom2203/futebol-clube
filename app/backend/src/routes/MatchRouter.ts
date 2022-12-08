import { Router } from 'express';
import ControllerMatchs from '../controllers/MatchControllers';

const matchController = new ControllerMatchs();
const matchsRouter = Router();

matchsRouter.get('/', (req, res) => matchController.getMatchesAll(req, res));
matchsRouter.post('/', (req, res) => matchController.NewMatchPosts(req, res));
matchsRouter.patch('/:id/finish', (req, res) => matchController.updateProgressMatch(req, res));

export default matchsRouter;
