import { Router } from 'express';
import Login from './LoginRoutes';
import Teams from './TeamsRouter';
import Match from './MatchRouter';

const router = Router();
router.use('/matches', Match);
router.use('/login', Login);
router.use('/teams', Teams);
export default router;
