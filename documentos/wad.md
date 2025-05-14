# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Sistema de reserva de salas para agendamentos.

#### Vitor Ribeiro De Mattos Silva

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

&emsp;O sistema que será desenvolvido é uma aplicação de agendamento de salas, voltada para ambientes como escritórios, coworkings, instituições de ensino ou espaços compartilhados. O objetivo principal é permitir que usuários registrados possam reservar salas disponíveis para uso em horários específicos, promovendo organização, praticidade e melhor utilização dos espaços físicos.

&emsp;A base de dados é composta por três tabelas principais: Usuarios, Agendamentos e Salas. A tabela Usuarios armazena informações pessoais como nome, gênero, idade, e-mail e senha, sendo identificada pelo campo id. A tabela Salas contém os dados das salas disponíveis, identificadas pelo número e um id único. Já a tabela Agendamentos faz a ligação entre usuários e salas, registrando a data e hora do agendamento, além dos respectivos id_usuarios e id_salas envolvidos.

&emsp;Esse sistema permite ao usuário consultar a disponibilidade das salas, selecionar o horário desejado e confirmar a reserva. Além disso, é possível aplicar autenticação para garantir que apenas usuários cadastrados realizem agendamentos. O relacionamento entre as tabelas é feito por meio de chaves estrangeiras, o que garante a integridade referencial dos dados.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)

*Posicione aqui sua(s) Persona(s) em forma de texto markdown com imagens, ou como imagem de template preenchido. Atualize esta seção ao longo do módulo se necessário.*

### 2.2. User Stories (Semana 01)

*Posicione aqui a lista de User Stories levantadas para o projeto. Siga o template de User Stories e utilize a referência USXX para numeração (US01, US02, US03, ...). Indique todas as User Stories mapeadas, mesmo aquelas que não forem implementadas ao longo do projeto. Não se esqueça de explicar o INVEST de 1 User Storie prioritária.*

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)
<div align="center">
<sub>Figura 1 - Diagramas de modelo relacional do banco de dados - Projeto individual_M2</sub>
<img src="../assets/Diagrama.png">
<sup>Fonte: Aluno Vitor Ribeiro, Faculdade Inteli 2025</sup>
</div>


---
&emsp; A imagem acima apresenta o diagrama relacional do banco de dados do sistema de agendamento de salas. O modelo é composto por três entidades principais: Usuarios, Agendamentos e Salas, todas inter-relacionadas por meio de chaves primárias e estrangeiras que garantem a integridade dos dados.

***Esquema das Tabelas:***

### Usuarios

id (PK): Identificador único do usuário.

1. **Nome:** Nome do usuário.

2. **gênero:** Gênero do usuário.

3. **idade:** Idade do usuário.

4. **email:** E-mail do usuário.

5. **senha:** Senha para autenticação no sistema.

### Agendamentos

id (PK): Identificador único do agendamento.

1. **Data:** Data em que a sala será utilizada.

2. **Hora:** Hora do agendamento.

3. **id_Salas (FK):** Referência ao id da tabela Salas.

4. **id_Usuarios (FK):** Referência ao id da tabela Usuarios.

### Salas

id (PK): Identificador único da sala.

1. **numero:** Número de identificação da sala.
---


 **Relações:**
A tabela Agendamentos funciona como uma tabela de junção entre Usuarios e Salas, representando a reserva de uma sala por um determinado usuário em uma data e hora específicos.

A coluna id_Usuarios na tabela Agendamentos é uma chave estrangeira que se relaciona com a chave primária id da tabela Usuarios.

Da mesma forma, id_Salas é uma chave estrangeira que se relaciona com o id da tabela Salas.

---

### Modelo físico (arquivo .sql)

``` -- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Usuarios'
-- ---

DROP TABLE IF EXISTS `Usuarios`;

CREATE TABLE `Usuarios` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Nome` VARCHAR NULL DEFAULT NULL,
  `idade` VARCHAR NULL DEFAULT NULL,
  `Gênero` VARCHAR NULL DEFAULT NULL,
  `Email` VARCHAR NULL DEFAULT NULL,
  `Senha` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Agendamentos'
-- ---

DROP TABLE IF EXISTS `Agendamentos`;

CREATE TABLE `Agendamentos` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Data` VARCHAR NULL DEFAULT NULL,
  `Hora` VARCHAR NULL DEFAULT NULL,
  `id_salas` VARCHAR NULL DEFAULT NULL,
  `id_usuarios` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Salas'
-- ---

DROP TABLE IF EXISTS `Salas`;

CREATE TABLE `Salas` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Numero` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Agendamentos` ADD FOREIGN KEY (id_salas) REFERENCES `Salas` (`id`);
ALTER TABLE `Agendamentos` ADD FOREIGN KEY (id_usuarios) REFERENCES `Usuarios` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Usuarios` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Agendamentos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Salas` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Usuarios` (`id`,`Nome`,`idade`,`Gênero`,`Email`,`Senha`) VALUES
-- ('','','','','','');
-- INSERT INTO `Agendamentos` (`id`,`Data`,`Hora`,`id_salas`,`id_usuarios`) VALUES
-- ('','','','','');
-- INSERT INTO `Salas` (`id`,`Numero`) VALUES
-- ('',''); 

```

---

### 3.1.1 BD e Models (Semana 5)
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---
---
