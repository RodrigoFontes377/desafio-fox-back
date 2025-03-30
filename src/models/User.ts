import { Schema, model } from "mongoose";

const userSchema = new Schema({
  nome: { type: String, required: true },
  telefone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  nomeUsuario: { type: String, required: true, unique: true },
});

export const User = model("User", userSchema);
