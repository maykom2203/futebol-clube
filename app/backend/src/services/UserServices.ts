import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import { UrlError } from '../middlewares/ErrorUrlMiddleware ';
import LoginSecreto from '../utils/LoginSecreto';
import TokenGenerate from '../utils/Jwt';
import User from '../database/models/User';
import { ILogin } from '../database/interfaces/interLogin';

export default class LoginService extends LoginSecreto<ILogin> {
  constructor(private loginModel: ModelStatic<User> = User) {
    super();
  }

  static passValidetion(user: User | null, password: string): void {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UrlError('Incorrect email or password', 401);
    }
  }

  async login(email: string, password: string): Promise<{ status: number, message: string }> {
    const user = await this.loginModel.findOne({ where: { email } });

    LoginService.passValidetion(user, password);
    return { status: 200, message: TokenGenerate.generateToken(email) };
  }

  async getRol(email: string): Promise<string | undefined> {
    const UseRole = await this.loginModel.findOne({ where: { email } });

    if (UseRole) return UseRole.role;
  }
}
