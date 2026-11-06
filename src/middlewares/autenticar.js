import "dotenv/config";

export default function autenticar(req, res, next) {
  const token = process.env.TOKEN_SECRETO;
  const authHeader = req.headers.authorization;

  if (!token) {
    return res.status(500).json({ erro: "TOKEN_SECRETO não foi configurado" });
  }

  if (authHeader !== `Bearer ${token}`) {
    return res.status(401).json({
      erro: "Acesso não autorizado. Token ausente ou inválido"
    });
  }

  next();
}

