import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger";
import jogosRoutes from "./src/routes/jogosRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


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

app.use("/jogos", jogosRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
