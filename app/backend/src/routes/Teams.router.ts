import { Router } from 'express';
import ControllerTeams from '../controllers/TeamsContollers';

const teamsController = new ControllerTeams();
const teamsRouter = Router();

teamsRouter.get('/', (req, res) => teamsController.getTeamsAll(req, res));
teamsRouter.get('/:id', (req, res) => teamsController.getByIdTeam(req, res));

export default teamsRouter;
