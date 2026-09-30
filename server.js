import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger";
import { 
  apagarJogo, 
  buscarJogo, 
  cadastrarJogo, 
  editarJogo, 
  listarJogos, 
  novoJogo } from "./src/controller/jogosController";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader !== `Bearer ${TOKEN_SECRETO}`) {
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

app.get("/", autenticar, (req, res) => {
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de jogos retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Jogo'
 *       401:
 *         description: Token ausente ou inválido.
 *         content:
 *           application/json:
 *             example:
 *               erro: Acesso não autorizado. Token ausente ou inválido
 */
app.get("/jogos", listarJogos);

/**
 * @swagger
 * /jogos/{id}:
 *   get:
 *     tags: [Jogos]
 *     summary: Busca um jogo por ID
 *     description: Retorna um jogo usando o seu ID.
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
 *         description: Jogo encontrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Jogo'
 *       401:
 *         description: Token ausente ou inválido.
 *         content:
 *           application/json:
 *             example:
 *               erro: Acesso não autorizado. Token ausente ou inválido
 *       404:
 *         description: Jogo não encontrado.
 *         content:
 *           application/json:
 *             example:
 *               message: Jogo não encontrado
 */
app.get("/jogos/:id", autenticar, buscarJogo);

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
app.post("/jogos", autenticar, cadastrarJogo);
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
app.patch("/jogos/:id", autenticar, editarJogo);

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
app.delete("/jogos/:id", autenticar,apagarJogo);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
