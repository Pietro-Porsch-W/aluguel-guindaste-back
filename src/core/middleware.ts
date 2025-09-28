import { getEmpresaSessao, getUsuarioSessao } from './session';
import { Request, Response, NextFunction } from 'express';

function responderNaoAutorizado(res: Response) {
  res.status(401).json({ mensagem: 'Usuário ou empresa não encontrados.' });
}

function extrairDadosAutenticacao(req: Request) {
  const cabecalhoAutorizacao = req.headers['authorization'] as string | undefined;
  if (!cabecalhoAutorizacao) return null;

  const [_, usuarioId, empresaId] = cabecalhoAutorizacao.split(' ');
  return { usuarioId, empresaId };
}

export const acessoToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dataFormatada = new Date().toISOString().slice(0, 19);
    const dadosAutenticacao = extrairDadosAutenticacao(req);

    console.log(dadosAutenticacao);

    if (!dadosAutenticacao || !dadosAutenticacao.usuarioId) {
      return responderNaoAutorizado(res);
    }

    const dadoUsuario: any = await getUsuarioSessao(dadosAutenticacao.usuarioId);

  (req as any)['usuarioId'] = dadoUsuario.id;
  (req as any)['usuarioNome'] = dadoUsuario.ds_name;

    if (
      dadosAutenticacao &&
      dadosAutenticacao.empresaId &&
      dadosAutenticacao.empresaId !== 'undefined'
    ) {
  (req as any)['empresaId'] = await getEmpresaSessao(dadosAutenticacao.empresaId);
    }

    console.log(
      `${dataFormatada} | ${dadoUsuario.ds_name} | ${req.originalUrl}`
    );

    next();
  } catch (error) {
    console.log(error);
    responderNaoAutorizado(res);
  }
};
