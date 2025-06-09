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
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    numero VARCHAR(20) NOT NULL UNIQUE,
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
    id_usuario UUID NOT NULL,
    id_sala UUID NOT NULL,
    status VARCHAR(20) DEFAULT 'confirmado',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_sala FOREIGN KEY (id_sala) REFERENCES salas(id) ON DELETE CASCADE,
    CONSTRAINT unique_sala_data_hora UNIQUE (id_sala, data, hora)
);

-- Inserir dados de teste na tabela de usuários
INSERT INTO usuarios (nome, genero, idade, email, senha)
VALUES 
    ('Miguel Bueno Soares', 'Masculino', 22, 'miguel.soares@email.com', 'senha123'),
    ('Alice Smith', 'Feminino', 25, 'alice.smith@email.com', 'senha456'),
    ('Carol Williams', 'Feminino', 28, 'carol.williams@email.com', 'senha789');

-- Inserir dados de teste na tabela de salas
INSERT INTO salas (numero, capacidade, descricao)
VALUES 
    ('101', 6, 'Sala de estudo pequena - 1º andar'),
    ('102', 8, 'Sala de estudo média - 1º andar'),
    ('201', 12, 'Sala de reunião grande - 2º andar'),
    ('202', 4, 'Sala de estudo individual - 2º andar');

-- Inserir dados de teste na tabela de agendamentos
INSERT INTO agendamentos (data, hora, id_usuario, id_sala)
VALUES 
    (CURRENT_DATE, '09:00:00', (SELECT id FROM usuarios WHERE email = 'miguel.soares@email.com'), (SELECT id FROM salas WHERE numero = '101')),
    (CURRENT_DATE, '14:00:00', (SELECT id FROM usuarios WHERE email = 'alice.smith@email.com'), (SELECT id FROM salas WHERE numero = '201'));
