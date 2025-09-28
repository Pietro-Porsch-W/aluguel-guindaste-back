import { prisma } from '../src/services/prisma';

async function main() {
  console.log('Starting seed...')

  // Perfis
  const perfisData = [
    { id: '21d1ea39-f756-4ca3-9f18-4bfe8c95ae82', nome: 'Administrador', descricao: 'Acesso completo ao sistema' },
    { id: '28aba45d-4355-4c1f-aa42-4501e8098137', nome: 'Cliente', descricao: 'Acesso limitado para clientes' },
    { id: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', nome: 'Vendedor', descricao: 'Gestão de clientes e vendas' },
    { id: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', nome: 'Operador', descricao: 'Gestão de guindastes, locações e manutenções' },
    { id: 'db870d2c-c9d4-48a4-b7bd-a7e68ce35404', nome: 'ClientePortal', descricao: 'Acesso ao portal do cliente' },
  ]

  for (const p of perfisData) {
    console.log(`Upserting perfil: ${p.nome}`);
    await prisma.perfis.upsert({
      where: { id: p.id },
      update: { nome: p.nome, descricao: p.descricao },
      create: { id: p.id, nome: p.nome, descricao: p.descricao },
    })
  }

  // Permissoes
  const permissoesData = [
    { id: '01f5a6cb-9c4a-41fe-8465-cfafe283c646', nome: 'oferta:criar', descricao: 'Criar ofertas de venda' },
    { id: '04f6e406-18dc-40dc-a7ca-d94fbd9099b0', nome: 'manutencao:gerenciar', descricao: 'Gerenciar manutenções' },
    { id: '06dd12af-2cf6-4641-9f5b-7600900ee8f9', nome: 'cliente:visualizar_todos', descricao: 'Visualizar todos os clientes' },
    { id: '074cad9c-fe05-46f4-8326-c4296e15c5b4', nome: 'locacao:editar', descricao: 'Editar locações' },
    { id: '170be1a2-68bf-45f2-b509-4df5d1ae2696', nome: 'sistema:gerenciar_perfis', descricao: 'Gerenciar perfis de usuário' },
    { id: '3a2c59a6-c180-4281-a239-3e97dad42b2f', nome: 'locacao:criar', descricao: 'Criar novas locações' },
    { id: '3d92ab27-2347-45e3-9bcc-767779280179', nome: 'guindaste:visualizar_todos', descricao: 'Visualizar todos os guindastes' },
    { id: '46131104-ebe6-493a-a3d1-7f7eadf5c8ad', nome: 'cliente:criar', descricao: 'Criar novos clientes' },
    { id: '489e319b-c808-4078-9bc3-21b95874b853', nome: 'cliente:editar', descricao: 'Editar clientes' },
    { id: '4e7f5996-ed3e-479d-a8de-730b0c7d4461', nome: 'relatorio:visualizar', descricao: 'Acessar relatórios do sistema' },
    { id: '4ed89610-08ad-42cd-bba9-d70e6bf7486c', nome: 'usuario:criar', descricao: 'Criar novos usuários' },
    { id: '4f771c16-1fd3-4cbf-ad59-ff8159eb87cf', nome: 'manutencao:criar', descricao: 'Criar manutenções' },
    { id: '5537bc1a-516d-498b-a7fe-ca9f25af53ec', nome: 'manutencao:editar', descricao: 'Editar manutenções' },
    { id: '655b6e9c-47ee-4013-948d-a5dc68051c34', nome: 'usuario:visualizar_todos', descricao: 'Visualizar todos os usuários' },
    { id: '683bfa0b-53de-4758-af68-04607db8a97a', nome: 'guindaste:gerenciar_disponibilidade', descricao: 'Gerenciar disponibilidade de guindastes' },
    { id: '83bc7e85-e813-42f5-a212-e19a4d601cd9', nome: 'locacao:visualizar_todas', descricao: 'Visualizar todas as locações' },
    { id: '90bbd5ef-b069-46fa-8a42-1d439743a77a', nome: 'locacao:concluir', descricao: 'Concluir locações' },
    { id: '94d45ab3-7245-4bbb-a81c-22e33342710d', nome: 'guindaste:criar', descricao: 'Criar novos guindastes' },
    { id: '9da16062-dc25-4281-bd71-6db02038da35', nome: 'guindaste:editar', descricao: 'Editar guindastes' },
    { id: 'ae969f0c-ce9e-4c23-9625-5b267bb2d69c', nome: 'sistema:gerenciar_permissoes', descricao: 'Gerenciar permissões do sistema' },
    { id: 'b16fb7ec-8d0a-4c55-a249-7a6c66a5b47c', nome: 'oferta:visualizar_todas', descricao: 'Visualizar todas as ofertas' },
    { id: 'b291b1f5-f5cf-4c43-b4c0-56d3a46ba501', nome: 'oferta:gerenciar', descricao: 'Gerenciar ofertas de venda' },
    { id: 'b4873278-c901-490a-8b25-6b9da87392c2', nome: 'manutencao:visualizar_todas', descricao: 'Ver todas as manutenções' },
    { id: 'c0a30bee-d263-46cd-a4c4-37387d4402d2', nome: 'oferta:editar', descricao: 'Editar ofertas de venda' },
    { id: 'c0c15d57-9c97-4aad-ba7d-310bff3930ee', nome: 'manutencao:visualizar', descricao: 'Visualizar manutenções' },
    { id: 'c7027608-f987-436d-ab66-a05415b554de', nome: 'oferta:processar_venda', descricao: 'Processar vendas aceitas' },
    { id: 'd9f4ff45-2385-45fc-9572-acf77a4f7f6c', nome: 'usuario:editar', descricao: 'Editar usuários' }
  ]

  for (const perm of permissoesData) {
    console.log(`Upserting permissao: ${perm.nome}`);
    await prisma.permissao.upsert({
      where: { id: perm.id },
      update: { nome: perm.nome, descricao: perm.descricao },
      create: { id: perm.id, nome: perm.nome, descricao: perm.descricao },
    })
  }

  // Perfil-Permissoes
  const perfilPermissoes = [
    { perfilId: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', permissaoId: '3a2c59a6-c180-4281-a239-3e97dad42b2f' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: '489e319b-c808-4078-9bc3-21b95874b853' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: '4ed89610-08ad-42cd-bba9-d70e6bf7486c' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: 'c0c15d57-9c97-4aad-ba7d-310bff3930ee' },
    { perfilId: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', permissaoId: '489e319b-c808-4078-9bc3-21b95874b853' },
    { perfilId: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', permissaoId: '83bc7e85-e813-42f5-a212-e19a4d601cd9' },
    { perfilId: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', permissaoId: 'c7027608-f987-436d-ab66-a05415b554de' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: '83bc7e85-e813-42f5-a212-e19a4d601cd9' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: '9da16062-dc25-4281-bd71-6db02038da35' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: '170be1a2-68bf-45f2-b509-4df5d1ae2696' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: 'b16fb7ec-8d0a-4c55-a249-7a6c66a5b47c' },
    { perfilId: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', permissaoId: '46131104-ebe6-493a-a3d1-7f7eadf5c8ad' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: '94d45ab3-7245-4bbb-a81c-22e33342710d' },
    { perfilId: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', permissaoId: 'b16fb7ec-8d0a-4c55-a249-7a6c66a5b47c' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: 'c0a30bee-d263-46cd-a4c4-37387d4402d2' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: 'b4873278-c901-490a-8b25-6b9da87392c2' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: '655b6e9c-47ee-4013-948d-a5dc68051c34' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '4f771c16-1fd3-4cbf-ad59-ff8159eb87cf' },
    { perfilId: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', permissaoId: '06dd12af-2cf6-4641-9f5b-7600900ee8f9' },
    { perfilId: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', permissaoId: 'b291b1f5-f5cf-4c43-b4c0-56d3a46ba501' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: '5537bc1a-516d-498b-a7fe-ca9f25af53ec' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '9da16062-dc25-4281-bd71-6db02038da35' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '3d92ab27-2347-45e3-9bcc-767779280179' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '83bc7e85-e813-42f5-a212-e19a4d601cd9' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '04f6e406-18dc-40dc-a7ca-d94fbd9099b0' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '46131104-ebe6-493a-a3d1-7f7eadf5c8ad' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '489e319b-c808-4078-9bc3-21b95874b853' },
    { perfilId: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', permissaoId: '3d92ab27-2347-45e3-9bcc-767779280179' },
    { perfilId: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', permissaoId: '4e7f5996-ed3e-479d-a8de-730b0c7d4461' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: 'ae969f0c-ce9e-4c23-9625-5b267bb2d69c' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '94d45ab3-7245-4bbb-a81c-22e33342710d' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: '3d92ab27-2347-45e3-9bcc-767779280179' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: 'b16fb7ec-8d0a-4c55-a249-7a6c66a5b47c' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '04f6e406-18dc-40dc-a7ca-d94fbd9099b0' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: 'b4873278-c901-490a-8b25-6b9da87392c2' },
    { perfilId: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', permissaoId: '06dd12af-2cf6-4641-9f5b-7600900ee8f9' },
    { perfilId: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', permissaoId: 'b291b1f5-f5cf-4c43-b4c0-56d3a46ba501' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: '5537bc1a-516d-498b-a7fe-ca9f25af53ec' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '9da16062-dc25-4281-bd71-6db02038da35' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '3d92ab27-2347-45e3-9bcc-767779280179' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '83bc7e85-e813-42f5-a212-e19a4d601cd9' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '04f6e406-18dc-40dc-a7ca-d94fbd9099b0' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '46131104-ebe6-493a-a3d1-7f7eadf5c8ad' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '489e319b-c808-4078-9bc3-21b95874b853' },
    { perfilId: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', permissaoId: '3d92ab27-2347-45e3-9bcc-767779280179' },
    { perfilId: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', permissaoId: '4e7f5996-ed3e-479d-a8de-730b0c7d4461' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: 'ae969f0c-ce9e-4c23-9625-5b267bb2d69c' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '94d45ab3-7245-4bbb-a81c-22e33342710d' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: '3d92ab27-2347-45e3-9bcc-767779280179' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: 'b16fb7ec-8d0a-4c55-a249-7a6c66a5b47c' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '04f6e406-18dc-40dc-a7ca-d94fbd9099b0' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: 'b4873278-c901-490a-8b25-6b9da87392c2' },
    { perfilId: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', permissaoId: '06dd12af-2cf6-4641-9f5b-7600900ee8f9' },
    { perfilId: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', permissaoId: 'b291b1f5-f5cf-4c43-b4c0-56d3a46ba501' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: '5537bc1a-516d-498b-a7fe-ca9f25af53ec' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '9da16062-dc25-4281-bd71-6db02038da35' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '3d92ab27-2347-45e3-9bcc-767779280179' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '83bc7e85-e813-42f5-a212-e19a4d601cd9' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '04f6e406-18dc-40dc-a7ca-d94fbd9099b0' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: 'b4873278-c901-490a-8b25-6b9da87392c2' },
    { perfilId: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', permissaoId: '06dd12af-2cf6-4641-9f5b-7600900ee8f9' },
    { perfilId: '63c9dbdf-09fa-4abc-a4b2-b1d421f2fcfb', permissaoId: 'b291b1f5-f5cf-4c43-b4c0-56d3a46ba501' },
    { perfilId: '28aba45d-4355-4c1f-aa42-4501e8098137', permissaoId: '5537bc1a-516d-498b-a7fe-ca9f25af53ec' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '9da16062-dc25-4281-bd71-6db02038da35' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '3d92ab27-2347-45e3-9bcc-767779280179' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '83bc7e85-e813-42f5-a212-e19a4d601cd9' },
    { perfilId: '6b2a950a-5dd9-4d11-8fea-0b9d9f30667a', permissaoId: '04f6e406-18dc-40dc-a7ca-d94fbd9099b0' }
  ]

  for (const pp of perfilPermissoes) {
    console.log(`Linking perfil ${pp.perfilId} with permissao ${pp.permissaoId}`);
    // upsert relationship (we don't have a natural composite unique; use a generated id)
    const exists = await prisma.perfil_permissoes.findFirst({
      where: { perfilId: pp.perfilId, permissaoId: pp.permissaoId },
    })

    if (!exists) {
      await prisma.perfil_permissoes.create({ data: { perfilId: pp.perfilId, permissaoId: pp.permissaoId } })
    }
  }

  console.log('Seed finished')
}

main()
  .catch((e) => {
    console.error(e)
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
