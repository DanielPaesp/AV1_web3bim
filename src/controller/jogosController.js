import { apagarJogo as removerJogo, buscarJogoPorId, criarJogo, editarJogo as atualizarJogo, listarJogos as obterJogos } from "../models/JogosModel.js";

function validarId(id) {
  const numero = Number(id);
  return Number.isInteger(numero) && numero > 0 ? numero : null;
}

function validarJogo({ nome, Ano }, parcial = false) {
  if (parcial && nome === undefined && Ano === undefined) {
    return "Informe ao menos um campo para atualizar";
  }
  if (nome !== undefined && (typeof nome !== "string" || !nome.trim() || nome.trim().length > 100)) {
    return "nome deve ser um texto entre 1 e 100 caracteres";
  }
  if (Ano !== undefined && (!Number.isInteger(Ano) || Ano < 1950 || Ano > new Date().getFullYear() + 10)) {
    return "Ano deve ser um número inteiro válido";
  }
  if (!parcial && (nome === undefined || Ano === undefined)) {
    return "Informe nome e Ano";
  }
  return null;
}

function enviarErro(err, next) {
  if (err.code === "P2025") {
    return next({ status: 404, message: "Jogo não encontrado" });
  }
  next(err);
}

export async function listarJogos(req, res, next) {
  try {
    res.json(await obterJogos());
  } catch (err) {
    next(err);
  }
}

export async function buscarJogo(req, res, next) {
  const id = validarId(req.params.id);
  if (id === null) return res.status(400).json({ erro: "ID inválido" });

  try {
    const jogo = await buscarJogoPorId(id);
    if (!jogo) return res.status(404).json({ message: "Jogo não encontrado" });
    res.json(jogo);
  } catch (err) {
    next(err);
  }
}

export async function cadastrarJogo(req, res, next) {
  const erro = validarJogo(req.body ?? {});
  if (erro) return res.status(400).json({ erro });

  try {
    const jogo = await criarJogo({ nome: req.body.nome.trim(), Ano: req.body.Ano });
    res.status(201).json({ mensagem: "Jogo cadastrado com sucesso", jogo });
  } catch (err) {
    next(err);
  }
}

export async function editarJogo(req, res, next) {
  const id = validarId(req.params.id);
  if (id === null) return res.status(400).json({ erro: "ID inválido" });
  const dados = req.body ?? {};
  const erro = validarJogo(dados, true);
  if (erro) return res.status(400).json({ erro });

  const atualizacao = {};
  if (dados.nome !== undefined) atualizacao.nome = dados.nome.trim();
  if (dados.Ano !== undefined) atualizacao.Ano = dados.Ano;

  try {
    res.json(await atualizarJogo(id, atualizacao));
  } catch (err) {
    enviarErro(err, next);
  }
}

export async function apagarJogo(req, res, next) {
  const id = validarId(req.params.id);
  if (id === null) return res.status(400).json({ erro: "ID inválido" });

  try {
    await removerJogo(id);
    res.json({ message: "Jogo removido com sucesso" });
  } catch (err) {
    enviarErro(err, next);
  }
}
