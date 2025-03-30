import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
