import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { nome, telefone, email, senha, nomeUsuario } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "Usuário já existe" });

    const hashedPassword = await bcrypt.hash(senha, 10);

    await User.create({
      nome,
      telefone,
      email,
      senha: hashedPassword,
      nomeUsuario,
    });

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(401).json({ message: "Senha inválida" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if ((req as any).user.id !== id) {
    return res
      .status(403)
      .json({ message: "Você não tem permissão para atualizar este usuário." });
  }

  try {
    const updated = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-senha -__v");

    if (!updated)
      return res.status(404).json({ message: "Usuário não encontrado" });

    res.json({ message: "Usuário atualizado com sucesso", user: updated });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
