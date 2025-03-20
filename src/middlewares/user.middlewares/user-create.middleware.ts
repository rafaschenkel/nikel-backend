import { NextFunction, Request, Response } from "express";
import db from "../../database/db";

async function userCreateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      msg: "Campos e-mail e senha são obrigatórios!",
    });
    return;
  }

  const user = await db.user.findUnique({
    where: { email },
  });

  if (user) {
    res.status(400).json({
      success: false,
      msg: "Já existe uma conta cadastrada com este e-mail!",
    });
    return;
  }

  next();
}

export default userCreateMiddleware;
