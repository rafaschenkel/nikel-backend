import { Request, Response } from "express";
import db from "../database/db";

class AuthController {
  async create(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res.status(400).json({
          success: false,
          msg: "Compo e-mail e senha precisam ser enviados!",
        });

      const user = await db.user.findUnique({
        where: { email, password },
      });

      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: "E-mail ou senha estão incorretos!" });
      }

      res.status(200).json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          password: user.password,
        },
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, msg: "Erro ao tentar realizar login!" });
    }
  }
}

export default AuthController;
