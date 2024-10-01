import { NextFunction, Request, Response } from "express";
import db from "../../database/db";

async function userCreateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      success: false,
      msg: "Campos e-mail e senha são obrigatórios!",
    });

  const user = await db.user.findUnique({
    where: { email },
  });

  if (user) {
    return res.status(400).json({
      success: false,
      msg: "Já existe uma conta cadastrada com este e-mail!",
    });
  }

  next();
}

export default userCreateMiddleware;
