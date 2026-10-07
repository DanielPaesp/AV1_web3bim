export default function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader !== `Bearer ${TOKEN_SECRETO}`) {
    return res.status(401).json({
      erro: "Acesso não autorizado. Token ausente ou inválido"
    });
  }

  next();
}

