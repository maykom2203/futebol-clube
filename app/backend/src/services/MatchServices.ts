import { ModelStatic } from 'sequelize';
import { iMatch } from '../database/interfaces/interMach';
import { UrlError } from '../middlewares/ErrorUrlMiddleware ';

import Match from '../database/models/Match';
import ServicesTeams from './TeamsServices';

export default class ServiceMatche {
  constructor(
    private modelMatch: ModelStatic<Match> = Match,
    private matchServiceTems = new ServicesTeams(),
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

  async NewMatchPost(homeTeam:string, awayTeam:string, homeTeamGoals:string, awayTeamGoals:string)
    : Promise<iMatch> {
    const home = await this.matchServiceTems.getByIdTeam(+homeTeam);
    const outside = await this.matchServiceTems.getByIdTeam(+awayTeam);
    if (!home || !outside) throw new UrlError('There is no team with such id!', 404);

    const fields = {
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    };

    const matchNew = await this.modelMatch.create(fields);

    return matchNew.dataValues.id;
  }

  async updateProgressMatch(id: string): Promise<void> {
    await this.modelMatch.update({ inProgress: false }, { where: { id } });
  }
}
