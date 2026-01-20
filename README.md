# 🚚 LogiTrack

![Status](https://img.shields.io/badge/Status-Em_andamento-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

**LogiTrack** é um sistema completo de gestão logística desenvolvido para otimizar o monitoramento de entregas e rotas. A aplicação oferece um dashboard interativo que une a gestão visual (Kanban) com a geolocalização em tempo real (Mapas), permitindo aos gerentes uma visão 360º da operação.

---

## 📸 Screenshots

| 📍 Mapa de Operações | 📋 Kanban Board |
|:---:|:---:|
| ![Mapa](assets/kanban_board.png) | ![Kanban](assets/kanban_board_2.png) |
| *Visualização de entregas em tempo real* | *Gestão de status via arrastar e soltar* |


| 👤 Login | ⚙️ Configurações |
|:---:|:---:|
| ![Mapa](assets/login_page.png) | ![Kanban](assets/Settings.png) |
| *Visualização de entregas em tempo real* | *Gestão de status via arrastar e soltar* |

---

## 🚀 Funcionalidades

- **Dashboard Gerencial:** Visão unificada de métricas e operações.
- **Mapa Interativo (Leaflet):** Monitoramento geográfico de entregas com marcadores de status.
- **Kanban Drag-and-Drop:** Alteração de status de entregas (Pendente → Em Rota → Entregue) de forma visual.
- **Gestão de Motoristas:** Atribuição dinâmica de motoristas aos pedidos.
- **Autenticação JWT:** Login seguro com criptografia de senha e proteção de rotas.
- **Controle de Acesso (RBAC):** Funcionalidades exclusivas para Gerentes (Managers).
- **Database Seeding:** Povoamento automático do banco com dados reais de Manaus-AM para testes.

---

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14 (App Router)** - Framework React moderno.
- **TypeScript** - Tipagem estática e segurança no código.
- **Tailwind CSS** - Estilização responsiva.
- **React Leaflet** - Mapas interativos.
- **Hello Pangea DnD** - Biblioteca de Drag-and-Drop.
- **Lucide React** - Ícones.

### **Backend**
- **Node.js & Express** - API RESTful.
- **Prisma ORM** - Gerenciamento de banco de dados e Migrations.
- **PostgreSQL** - Banco de dados relacional.
- **JWT & Bcrypt** - Segurança e Autenticação.

---

## 🔑 Credenciais de Acesso (Seed)

Para facilitar os testes, o projeto possui um script de "Seed" que popula o banco de dados com um usuário administrador padrão e dados fictícios de entregas em Manaus.

Ao rodar o comando de seed (instruções abaixo), utilize:

| Tipo | Email | Senha |
| :--- | :--- | :--- |
| **Gerente (Admin)** | `admin@logitrack.com` | `123456` |

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

1.  **[Node.js](https://nodejs.org/en/)** (v18 ou superior).
2.  **[Git](https://git-scm.com/)**.
3.  **[PostgreSQL](https://www.postgresql.org/download/)**:
    * Você pode instalar o PostgreSQL localmente na sua máquina.
    * **OU** usar o Docker (Recomendado): `docker run --name logitrack-db -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`.

---

## 👣 Passo a Passo para Execução

### 1. Clonar o Repositório

git clone [https://github.com/SEU-USUARIO/logitrack.git](https://github.com/SEU-USUARIO/logitrack.git)
cd logitrack

### 2. Configurando o Backend (Servidor)
Abra um terminal, acesse a pasta backend e instale as dependências:

Bash

cd backend
npm install
Crie um arquivo chamado .env na raiz da pasta backend e configure a conexão com seu banco PostgreSQL:

Snippet de código

## Exemplo de conexão local (ajuste usuário e senha conforme sua instalação do Postgres)
DATABASE_URL="postgresql://postgres:suasenha@localhost:5432/logitrack?schema=public"

## Chave secreta para assinar os tokens (pode ser qualquer string aleatória)
JWT_SECRET="minha_chave_secreta_super_segura_123"

PORT=3000
Execute as migrações para criar as tabelas e rode o Seed para criar o usuário padrão:

Bash

## Cria as tabelas no banco
npx prisma db push

## Popula o banco com usuário Admin e entregas em Manaus
npx prisma db seed
Inicie o servidor:

Bash

npm run dev
🟢 O backend estará rodando em http://localhost:3000

### 3. Configurando o Frontend (Interface)
Abra outro terminal (mantenha o backend rodando), volte para a raiz e acesse a pasta frontend:

Bash

cd ../frontend
npm install
Inicie a aplicação:

Bash

npm run dev
🟢 O frontend estará rodando em http://localhost:3001 (ou 3000, verifique o terminal)

🧪 Como Testar o Sistema
Abra http://localhost:3001 no navegador.

Faça login com admin@logitrack.com e senha 123456.

No Dashboard:

Verifique os pinos no mapa de Manaus.

Arraste um card do Kanban e veja o status atualizar.

No card de uma entrega, selecione um motorista (Ex: "Seu Zé da Van").

Vá em Ajustes (ícone de engrenagem) para cadastrar novos motoristas ou entregas.

### 🤝 Autor
Desenvolvido por Kevin Marques.
