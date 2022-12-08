import { Request, Response } from 'express';
import ServiceMatche from '../services/MatchServices';

export default class MatcheController {
  constructor(private matchService = new ServiceMatche()) { }

  async getMatchesAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      const filter = await this.matchService.getMatchesAll();
      return res.status(200).json(filter);
    }
    const filter = await this.matchService
      .getProgressMatches(inProgress as string);

    return res.status(200).json(filter);
  }

  async NewMatchPosts(req: Request, res: Response): Promise<Response> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    const id = await this.matchService
      .NewMatchPost(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    const fields = {
      id,
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    };

    return res.status(201).json(fields);
  }
}
