import { Router } from 'express';
import LoginController from '../controllers/UserControllers';
import tokenValidation from '../middlewares/tokenValidation';
import loginValidation from '../middlewares/loginValidation';

const loginController = new LoginController();
const loginRouter = Router();

loginRouter.post('/', loginValidation, (req, res) => loginController.login(req, res));
loginRouter.get('/validate', tokenValidation, (req, res) => loginController.getRol(req, res));

export default loginRouter;
