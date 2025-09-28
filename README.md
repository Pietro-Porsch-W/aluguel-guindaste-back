# Aluguel de Guindaste — Backend (API)

Backend em **Node + Express + TypeScript** com **Prisma (PostgreSQL)** e autenticação via **JWT/JWKS (Supabase)**.

## Integrantes:

* Leonardo Mateus Bortoluzzi Thums
* Pietro Porsch Wilhelms
* Rafael Luan Schmitz
* Samuel Fernando Bortoluzzi Thums

---

## Stack / libs principais

* **Node.js 18+**
* **Express**
* **TypeScript**
* **Prisma** (PostgreSQL)
* **JWT** com verificação via **JWKS** (descoberto pelo `SUPABASE_URL`)

---

## Estrutura (resumo)

```
/
├─ api/                # (opcional, p/ Vercel serverless)
├─ prisma/             # schema.prisma, migrations, seed
├─ src/
│  ├─ controllers/     # lógica por recurso
│  ├─ core/            # auth/JWKS, middlewares, utils
│  ├─ routes/          # rotas Express
│  ├─ services/        # regras de negócio
│  └─ types/           # tipos TS
├─ package.json
└─ .env                # variáveis (local)
```

---

## Variáveis de ambiente

Crie um `.env` na raiz com, no mínimo:

```
DATABASE=postgresql://user:pass@host:5432/dbname
SUPABASE_URL=https://seu-projeto.supabase.co
# opcional: sobrescrever JWKS
# SUPABASE_JWKS_URL=https://seu-projeto.supabase.co/.well-known/jwks.json
```

> O middleware descobre o JWKS em `<SUPABASE_URL>/.well-known/jwks.json` e valida tokens RS256.
> O Prisma usa **`DATABASE`** como string de conexão.

---

## Como rodar local (do zero)

1. **Clonar e instalar**

```bash
git clone <url-do-repo>
cd crane-hire-ai-back
npm install
```

2. **Prisma**

```bash
npm i -D prisma
npm i @prisma/client 
npx prisma generate
```

3. **Subir**

```bash
npm run dev
```

Servidor sobe em `http://localhost:3000` (ajuste conforme seu `server.ts`/`app.ts`).

---

## Endpoints (overview)

### Públicos (GET)

* `GET /api/clientes`
* `GET /api/guindastes`
* `GET /api/locacoes`
* `GET /api/manutencoes`
* `GET /api/ofertas`
* `GET /api/relatorios/estatisticas-gerais`
* `GET /api/relatorios/utilizacao-guindastes`
* `GET /api/relatorios/faturamento-periodo`
* `GET /api/relatorios/clientes-top`

### Protegidos (token obrigatório)

* `POST/PUT /api/guindastes`
* `POST/PUT /api/locacoes`
* `POST/PUT /api/manutencoes`
* `POST/PUT /api/ofertas`

### Admin (token + role `admin`)

* `POST/PUT /api/perfis`
* `POST   /api/perfis/:id/permissoes`
* `POST/PUT /api/permissoes`
* `POST/PUT /api/usuarios`

---

## Testes rápidos (curl)

**Relatório público**

```bash
curl http://localhost:3000/api/relatorios/estatisticas-gerais
```

**Criar guindaste (protegido)**

```bash
curl -X POST http://localhost:3000/api/guindastes \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"modelo":"X-100","capacidade_toneladas":10}'
```

**Criar perfil (admin)**

```bash
curl -X POST http://localhost:3000/api/perfis \
  -H "Authorization: Bearer <TOKEN_ADMIN>" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Administradores","descricao":"Perfil de administração"}'
```

---

## Scripts úteis

* `npm run dev` — desenvolvimento
* `npx prisma generate` — gerar client
* `npx prisma migrate dev` — migrations locais

---

## Autenticação (resumo)

* Aceita `Authorization: Bearer <token>`.
* Validação de assinatura via **JWKS** do Supabase.
* Middleware anexa `user` ao `req` (`id`, `email`, `role`).
* Para rotas admin, checagem `requireRole('admin')`.
  Para granularidade, `requirePermission('<nomePermissao>')`.

---
 