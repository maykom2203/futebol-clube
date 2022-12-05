import * as chai from 'chai';
import * as sinon from 'sinon';
import * as bcrypt from 'bcryptjs';
import * as jsonwebtoken from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { mockUser, mockHeader } from './mocks/mockUser';

import App from '../app';
import User from '../database/models/User';


chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;



describe("Verificação da url /login", () => {
  afterEach(() => {
    sinon.restore();
  });

  const loginRouter = "/login"
  const validationRouter = "/login/validate"

  const fakeLogin = {
    "email": "admin@admin.com",
    "password": "secret_admin",
  };

  const emailFalso = {
    "email": "xablauxablau.com",
    "password": "adm",
  };


  const senhaFalso = {
    "email": "admin@admin.com",
    "password": "xablau",
  };

  const headerFake = {
    "Authorization": 'iJcwILtODDKuL5HWVFp9nReiK1u_HvYn6iyuFNd2LkQ'
  }

  it('Login com senha ok', async () => {
    sinon.stub(User, 'findOne').resolves(mockUser as User);
    sinon.stub(bcrypt, 'compareSync').returns(true);

    const response = await chai
      .request(app)
      .post( loginRouter)
      .send(fakeLogin)

    expect(response.status).to.be.equal(200);
  });

  it("teste se é possivel logar sem o email", async () => {
    const response = await chai
    .request(app)
    .post(loginRouter)
    .send(emailFalso)

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal({message: 'Incorrect email or password',});
  });

   it("teste se é possivel logar sem o password", async () => {
        sinon.stub(User, 'findOne')
        .resolves(mockUser as User);
        sinon.stub(bcrypt, 'compareSync')
        .returns(false);
  
        const response = await chai
          .request(app)
          .post(loginRouter)
          .send(senhaFalso)

        expect(response.status).to.be.equal(401);
        expect(response.body).to.deep.equal({message: 'Incorrect email or password',});
      });
  

    it("teste se possivel logar com qualquer email valido que não esteja no banco", async () => {
      const response = await chai
        .request(app)
        .post(loginRouter)
        .send(emailFalso);

      expect(response.body).to.be.deep.equal({message: "Incorrect email or password"});
    });

    it("teste se possivel logar com qualquer senha que não esteja no banco", async () => {
      const response = await chai
        .request(app)
        .post(loginRouter)
        .send(senhaFalso);
      expect(response.body).to.be.deep.equal({
        message: "Incorrect email or password",
      });
    });
 
    it("teste se o usuario tem autorização", async () => {
      sinon.stub(jsonwebtoken, "verify").resolves();
      const response = await chai
        .request(app)
        .get(validationRouter)
        .set({});

      expect(response.body).to.be.deep.equal({ message: "Token not found" });
    });

    it('Testa se falha ao tentar fazer uma requisição com um token inválido', async () => {
       
    
          const response = await chai.request(app)
          .get(validationRouter)
          .set(headerFake)
    
          expect(response.status).to.be.equal(401);
          expect(response.body).to.deep.equal({ message: 'Token must be a valid token' });
        })

   it('Testa se Token é Valido', async () => {

              sinon.stub(jsonwebtoken, 'verify')
              .resolves({ id: 1 });
              sinon.stub(User, 'findOne')
              .resolves(mockUser as User);
        
              const response = await chai.request(app)
              .get(validationRouter)
              .set(mockHeader)
        
              expect(response.status).to.be.equal(200);
              expect(response.body).to.deep.equal({ role: 'Admin' });
            })


  });

