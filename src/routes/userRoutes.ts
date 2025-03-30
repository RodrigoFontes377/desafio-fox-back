import { Router, Request, Response, NextFunction } from "express";
import {
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
  updateUser,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Rota de registro
router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await registerUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// Rota de login
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await loginUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// Buscar usuário por ID (autenticado)
router.get(
  "/:id",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// Listar todos os usuários (autenticado)
router.get(
  "/",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllUsers(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// Atualizar usuário (autenticado)
router.put(
  "/:id",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateUser(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
