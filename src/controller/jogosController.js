import jogos from "../data/jogos";

export function listarJogos(req, res) {
    res.json(jogos);
}

export function buscarJogo (req, res)  {
  const id = Number(req.params.id);

  const jogo = jogos.find((jogo) => jogo.id === id);

  if (!jogo) {
    return res.status(404).json({
      message: "Jogo não encontrado"
    });
  }

  res.json(jogo);
};

export function cadastrarJogo (req, res)  {
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
};

export function editarJogo (req, res)  {
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
};

export function apagarJogo (req, res) {
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
};
