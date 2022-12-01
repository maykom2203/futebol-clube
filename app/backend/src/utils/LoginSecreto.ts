abstract class LoginSecreto<Secretokkk> {
  protected _username!: string;
  protected _secreto!: Secretokkk;

  get secreto(): Secretokkk {
    return this._secreto;
  }
}

export default LoginSecreto;
