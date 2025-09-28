import { prisma } from './prisma';

export const estatisticasGerais = async () => {
  const totalGuindastes = await prisma.guindastes.count();
  const guindastesDisponiveis = await prisma.guindastes.count({ where: { status: 'DISPONIVEL' } });
  const guindastesAlugados = await prisma.guindastes.count({ where: { status: 'ALUGADO' } });
  const guindastesManutencao = await prisma.guindastes.count({ where: { status: 'EM_MANUTENCAO' } });

  const totalClientes = await prisma.clientes.count();
  const clientesAtivos = await prisma.clientes.count({ where: { ativo: true } });

  const locacoesAtivas = await prisma.locacoes.count({ where: { status_locacao: 'ATIVA' } });

  // Receita mensal/ano: soma de valor_total_final ou valor_total_previsto quando final null
  const agora = new Date();
  const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
  const inicioAno = new Date(agora.getFullYear(), 0, 1);

  const somaReceita = async (start: Date, end?: Date) => {
    const where: any = {
      AND: [
        { status_locacao: { in: ['CONCLUIDA', 'ATIVA'] } },
        { dt_created: { gte: start } },
      ],
    };
    if (end) where.AND.push({ dt_created: { lte: end } });

    const locs = await prisma.locacoes.findMany({ where, select: { valor_total_final: true, valor_total_previsto: true } });

    return locs.reduce((acc: number, l: any) => {
      const toNumber = (v: any) => {
        if (v == null) return undefined;
        if (typeof v === 'object' && typeof v.toNumber === 'function') return v.toNumber();
        return Number(v);
      };
      const finalVal = toNumber(l.valor_total_final);
      const prevVal = toNumber(l.valor_total_previsto);
      return acc + (finalVal ?? prevVal ?? 0);
    }, 0);
  };

  const receitaMensal = await somaReceita(inicioMes, new Date());
  const receitaAnual = await somaReceita(inicioAno, new Date());

  const _manutencoesAgg = await prisma.manutencoes.aggregate({
    _sum: { custo: true },
    where: {
      status_manutencao: 'CONCLUIDA',
      data_inicio_manutencao: {
        gte: inicioMes,
        lte: new Date(),
      },
    },
  });

  const custoManutencaoMensal = (() => {
    const v: any = _manutencoesAgg._sum?.custo;
    if (v == null) return 0;
    if (typeof v === 'object' && typeof v.toNumber === 'function') return v.toNumber();
    return Number(v);
  })();

  return {
    totalGuindastes,
    guindastesDisponiveis,
    guindastesAlugados,
    guindastesManutencao,
    totalClientes,
    clientesAtivos,
    locacoesAtivas,
    receitaMensal,
    receitaAnual,
    custoManutencaoMensal,
  };
};

