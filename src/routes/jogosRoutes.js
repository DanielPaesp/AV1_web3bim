import express from "express";
import autenticar from "../middlewares/autenticar.js";
import { apagarJogo, buscarJogo, cadastrarJogo, editarJogo, listarJogos } from "../controller/jogosController";

const router = express.Router();

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
router.get("/jogos", autenticar, listarJogos);

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
router.get("/jogos/:id", autenticar, buscarJogo);

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
router.post("/jogos", autenticar, cadastrarJogo);
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
router.patch("/jogos/:id", autenticar, editarJogo);

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
router.delete("/jogos/:id", autenticar, apagarJogo);


export default router;