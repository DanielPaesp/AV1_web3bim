import express from "express";
import "dotenv/config";

const app = express();
const port = 3000;

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

app.get("/", (req, res) => {
  res.json({
    mensagem: "Servidor Express funcionando!",
    disciplina: "Desenvolvimento de Websites",
    bimestre: "3º bimestre"
  });
});

app.get("/jogos",(req, res) => {
  res.json(jogos);
});

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

app.post("/jogos",(req, res) => {
  const novoJogo = {
    id: jogos.length + 1,
    nome: req.body.nome,
    categoria: req.body.categoria,
    Ano: req.body.Ano
  };

  jogos.push(novoJogo);

  res.status(201).json({
    mensagem: "Jogo cadastrado com sucesso",
    jogo: novoJogo
  });
});

app.put("/jogos/:id",(req, res) => {
  const id = Number(req.params.id);
  const { nome, categoria, Ano } = req.body;

  const jogo = jogos.find((jogo) => jogo.id === id);

  if (!jogo) {
    return res.status(404).json({
      message: "Jogo não encontrado"
    });
  }

  if (nome) {
    jogo.nome = nome;
  }

  if (categoria) {
    jogo.categoria = categoria;
  }

  if (Ano) {
    jogo.Ano = Ano;
  }

  res.json(jogo);
});

app.delete("/jogos/:id",(req, res) => {
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
