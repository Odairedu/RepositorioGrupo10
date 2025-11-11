import express from "express";
import path from "path";
import { FuncionarioController } from "./controller/FuncionarioController";
import { MedicamentoController } from "./controller/MedicamentoController";

export const app = express();

// Middleware para processar JSON
app.use(express.json());

// Middleware para servir arquivos estáticos (HTML, CSS, imagens)
app.use(express.static(path.join(__dirname, "../public")));
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// Inicializar os controllers
FuncionarioController();
MedicamentoController();

const PORT = 3010;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta 3010");
  console.log("Acesse: http://localhost:3000/index.html");
});
