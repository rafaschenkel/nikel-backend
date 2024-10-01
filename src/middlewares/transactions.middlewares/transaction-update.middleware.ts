import { NextFunction, Request, Response } from "express";

function transactionUpdateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { description, type, value, date } = req.body;

  if (!description && !type && !value && !date)
    return res
      .status(400)
      .json({
        success: false,
        msg: "Pelo menos um dos campos deve estar preenchido!",
      });

  next();
}

export default transactionUpdateMiddleware;
