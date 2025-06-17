-- init.sql

-- Criar extensão para suportar UUIDs, se ainda não estiver ativada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    genero VARCHAR(20),
    idade INTEGER,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de salas
CREATE TABLE IF NOT EXISTS salas (
    id SERIAL PRIMARY KEY,
    numero_sala VARCHAR(20) NOT NULL UNIQUE,
    capacidade INTEGER,
    descricao TEXT,
    status VARCHAR(20) DEFAULT 'disponivel',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de agendamentos
CREATE TABLE IF NOT EXISTS agendamentos (
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