import { Request, Response } from 'express';
import ServicesTeams from '../services/TeamsServices';

export default class ControllerTeams {
  constructor(private teamsService = new ServicesTeams()) {}

  async getTeamsAll(_req: Request, res: Response): Promise<Response> {
    return res.status(200).json(await this.teamsService.getTeamsAll());
  }

  async getByIdTeam(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    return res.status(200).json(await this.teamsService.getByIdTeam(+id));
  }
}
