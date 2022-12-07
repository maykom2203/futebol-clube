import { Router } from 'express';
import Login from './LoginRoutes';
import Teams from './Teams.router';

const router = Router();

router.use('/login', Login);
router.use('/teams', Teams);
export default router;
