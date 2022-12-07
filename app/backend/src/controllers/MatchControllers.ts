import { Request, Response } from 'express';
import ServiceMatche from '../services/MatchServices';

export default class MatcheController {
  constructor(private matchService = new ServiceMatche()) { }

  async getMatchesAll(_req: Request, res: Response): Promise<Response> {
    return res.status(200).json(await this.matchService.getMatchesAll());
  }
}
