import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger.js";
import jogosRoutes from "./src/routes/jogosRoutes.js";
import autenticar from "./src/middlewares/autenticar.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get("/", (req, res) => {
  res.json({
    mensagem: "Servidor Express funcionando!",
    disciplina: "Desenvolvimento de Websites",
    bimestre: "3º bimestre"
  });
});

app.use("/jogos", autenticar, jogosRoutes);

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ erro: "Erro interno do servidor" });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
