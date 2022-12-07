import { ModelStatic } from 'sequelize';
import { iMatch } from '../database/interfaces/interMach';
import Match from '../database/models/Match';

export default class ServiceMatche {
  constructor(
    private modelMatch: ModelStatic<Match> = Match,
  ) { }

  async getMatchesAll(): Promise<iMatch[]> {
    const getMatches = await this.modelMatch.findAll({
      include: [
        { association: 'teamHome', as: 'teamHome', attributes: ['teamName'] },
        { association: 'teamAway', as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return getMatches;
  }

  async getProgressMatches(progress: string): Promise<iMatch[] | undefined> {
    const progresso = await this.modelMatch.findAll({
      where: { inProgress: progress === 'true' },
      include: [
        { association: 'teamHome', as: 'teamHome', attributes: ['teamName'] },
        { association: 'teamAway', as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return progresso;
  }

  async getFinishedMatches(): Promise<iMatch[]> {
    const Finisheds = await this.modelMatch.findAll({ where: { inProgress: false } });
    return Finisheds;
  }
}
