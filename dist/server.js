"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const FuncionarioController_1 = require("./controller/FuncionarioController");
const MedicamentoController_1 = require("./controller/MedicamentoController");
exports.app = (0, express_1.default)();
// Middleware para processar JSON
exports.app.use(express_1.default.json());
// Middleware para servir arquivos estáticos (HTML, CSS, imagens)
exports.app.use(
  express_1.default.static(path_1.default.join(__dirname, "../public"))
);
exports.app.use(
  "/assets",
  express_1.default.static(path_1.default.join(__dirname, "../assets"))
);
// Inicializar os controllers
(0, FuncionarioController_1.FuncionarioController)();
(0, MedicamentoController_1.MedicamentoController)();
const PORT = 3000;
exports.app.listen(PORT, () => {
  console.log("Servidor rodando na porta 3000");
  console.log(
    "Acesse: https://grupo10projeto20252.escolatecnicaadelia.info/api/index.html"
  );
});
