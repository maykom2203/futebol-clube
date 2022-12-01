import * as sinon from "sinon";
import * as chai from "chai";
import * as jsonwebtoken from "jsonwebtoken";
// @ts-ignore
import chaiHttp = require("chai-http");
import App from "../app";


chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe("Verificação da8 url /login", () => {
  afterEach(() => {
    sinon.restore();
  });

  const loginRouter = "/login"
  const validationRouter = "/login/validate"

  const fakeLogin = {
    email: "admin@admin.com",
    password: "adm",
  };

  const emailFalso = {
    email: "xablau@xablau.com",
    password: "adm",
  };

  const senhaFalso = {
    email: "admin@admin.com",
    password: "xablau",
  };


 
    it("teste se é possivel logar sem o email", async () => {
      const { email } = fakeLogin;
      const response = await chai
        .request(app)
        .post(loginRouter)
        .send({ email: email });

      expect(response.body).to.be.deep.equal({message: "All fields must be filled"});

      it("teste se é possivel logar sem o password", async () => {
        const { password } = fakeLogin;
        const response = await chai
          .request(app)
          .post(loginRouter)
          .send({ password: password });

        expect(response.body).to.be.deep.equal({message: "All fields must be filled"});
      });
  

    it("test se possivel logar com qualquer email valido que não esteja no banco", async () => {
      const response = await chai
        .request(app)
        .post(loginRouter)
        .send(emailFalso);

      expect(response.body).to.be.deep.equal({message: "Incorrect email or password"});
    });

    it("test se possivel logar com qualquer senha que não esteja no banco", async () => {
      const response = await chai
        .request(app)
        .post(loginRouter)
        .send(senhaFalso);
      expect(response.body).to.be.deep.equal({
        message: "Incorrect email or password",
      });
    });

  });
 
    it("test se o usuario tem autorização", async () => {
      sinon.stub(jsonwebtoken, "verify").resolves();
      const response = await chai
        .request(app)
        .get(validationRouter)
        .set("authorization", "");

      expect(response.body).to.be.deep.equal({ message: "Token not found" });
    });
 
  });

