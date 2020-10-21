import { Request, Response } from 'express'
import { UsuarioRepository } from '../repositories/usuario-repository'

export function ListarProfilesController(req: Request, res: Response ): void  {
  const repo = new UsuarioRepository();
  res.send(repo.listarUsuarios());
}