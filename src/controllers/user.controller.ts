import { Request, Response } from "express";
import db from "../database/db";

class UserController {
  async create(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      await db.user.create({
        data: { email, password, name },
      });
      res
        .status(200)
        .json({ succcess: true, msg: "Conta criada com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, msg: "Erro ao tentar criar a conta!" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { newPassword, name } = req.body;
      const { password } = req.headers;

      const user = await db.user.findUnique({
        where: { id: Number(id), password: String(password) },
      });

      if (!user) {
        return res.status(400).json({ success: false, msg: "Não autorizado!" });
      }

      await db.user.update({
        data: { password: newPassword, name },
        where: { id: Number(id) },
      });

      res.status(200).json({
        success: true,
        msg: "Dados atualizados com sucesso!",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, msg: "Erro ao tentar atualizar a conta!" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { password } = req.body;

      const user = await db.user.findUnique({
        where: { id: Number(id), password },
      });

      if (!user) {
        return res
          .status(400)
          .json({ success: false, msg: "Senha está incorreta!" });
      }

      await db.user.delete({ where: { id: Number(id) } });

      res.status(200).json({
        success: true,
        msg: "Conta exclúida com sucesso!",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, msg: "Erro ao realizar a exclusão da conta!" });
    }
  }
}

export default UserController;
