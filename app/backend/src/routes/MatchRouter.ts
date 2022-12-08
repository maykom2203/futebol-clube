import { Router } from 'express';
import ControllerMatchs from '../controllers/MatchControllers';
import tokenValidetion from '../middlewares/tokenValidation';

const matchController = new ControllerMatchs();
const matchsRouter = Router();

matchsRouter.get('/', (req, res) => matchController.getMatchesAll(req, res));
matchsRouter.post('/', tokenValidetion, (req, res) => matchController.NewMatchPosts(req, res));
matchsRouter.patch('/:id/finish', (req, res) => matchController.updateProgressMatch(req, res));

export default matchsRouter;
