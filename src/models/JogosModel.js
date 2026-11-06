import prisma from "../config/prisma.js";

export function criarJogo({ nome, Ano }) {
  return prisma.jogo.create({
    data: {
      nome,
      Ano
    }
  });
}

export function listarJogos() {
  return prisma.jogo.findMany({
    orderBy: {
      id: "asc"
    }
  });
}


export function buscarJogoPorId(id) {
  return prisma.jogo.findUnique({
    where: {
      id: Number(id)
    }
  });
}   

export function editarJogo(id, { nome, Ano }) {
  return prisma.jogo.update({
    where: {
      id: Number(id)
    },
    data: {
      nome,
      Ano
    }
  });
}

export function apagarJogo(id) {
  return prisma.jogo.delete({
    where: {
      id: Number(id)
    }
  });
}