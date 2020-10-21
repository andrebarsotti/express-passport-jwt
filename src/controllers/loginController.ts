import { Request, Response } from 'express';
import { encriptarSenha } from '../authentication/encriptarSenha';
import { UsuarioRepository } from '../repositories/usuario-repository';
import jwt from 'jwt-simple';
import { env } from 'process';
import { Logger } from 'tslog';

 const jwtSecret: string = env['JwtSecret'] || '';
 const logger = new Logger();

export function loginController(req: Request, res: Response ): void  {
  const repo = new UsuarioRepository();
  logger.debug('Iniciando validação do usuário');
  
  if (req.body.userName && req.body.password) {
  
    logger.debug(`Buscando usuário ${req.body.userName}...`);
    const usuario = repo.obterUsuarioPorUserId(req.body.userName);

    if (usuario) {
      
      logger.debug(`Validando a senha do usuário...`);
      const senha = encriptarSenha(req.body.password, usuario.chave);
      
      if (senha === usuario.senha) {
        logger.debug('Usuário encontrado...');
        const payLoad = {
          id: usuario.id,
          userName: usuario.userId,
          fullName: usuario.name
        };
      
        logger.debug('Gerando token com a secret');
        const token = jwt.encode(payLoad, jwtSecret);
        res.json({ token });
        return;
      }
    }
  }
  logger.warn('Usuário inválido.');
  res.sendStatus(401);
}