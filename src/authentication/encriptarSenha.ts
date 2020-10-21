import crypto from 'crypto';

export function encriptarSenha(senha: string, chave: string): string {
  return crypto.createHmac('sha256', chave)
               .update(senha)
               .digest('base64');
}