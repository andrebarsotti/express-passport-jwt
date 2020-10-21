import { Handler } from 'express';
import passport from 'passport';
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback } from "passport-jwt";
import { env } from 'process';
import { Logger } from 'tslog';
import { UsuarioRepository } from '../repositories/usuario-repository';

export class Auth {
  private log = new Logger();
  private params: StrategyOptions = {
    secretOrKey: env['JwtSecret'] || '',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }
  private repo = new UsuarioRepository();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private strategy = new Strategy(this.params, (payload: any, done: VerifiedCallback) => {
    this.log.debug(`Validando o usuário ${payload.userName}`)
    const usuario = this.repo.obterUsuarioPorUserId(payload.userName);
    if (usuario) 
      return done(null, payload);
    else
      return done(new Error('User not found'), null);
  });

  constructor() {
    passport.use(this.strategy);
  }

  initialize(): Handler {
    return passport.initialize();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authenticate(): any {
    return passport.authenticate("jwt", { session: false });
  }
}
