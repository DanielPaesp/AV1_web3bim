import express from "express";
import "dotenv/config";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
const port = 3000;
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jogos API",
      version: "1.0.0",
      description: "INSIRA DESCRIÇÃO DO PROJETO"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "DESCRIÇÃO DO SERVIDOR"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          description: "Informe o token no formato: Bearer SEU_TOKEN"
        }
      }
    }
  },
  apis: ["./server.js"]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(express.json());

const jogos = [
  { id: 1, nome: "GTA IV", Ano: "2008" },
  { id: 2, nome: "Battlefield 1", Ano: "2016" },
  { id: 3, nome: "Watch Dogs", Ano: "2014" },
  { id: 4, nome: "Cuphead", Ano: "2017" },
  { id: 5, nome: "The Last of Us", Ano: "2013" },
  { id: 6, nome: "Assassin's Creed Black Flag", Ano: "2013" },
  { id: 7, nome: "Counter-Strike 2", Ano: "2023" },
  { id: 8, nome: "Stardew Valley", Ano: "2016" },
  { id: 9, nome: "Hollow knight", Ano: "2017" },
  { id: 10, nome: "Batman arkham city", Ano: "2011" },
  { id: 11, nome: "Dying light", Ano: "2015" },
  { id: 12, nome: "Uncharted 4", Ano: "2016" }
];

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;
  const tokenSecreto = process.env.TOKEN_SECRETO;

  if (authHeader !== `Bearer ${tokenSecreto}`) {
    return res.status(401).json({
      erro: "Acesso não autorizado. Token ausente ou inválido"
    });
  }

  next();
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Jogo:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         nome:
 *           type: string
 *           example: "GTA IV"
 *         Ano:
 *           type: number
 *           example: 2008
 *       required:
 *         - id
 *         - nome
 *         - Ano
 */

app.get("/", (req, res) => {
  res.json({
    mensagem: "Servidor Express funcionando!",
    disciplina: "Desenvolvimento de Websites",
    bimestre: "3º bimestre"
  });
});

/**
 * @swagger
 * /jogos:
 *   get:
 *     tags: [Jogos]
 *     summary: Lista todos os jogos
 *     description: Retorna todos os jogos cadastrados.
 *     responses:
 *       200:
 *         description: Lista de jogos retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Jogo'
 */
app.get("/jogos",(req, res) => {
  res.json(jogos);
});

/**
 * @swagger
 * /jogos/{id}:
 *   get:
 *     tags: [Jogos]
 *     summary: Busca um jogo por ID
 *     description: Retorna um jogo usando o seu ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 1
 *     responses:
 *       200:
 *         description: Jogo encontrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jogo'
 *       404:
 *         description: Jogo não encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: Jogo não encontrado
 */
app.get("/jogos/:id", (req, res) => {
  const id = Number(req.params.id);

  const jogo = jogos.find((jogo) => jogo.id === id);

  if (!jogo) {
    return res.status(404).json({
      message: "Jogo não encontrado"
    });
  }

  res.json(jogo);
});

/**
 * @swagger
 * /jogos:
 *   post:
 *     tags: [Jogos]
 *     summary: Cadastra um novo jogo
 *     description: Cria um jogo usando nome e ano.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, Ano]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Minecraft
 *               Ano:
 *                 type: number
 *                 example: 2011
 *           example:
 *             nome: Minecraft
 *             Ano: 2011
 *     responses:
 *       201:
 *         description: Jogo cadastrado com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               mensagem: Jogo cadastrado com sucesso
 *               jogo:
 *                 id: 13
 *                 nome: Minecraft
 *                 Ano: 2011
 *       400:
 *         description: Dados inválidos para cadastrar o jogo.
 *         content:
 *           application/json:
 *             example:
 *               erro: Dados inválidos
 *       401:
 *         description: Token ausente ou inválido.
 *         content:
 *           application/json:
 *             example:
 *               erro: Acesso não autorizado. Token ausente ou inválido
 */
app.post("/jogos", autenticar, (req, res) => {
  const novoJogo = {
    id: jogos.length + 1,
    nome: req.body.nome,
    Ano: req.body.Ano
  };

  jogos.push(novoJogo);

  res.status(201).json({
    mensagem: "Jogo cadastrado com sucesso",
    jogo: novoJogo
  });
});

/**
 * @swagger
 * /jogos/{id}:
 *   patch:
 *     tags: [Jogos]
 *     summary: Atualiza parcialmente um jogo
 *     description: Atualiza apenas os campos enviados do jogo informado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: GTA IV Complete Edition
 *               Ano:
 *                 type: number
 *                 example: 2008
 *           example:
 *             nome: GTA IV Complete Edition
 *     responses:
 *       200:
 *         description: Jogo atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jogo'
 *       400:
 *         description: Dados inválidos para atualizar o jogo.
 *         content:
 *           application/json:
 *             example:
 *               erro: Dados inválidos
 *       401:
 *         description: Token ausente ou inválido.
 *         content:
 *           application/json:
 *             example:
 *               erro: Acesso não autorizado. Token ausente ou inválido
 *       404:
 *         description: Jogo não encontrado.
 */
app.patch("/jogos/:id", autenticar, (req, res) => {
  const id = Number(req.params.id);
  const { nome, Ano } = req.body;

  const jogo = jogos.find((jogo) => jogo.id === id);

  if (!jogo) {
    return res.status(404).json({
      message: "Jogo não encontrado"
    });
  }

  if (nome) {
    jogo.nome = nome;
  }

  if (Ano) {
    jogo.Ano = Ano;
  }

  res.json(jogo);
});

/**
 * @swagger
 * /jogos/{id}:
 *   delete:
 *     tags: [Jogos]
 *     summary: Exclui um jogo
 *     description: Exclui o jogo informado pelo ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         example: 1
 *     responses:
 *       200:
 *         description: Jogo removido com sucesso.
 *         content:
 *           application/json:
 *             example:
 *               message: Jogo removido com sucesso
 *       401:
 *         description: Token ausente ou inválido.
 *         content:
 *           application/json:
 *             example:
 *               erro: Acesso não autorizado. Token ausente ou inválido
 *       404:
 *         description: Jogo não encontrado.
 */
app.delete("/jogos/:id", autenticar, (req, res) => {
  const id = Number(req.params.id);

  const jogoIndex = jogos.findIndex((jogo) => jogo.id === id);

  if (jogoIndex === -1) {
    return res.status(404).json({
      message: "Jogo não encontrado"
    });
  }

  jogos.splice(jogoIndex, 1);

  res.json({
    message: "Jogo removido com sucesso"
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
