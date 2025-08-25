import express from "express";
import authRoutes from "./routers/auth_router.js";

const app = express();
app.use(express.json());

//Rotas de autenicaçaõ
app.use("/auth", authRoutes)

//Porta
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))