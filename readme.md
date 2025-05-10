# Inteli - Instituto de Tecnologia e Liderança  
# Projeto Individual M2

##  Desenvolvedor:

- [Vitor Ribeiro de Mattos Silva](https://www.linkedin.com/in/vitor-ribeiro-2822a932a/)


## Descrição

Este projeto é um boilerplate básico para uma aplicação Node.js seguindo o padrão MVC (Model-View-Controller), utilizando PostgreSQL como banco de dados. Ele serve como ponto de partida para o desenvolvimento de aplicações web estruturadas e escaláveis.

## Funcionalidades

- **Padrão MVC**: Estrutura organizada em Model, View e Controller.
- **PostgreSQL**: Banco de dados relacional utilizado para persistência dos dados.
- **UUID**: Utilização de UUID como chave primária na tabela `users`.
- **Scripts com `nodemon`**: Utilização do `nodemon` para reiniciar automaticamente o servidor após alterações no código.
- **Testes**: Inclui estrutura básica para testes automatizados.

##  Estrutura de Diretórios

- **`assets/`**: Arquivos estáticos e recursos visuais.
- **`config/`**: Configurações do banco de dados e outras configurações do projeto.
- **`controllers/`**: Controladores da aplicação (lógica de negócio).
- **`documentos/`**: Documentação relacionada ao projeto.
- **`models/`**: Modelos da aplicação (definições de dados e interações com o banco de dados).
- **`routes/`**: Rotas da aplicação.
- **`scripts/`**: Scripts auxiliares para automação de tarefas.
- **`services/`**: Serviços que encapsulam a lógica de negócios.
- **`tests/`**: Testes automatizados.
- **`views/`**: Views da aplicação (se aplicável).

##  Como executar o código

### Requisitos do sistema

- Node.js (versão X.X.X)
- PostgreSQL (versão X.X.X)

### Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Vitorribeiroms/projeto_individual_M2.git
   cd projeto_individual_M2
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure o arquivo `.env`:**

   Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente necessárias, como as configurações do banco de dados PostgreSQL.

4. **Crie o banco de dados:**

   Crie um banco de dados PostgreSQL com o nome especificado no seu arquivo `.env`.

5. **Execute o script SQL de inicialização:**

   ```bash
   npm run init-db
   ```

   Isso criará a tabela `users` no seu banco de dados PostgreSQL com UUID como chave primária e inserirá alguns registros de exemplo.

6. **Inicie o servidor:**

   ```bash
   npm start
   ```

   Ou, para desenvolvimento com reinício automático:

   ```bash
   npm run dev
   ```

## Scripts Disponíveis

- `npm start`: Inicia o servidor Node.js.
- `npm run dev`: Inicia o servidor com `nodemon`, reiniciando automaticamente após alterações no código.
- `npm run test`: Executa os testes automatizados.
- `npm run test:coverage`: Executa os testes e gera um relatório de cobertura de código.

## 📋 Licença

Este projeto está licenciado sob a Licença MIT.