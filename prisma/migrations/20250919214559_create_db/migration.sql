-- CreateEnum
CREATE TYPE "public"."TipoCliente" AS ENUM ('PESSOA_FISICA', 'PESSOA_JURIDICA');

-- CreateEnum
CREATE TYPE "public"."TipoGuindaste" AS ENUM ('MOVEL', 'FIXO', 'SOBRE_ESTEIRAS', 'TRELICADO', 'PORTICO', 'PONTE_ROLANTE');

-- CreateEnum
CREATE TYPE "public"."StatusGuindaste" AS ENUM ('DISPONIVEL', 'ALUGADO', 'EM_MANUTENCAO', 'VENDIDO');

-- CreateEnum
CREATE TYPE "public"."StatusLocacao" AS ENUM ('PENDENTE', 'ATIVA', 'CONCLUIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "public"."StatusManutencao" AS ENUM ('AGENDADA', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "public"."StatusOferta" AS ENUM ('PENDENTE', 'ACEITA', 'REJEITADA', 'EXPIRADA');

-- CreateTable
CREATE TABLE "public"."usuarios" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "id_perfil" TEXT,
    "senha_hash" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_atualizacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."perfis" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "perfis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."permissao" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "dt_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permissao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."perfil_permissoes" (
    "id" TEXT NOT NULL,
    "perfilId" TEXT NOT NULL,
    "permissaoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "perfil_permissoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."clientes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo_cliente" "public"."TipoCliente" NOT NULL,
    "documento" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "dt_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "usuarioId" TEXT,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."guindastes" (
    "id" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "capacidade_toneladas" DECIMAL(65,30) NOT NULL,
    "altura_maxima_metros" DECIMAL(65,30) NOT NULL,
    "alcance_maximo_metros" DECIMAL(65,30) NOT NULL,
    "tipo_guindaste" "public"."TipoGuindaste" NOT NULL,
    "ano_fabricacao" INTEGER NOT NULL,
    "numero_serie" TEXT NOT NULL,
    "localizacao_atual" TEXT NOT NULL,
    "disponivel_para_aluguel" BOOLEAN NOT NULL DEFAULT true,
    "disponivel_para_venda" BOOLEAN NOT NULL DEFAULT false,
    "valor_diaria" DECIMAL(65,30),
    "valor_hora_extra" DECIMAL(65,30),
    "valor_venda" DECIMAL(65,30),
    "data_ultima_manutencao" TIMESTAMP(3),
    "status" "public"."StatusGuindaste" NOT NULL DEFAULT 'DISPONIVEL',
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guindastes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."locacoes" (
    "id" TEXT NOT NULL,
    "id_cliente" TEXT NOT NULL,
    "id_guindaste" TEXT NOT NULL,
    "dt_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim_prevista" TIMESTAMP(3) NOT NULL,
    "data_fim_real" TIMESTAMP(3),
    "valor_total_previsto" DECIMAL(65,30) NOT NULL,
    "valor_total_final" DECIMAL(65,30),
    "status_locacao" "public"."StatusLocacao" NOT NULL DEFAULT 'PENDENTE',
    "observacoes" TEXT,
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "locacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."manutencoes" (
    "id" TEXT NOT NULL,
    "id_guindaste" TEXT NOT NULL,
    "data_inicio_manutencao" TIMESTAMP(3) NOT NULL,
    "data_fim_manutencao" TIMESTAMP(3),
    "descricao" TEXT NOT NULL,
    "custo" DECIMAL(65,30) NOT NULL,
    "realizada_por" TEXT NOT NULL,
    "status_manutencao" "public"."StatusManutencao" NOT NULL DEFAULT 'AGENDADA',
    "dt_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "manutencoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ofertas_venda" (
    "id" TEXT NOT NULL,
    "id_cliente" TEXT,
    "id_guindaste" TEXT NOT NULL,
    "data_oferta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_validade" TIMESTAMP(3) NOT NULL,
    "valor_ofertado" DECIMAL(65,30) NOT NULL,
    "status_oferta" "public"."StatusOferta" NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ofertas_venda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."usuarios" ADD CONSTRAINT "usuarios_id_perfil_fkey" FOREIGN KEY ("id_perfil") REFERENCES "public"."perfis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."perfil_permissoes" ADD CONSTRAINT "perfil_permissoes_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "public"."perfis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."perfil_permissoes" ADD CONSTRAINT "perfil_permissoes_permissaoId_fkey" FOREIGN KEY ("permissaoId") REFERENCES "public"."permissao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."clientes" ADD CONSTRAINT "clientes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locacoes" ADD CONSTRAINT "locacoes_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "public"."clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."locacoes" ADD CONSTRAINT "locacoes_id_guindaste_fkey" FOREIGN KEY ("id_guindaste") REFERENCES "public"."guindastes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."manutencoes" ADD CONSTRAINT "manutencoes_id_guindaste_fkey" FOREIGN KEY ("id_guindaste") REFERENCES "public"."guindastes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ofertas_venda" ADD CONSTRAINT "ofertas_venda_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "public"."clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ofertas_venda" ADD CONSTRAINT "ofertas_venda_id_guindaste_fkey" FOREIGN KEY ("id_guindaste") REFERENCES "public"."guindastes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
