-- init.sql

-- Criar extensão para suportar UUIDs, se ainda não estiver ativada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(100) NOT NULL,
  idade INTEGER,
  genero VARCHAR(20),
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(100) NOT NULL
);

-- Criar tabela de salas
CREATE TABLE IF NOT EXISTS salas (
<<<<<<< HEAD
    id SERIAL PRIMARY KEY,
    numero_sala VARCHAR(20) NOT NULL UNIQUE,
    capacidade INTEGER,
    descricao TEXT,
    status VARCHAR(20) DEFAULT 'disponivel',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
=======
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  numero VARCHAR(20) NOT NULL
>>>>>>> parent of 3e7ad0e (feat: adicionar banco de dados ao init.sql)
);

-- Criar tabela de agendamentos
CREATE TABLE IF NOT EXISTS agendamentos (
<<<<<<< HEAD
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    data DATE NOT NULL,
    hora TIME NOT NULL,
    usuario_id UUID NOT NULL,
    sala_id INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'confirmado',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_sala FOREIGN KEY (sala_id) REFERENCES salas(id) ON DELETE CASCADE,
    CONSTRAINT unique_sala_data_hora UNIQUE (sala_id, data, hora)
);

-- Inserir salas iniciais
INSERT INTO salas (numero_sala, capacidade, descricao) VALUES
('1', 20, 'Sala de reunião pequena'),
('2', 30, 'Sala de reunião média'),
('3', 40, 'Sala de reunião grande'),
('4', 25, 'Sala de treinamento'),
('5', 35, 'Sala de apresentação'),
('6', 15, 'Sala de entrevista'),
('7', 50, 'Auditório pequeno')
ON CONFLICT (numero_sala) DO NOTHING;
=======
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  data DATE NOT NULL,
  hora TIME NOT NULL,
  id_sala UUID NOT NULL,
  id_usuario UUID NOT NULL,
  CONSTRAINT fk_sala FOREIGN KEY (id_sala) REFERENCES salas(id),
  CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Inserir dados de teste na tabela de usuários
INSERT INTO usuarios (nome, idade, genero, email, senha)
VALUES 
  ('Alice Smith', 25, 'Feminino', 'alice.smith@example.com', 'senha123'),
  ('Bob Johnson', 30, 'Masculino', 'bob.johnson@example.com', 'senha123'),
  ('Carol Williams', 28, 'Feminino', 'carol.williams@example.com', 'senha123');

-- Inserir dados de teste na tabela de salas
INSERT INTO salas (numero)
VALUES 
  ('101'),
  ('102'),
  ('103');

-- Inserir dados de teste na tabela de agendamentos
-- (obs: para usar esses INSERTs, primeiro recupere os UUIDs reais das tabelas 'salas' e 'usuarios' ou ajuste conforme necessário)
-- Exemplo genérico, deve ser adaptado:
-- INSERT INTO agendamentos (data, hora, id_sala, id_usuario) VALUES ('2025-06-01', '09:00:00', 'uuid_sala', 'uuid_usuario');
>>>>>>> parent of 3e7ad0e (feat: adicionar banco de dados ao init.sql)
