import { ModelStatic } from 'sequelize';
import Team from '../database/models/Team';
import { iTeams } from '../database/interfaces/InterTeam';

export default class ServicesTeams {
  constructor(
    private modelTem: ModelStatic<Team> = Team,
  ) {}

  async getTeamsAll(): Promise<iTeams[]> {
    const getTeams = this.modelTem.findAll();
    return getTeams;
  }

  async getByIdTeam(id: number): Promise<iTeams | null> {
    const getTeam = await this.modelTem.findByPk(id);
    return getTeam;
  }
}
