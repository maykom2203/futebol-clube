import { Router } from 'express';
import Login from './LoginRoutes';

const router = Router();

router.use('/login', Login);

export default router;