export const utilizacaoGuindastes = async (start: Date, end: Date) => {
  const locacoes = await prisma.locacoes.findMany({
    where: {
      dt_inicio: { gte: start, lte: end },
      status_locacao: { in: ['ATIVA', 'CONCLUIDA'] },
    },
    select: {
      id_guindaste: true,
      dt_inicio: true,
      data_fim_prevista: true,
      data_fim_real: true,
      valor_total_final: true,
      valor_total_previsto: true,
      guindaste: { select: { modelo: true } },
    },
  });

  const map = new Map<string, any>();

  locacoes.forEach((l: any) => {
    const id = l.id_guindaste as string;
    const modelo = l.guindaste?.modelo ?? 'Modelo não encontrado';
    if (!map.has(id)) map.set(id, { id_guindaste: id, modelo, dias_alugado: 0, receita_total: 0, total_locacoes: 0 });
    const cur = map.get(id);
    const inicio = new Date(l.data_inicio);
    const fim = new Date(l.data_fim_real ?? l.data_fim_prevista);
    const dias = Math.ceil((fim.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
    cur.dias_alugado += dias;
    cur.receita_total += l.valor_total_final ?? l.valor_total_previsto ?? 0;
    cur.total_locacoes += 1;
  });

  const diasPeriodo = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  return Array.from(map.values()).map((u: any) => ({ ...u, taxa_ocupacao: (u.dias_alugado / diasPeriodo) * 100 }));
};

export const faturamentoPorPeriodo = async (start: Date, end: Date) => {
  // buscar locacoes concluidas no range
  const locacoes = await prisma.locacoes.findMany({
    where: { dt_created: { gte: start, lte: end }, status_locacao: 'CONCLUIDA' },
    select: { dt_created: true, valor_total_final: true, valor_total_previsto: true },
  });

  const vendas = await prisma.ofertas_venda.findMany({
    where: { createdAt: { gte: start, lte: end }, status_oferta: 'ACEITA' },
    select: { createdAt: true, valor_ofertado: true },
  });

  const manutencoes = await prisma.manutencoes.findMany({
    where: { dt_created: { gte: start, lte: end }, status_manutencao: 'CONCLUIDA' },
    select: { dt_created: true, custo: true },
  });

  const map = new Map<string, any>();

  const toMes = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

  locacoes.forEach((l: any) => {
    const mes = toMes(new Date(l.dt_created));
    if (!map.has(mes)) map.set(mes, { periodo: mes, receita_locacoes: 0, receita_vendas: 0, custo_manutencoes: 0, lucro_liquido: 0 });
    const r = map.get(mes);
    r.receita_locacoes += l.valor_total_final ?? l.valor_total_previsto ?? 0;
  });

  vendas.forEach((v: any) => {
    const mes = toMes(new Date(v.dt_created));
    if (!map.has(mes)) map.set(mes, { periodo: mes, receita_locacoes: 0, receita_vendas: 0, custo_manutencoes: 0, lucro_liquido: 0 });
    const r = map.get(mes);
    r.receita_vendas += v.valor_ofertado ?? 0;
  });

  manutencoes.forEach((m: any) => {
    const mes = toMes(new Date(m.dt_created));
    if (!map.has(mes)) map.set(mes, { periodo: mes, receita_locacoes: 0, receita_vendas: 0, custo_manutencoes: 0, lucro_liquido: 0 });
    const r = map.get(mes);
    r.custo_manutencoes += m.custo ?? 0;
  });

  const resultado = Array.from(map.values()).map((r: any) => ({ ...r, lucro_liquido: r.receita_locacoes + r.receita_vendas - r.custo_manutencoes }));

  return resultado.sort((a: any, b: any) => a.periodo.localeCompare(b.periodo));
};

export const clientesTop = async (start: Date, end: Date) => {
  const locacoes = await prisma.locacoes.findMany({
    where: { dt_created: { gte: start, lte: end }, status_locacao: { in: ['ATIVA', 'CONCLUIDA'] } },
    select: {
      id_cliente: true,
      dt_inicio: true,
      data_fim_prevista: true,
      data_fim_real: true,
      valor_total_final: true,
      valor_total_previsto: true,
      cliente: { select: { nome: true } },
    },
  });

  const map = new Map<string, any>();

  locacoes.forEach((l: any) => {
    const id = l.id_cliente as string;
    const nome = l.cliente?.nome ?? 'Cliente não encontrado';
    if (!map.has(id)) map.set(id, { id_cliente: id, nome, total_locacoes: 0, valor_total: 0, dias_aluguel: 0 });
    const c = map.get(id);
    const inicio = new Date(l.data_inicio);
    const fim = new Date(l.data_fim_real ?? l.data_fim_prevista);
    const dias = Math.ceil((fim.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
    c.total_locacoes += 1;
    c.valor_total += l.valor_total_final ?? l.valor_total_previsto ?? 0;
    c.dias_aluguel += dias;
  });

  return Array.from(map.values()).sort((a: any, b: any) => b.valor_total - a.valor_total).slice(0, 10);
};
