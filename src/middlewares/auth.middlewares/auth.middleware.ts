import { NextFunction, Request, Response } from "express";
import db from "../../database/db";

async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const { email, password } = req.headers;

    const userLogged = await db.user.findUnique({
      where: { id: Number(id), email: `${email}`, password: `${password}` },
    });

    if (!userLogged) {
      return res
        .status(401)
        .json({ success: false, msg: "Usuário não logado!" });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, msg: "Erro de autenticação!" });
  }
}

export default auth;
