import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderBoardServices';

export default class LeaderboardController {
  constructor(
    private matchService = new LeaderboardService(),
  ) {}

  async boardScoreHomeGet(_req: Request, res: Response): Promise<Response> {
    const result = await this.matchService.getClassificationBoard('home');
    result.sort((a, b) => b.totalPoints - a.totalPoints || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn);

    return res.status(200).json(result);
  }
}
