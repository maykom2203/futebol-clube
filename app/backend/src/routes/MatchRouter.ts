import { Router } from 'express';
import ControllerMatchs from '../controllers/MatchControllers';

const matchController = new ControllerMatchs();
const matchsRouter = Router();

matchsRouter.get('/', (req, res) => matchController.getMatchesAll(req, res));

export default matchsRouter;
