import { NextFunction, Request, Response } from "express";
import db from "../../database/db";

async function userUpdateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  const user = await db.user.findUnique({
    where: { id: Number(id) },
  });

  const { newPassword } = req.body;

  if (user?.password === newPassword)
    return res.status(400).json({
      success: false,
      msg: "Nova senha precisa ser diferente da atual!",
    });

  next();
}

export default userUpdateMiddleware;
