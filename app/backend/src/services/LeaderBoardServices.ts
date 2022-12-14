import TeamsService from './TeamsServices';
import MatcheService from './MatchServices';
import { iMatch } from '../database/interfaces/interMach';
import { iLeaderBoard } from '../database/interfaces/interLeaderBoard';

export default class LeaderboardService {
  constructor(
    private matchesService = new MatcheService(),
    private teamService = new TeamsService(),
  ) { }

  async totalPlayGet(match: iMatch, play: string): Promise<iMatch[]> {
    const game = await this.matchesService.getFinishedMatches();

    const result = game.filter((partida) => {
      if (play !== 'home') {
        return partida.awayTeam === match.awayTeam;
      }
      return partida.homeTeam === match.homeTeam;
    });

    return result;
  }

  async nameGet(match: iMatch, play: string): Promise< undefined | string> {
    const { homeTeam, awayTeam } = match;
    const teams = await this.teamService.getByIdTeam(
      (play !== 'home') ? awayTeam : homeTeam,
    );

    return teams?.teamName;
  }

  async totalHomePointHome(match: iMatch, play: string): Promise<number> {
    const game = await this.totalPlayGet(match, play);
    let result = 0;
    game.forEach((partida) => {
      if (partida.homeTeamGoals > partida.awayTeamGoals) {
        result += 3;
      }
      if (partida.homeTeamGoals === partida.awayTeamGoals) {
        result += 1;
      }
    });
    return result;
  }

  async totalAwayPointHome(match: iMatch, play: string): Promise<number> {
    const game = await this.totalPlayGet(match, play);
    let result = 0;
    game.forEach((partida) => {
      if (partida.awayTeamGoals > partida.homeTeamGoals) {
        result += 3;
      }
      if (partida.awayTeamGoals === partida.homeTeamGoals) {
        result += 1;
      }
    });
    return result;
  }

  async totalPointsGet(match: iMatch, play: string) : Promise< number > {
    const totalHomePoint = this.totalHomePointHome(match, play);
    const totalAwayPoint = this.totalAwayPointHome(match, play);
    const result = (play === 'home') ? totalHomePoint : totalAwayPoint;
    return result;
  }

  async totalVictoriesGet(match: iMatch, play: string) :Promise <number> {
    const points = await this.totalPointsGet(match, play);
    return Math.trunc(points / 3);
  }

  async totalDrawsGet(match: iMatch, play: string): Promise<number> {
    const points = await this.totalPointsGet(match, play);
    const victories = await this.totalVictoriesGet(match, play);
    return points - (victories * 3);
  }

  async totalDefeatGet(match: iMatch, play: string): Promise<number> {
    const games = (await this.totalPlayGet(match, play)).length;
    const draws = await this.totalDrawsGet(match, play);
    const victories = await this.totalVictoriesGet(match, play);
    const defeat = games - victories - draws;
    return defeat;
  }

  async goalsOwnsGet(match: iMatch, play: string): Promise<number> {
    const games = await this.totalPlayGet(match, play);
    let homeGols = 0;

    games.forEach((partida) => {
      if (play === 'home') {
        homeGols += partida.homeTeamGoals;
      }
    });

    return homeGols;
  }

  async goalsAgainstGet(match: iMatch, play: string): Promise<number> {
    const games = await this.totalPlayGet(match, play);
    let awayGols = 0;

    games.forEach((partida) => {
      if (play === 'home') {
        awayGols += partida.awayTeamGoals;
      }
    });

    return awayGols;
  }

  async totalGolGet(match: iMatch, play: string): Promise<number> {
    const totalGol = await this.goalsOwnsGet(match, play) - await this.goalsAgainstGet(match, play);
    return totalGol;
  }

  async proportionGet(match: iMatch, play: string): Promise<string> {
    const points = await this.totalPointsGet(match, play);
    const games = (await this.totalPlayGet(match, play)).length;
    const totalProportion = (points / (games * 3)) * 100;
    return totalProportion.toFixed(2);
  }

  async getClassification(game: string): Promise<iLeaderBoard[]> {
    const matchesFinished = await this.matchesService.getFinishedMatches();
    return this.boardScoreGet(matchesFinished, game);
  }

  async getClassificationBoard(game: string): Promise<iLeaderBoard[]> {
    const home = await this.getClassification(game);
    const result = new Set();

    const classification = home.filter(({ name }) => {
      const duplica = result.has(name);
      result.add(name);
      return !duplica;
    });
    return classification;
  }

  async boardScoreGet(finished: iMatch[], play: string) {
    const boardClassification: iLeaderBoard[] = [];

    await Promise.all(finished.map(async (match) => {
      const objeto = {
        name: await this.nameGet(match, play),
        totalPoints: await this.totalPointsGet(match, play),
        totalGames: (await this.totalPlayGet(match, play)).length,
        totalVictories: await this.totalVictoriesGet(match, play),
        totalDraws: await this.totalDrawsGet(match, play),
        totalLosses: await this.totalDefeatGet(match, play),
        goalsFavor: await this.goalsOwnsGet(match, play),
        goalsOwn: await this.goalsAgainstGet(match, play),
        goalsBalance: await this.totalGolGet(match, play),
        efficiency: await this.proportionGet(match, play),
      };

      boardClassification.push(objeto as iLeaderBoard);
    }));
    return boardClassification;
  }
}
