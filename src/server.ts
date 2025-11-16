import express from "express";
import path from "path";
import { FuncionarioController } from "./controller/FuncionarioController";
import { MedicamentoController } from "./controller/MedicamentoController";

export const app = express();

// Middleware para processar JSON
app.use(express.json());

// Inicializar os controllers
FuncionarioController();
MedicamentoController();

const PORT = 3010;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta 3010");
});
