import { NextFunction, Request, Response } from "express";
import db from "../../database/db";

async function userDeleteMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  const user = await db.user.findUnique({
    where: { id: Number(id) },
  });

  next();
}

export default userDeleteMiddleware;
