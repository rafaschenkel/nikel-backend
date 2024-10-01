import { NextFunction, Request, Response } from "express";
import db from "../../database/db";

async function transactionDeleteMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id, transactionId } = req.params;

  const user = await db.transaction.findUnique({
    where: { userId: Number(id), id: Number(transactionId) },
  });

  if (!user)
    return res.status(400).json({
      success: false,
      msg: "Transação não encontrada, verifique o Id informado!",
    });

  next();
}

export default transactionDeleteMiddleware;
