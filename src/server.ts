import express, { Request, Response } from "express";
import cors from "cors";
import UserController from "./controllers/user.controller";
import TransactionsController from "./controllers/transactions.controller";
import userCreateMiddleware from "./middlewares/user.middlewares/user-create.middleware";
import userUpdateMiddleware from "./middlewares/user.middlewares/user-update.middleware";
import userDeleteMiddleware from "./middlewares/user.middlewares/user-delete.middleware";
import transactionCreateMiddleware from "./middlewares/transactions.middlewares/transaction-create.middleware";
import transactionUpdateMiddleware from "./middlewares/transactions.middlewares/transaction-update.middleware";
import transactionDeleteMiddleware from "./middlewares/transactions.middlewares/transaction-delete.middleware";
import auth from "./middlewares/auth.middlewares/auth.middleware";
import AuthController from "./controllers/auth.controller";

const app = express();
const port = 3333;
const host = "localhost";

app.use(cors());
app.use(express.json());

app.listen(port, host, () => {
  console.log(`Server up ! http://${host}:${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: true, msg: "nikel back-end" });
});

// Auth Routes
const authController = new AuthController();
app.post("/login", authController.create);

// User Route
const userController = new UserController();
app.post("/user", userCreateMiddleware, userController.create);
app.put("/user/:id", auth, userUpdateMiddleware, userController.update);
app.delete("/user/:id", auth, userDeleteMiddleware, userController.delete);

// Transactions Route
const transactionsController = new TransactionsController();
app.post(
  "/transactions/:id",
  auth,
  transactionCreateMiddleware,
  transactionsController.create
);

app.get("/transactions/:id", auth, transactionsController.index);
app.put(
  "/transactions/:id/:transactionId",
  auth,
  transactionUpdateMiddleware,
  transactionsController.update
);
app.delete(
  "/transactions/:id/:transactionId",
  auth,
  transactionDeleteMiddleware,
  transactionsController.delete
);
