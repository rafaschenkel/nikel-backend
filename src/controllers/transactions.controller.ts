import { Request, Response } from "express";
import db from "../database/db";

class TransactionsController {
  async index(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userExist = await db.user.findUnique({
        where: { id: Number(id) },
      });
      if (!userExist)
        return res
          .status(404)
          .json({ success: false, msg: "Não existe um usuário com este Id!" });

      const transactions = await db.transaction.findMany({
        where: { userId: Number(id) },
        orderBy: { date: "desc" },
      });

      res.status(200).json({ success: true, data: transactions });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, msg: "Erro ao buscar as transações!" });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { description, type, value, date } = req.body;
      const idNumber = Number(id);
      const valueNumber = Number(value);
      const typeNumber = Number(type);
      const newDate = new Date(date);

      await db.transaction.create({
        data: {
          description,
          type: typeNumber,
          value: valueNumber,
          date: newDate,
          userId: idNumber,
        },
      });

      res
        .status(200)
        .json({ success: true, msg: "Transação adicionada com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, msg: "Erro ao adicionar a transação!" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id, transactionId } = req.params;
      const { description, type, value, date } = req.body;

      const transaction = await db.transaction.findUnique({
        where: { userId: Number(id), id: Number(transactionId) },
      });

      await db.transaction.update({
        where: { userId: Number(id), id: Number(transactionId) },
        data: {
          description,
          type,
          value: Number(value),
          date: date ? new Date(date) : transaction?.date,
        },
      });

      res
        .status(200)
        .json({ success: true, msg: "Transação atualizada com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, msg: "Erro ao atualizar a transação!" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id, transactionId } = req.params;

      await db.transaction.delete({
        where: { userId: Number(id), id: Number(transactionId) },
      });

      res
        .status(200)
        .json({ success: true, msg: "Transação excluída com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, msg: "Erro ao excluir a transação!" });
    }
  }
}

export default TransactionsController;
