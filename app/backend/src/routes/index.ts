import { Router } from 'express';
import Login from './LoginRoutes';
import Teams from './TeamsRouter';
import Match from './MatchRouter';
import Leader from './LeaderRouter';

const router = Router();
router.use('/matches', Match);
router.use('/login', Login);
router.use('/teams', Teams);
router.use('/leaderboard', Leader);

export default router;
