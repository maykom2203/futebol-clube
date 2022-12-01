import { Request, Response } from 'express';
import ServiceAcesso from '../services/UserServices';

export default class LoginController {
  constructor(
    private acessoService = new ServiceAcesso(),
  ) {}

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const acesso = await this.acessoService.login(email, password);

    return res.status(acesso.status).json({ token: acesso.message });
  }

  async getRol(req: Request, res: Response): Promise<Response> {
    const { email } = req.body.user;

    const role = await this.acessoService.getRol(email);
    return res.status(200).json({ role });
  }
}
