# Sistema de Reservas de Salas - REVEX

Sistema web para reserva de salas de reunião desenvolvido em Node.js com Express, PostgreSQL e EJS.

## Desenvolvedor

- [Vitor Ribeiro de Mattos Silva](https://www.linkedin.com/in/vitor-ribeiro-2822a932a/)

## Funcionalidades

- **Autenticação de Usuários**: Login e registro com senhas criptografadas
- **Reserva de Salas**: Seleção de sala, data e horário
- **Visualização de Reservas**: Lista de reservas do usuário
- **Interface Responsiva**: Design moderno e intuitivo

## Fluxo da Aplicação

1. **Login/Registro**: Usuário deve se cadastrar ou fazer login
2. **Tela Home**: Após login, acesso aos botões "Minhas Reservas" e "+ Reservar Salas"
3. **Seleção de Sala**: Escolha da sala desejada no carrossel
4. **Calendário**: Seleção de data e horário disponível
5. **Confirmação**: Resumo da reserva e confirmação
6. **Sucesso**: Popup de confirmação e retorno à tela inicial

## Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn

## Instalação

1. **Clone o repositório**:
```bash
git clone https://github.com/Vitorribeiroms/projeto_individual_M2.git
cd projeto_individual_M2
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Configure o banco de dados**:
   - Crie um banco de dados PostgreSQL
   - Copie o arquivo `env.example` para `.env`
   - Configure as variáveis de ambiente no arquivo `.env`:

```env
DB_USER=seu_usuario
DB_HOST=localhost
DB_DATABASE=nome_do_banco
DB_PASSWORD=sua_senha
DB_PORT=5432
SESSION_SECRET=sua-chave-secreta-muito-segura-aqui
PORT=3000
```

4. **Inicialize o banco de dados**:
```bash
npm run init-db
```

5. **Inicie o servidor**:
```bash
npm start
```

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

## Estrutura do Projeto

```
projeto_individual_M2/
├── assets/                 # Imagens e recursos estáticos
├── config/                 # Configuração do banco de dados
├── controllers/            # Controladores da aplicação
├── middleware/             # Middlewares de autenticação
├── models/                 # Modelos de dados
├── public/                 # Arquivos CSS e JS públicos
├── routes/                 # Rotas da aplicação
├── scripts/                # Scripts SQL de inicialização
├── services/               # Lógica de negócio
├── tests/                  # Testes automatizados
├── uploads/                # Uploads de arquivos
├── views/                  # Templates EJS
├── server.js               # Arquivo principal do servidor
└── package.json            # Dependências e scripts
```

## Rotas Principais

- `GET /` - Redireciona para login ou home
- `GET /auth/login` - Página de login
- `POST /auth/login` - Processamento do login
- `GET /auth/registro` - Página de registro
- `POST /auth/registro` - Processamento do registro
- `POST /auth/logout` - Logout do usuário
- `GET /home` - Tela principal (requer autenticação)
- `GET /room-carousel` - Seleção de salas (requer autenticação)
- `GET /calendar` - Calendário de reservas (requer autenticação)
- `GET /minhas-reservas` - Lista de reservas (requer autenticação)
- `POST /criar-reserva` - Criar nova reserva (requer autenticação)

## Banco de Dados

### Tabelas

1. **usuarios**: Armazena informações dos usuários
2. **salas**: Armazena informações das salas disponíveis
3. **agendamentos**: Armazena as reservas realizadas

### Relacionamentos

- `agendamentos.usuario_id` → `usuarios.id`
- `agendamentos.sala_id` → `salas.id`

## Segurança

- Senhas criptografadas com bcrypt
- Sessões seguras com express-session
- Middleware de autenticação para rotas protegidas
- Validação de dados de entrada

## Scripts Disponíveis

- `npm start`: Inicia o servidor Node.js
- `npm run dev`: Inicia o servidor com `nodemon`, reiniciando automaticamente após alterações
- `npm test`: Executa os testes automatizados
- `npm run test:coverage`: Executa os testes e gera relatório de cobertura
- `npm run init-db`: Executa o script SQL de inicialização do banco

## Tecnologias Utilizadas

- **Backend**: Node.js, Express.js
- **Banco de Dados**: PostgreSQL
- **Template Engine**: EJS
- **Autenticação**: bcrypt, express-session
- **Testes**: Jest, Supertest
- **Desenvolvimento**: Nodemon

## Licença

Este projeto está licenciado sob a Licença MIT.