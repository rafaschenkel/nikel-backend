import { NextFunction, Request, Response } from "express";

function transactionCreateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { description, type, value, date } = req.body;

  if (!description || !type || !value || !date)
    return res
      .status(400)
      .json({ success: false, msg: "Um ou mais campos estão ausentes!" });

  next();
}

export default transactionCreateMiddleware;
