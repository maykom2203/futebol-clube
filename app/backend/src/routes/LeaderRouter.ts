import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderBoardController';

const LeaderController = new LeaderboardController();
const routerLeaderController = Router();

routerLeaderController.get('/home', (req, res) => LeaderController.boardScoreHomeGet(req, res));

export default routerLeaderController;
