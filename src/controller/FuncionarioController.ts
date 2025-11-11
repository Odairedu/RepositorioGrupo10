import { app } from "../server";
import { FuncionarioService } from "../service/FuncionarioService";

export function FuncionarioController() {
  const service = new FuncionarioService();

  app.get("/api/funcionarios/ver", (req, res) => {
    const funcionario = service.getFuncionarios();

    const funcionarioSemSenha = funcionario.map((funcionario) => ({
      id: funcionario.getId(),
      nome: funcionario.getNome(),
      email: funcionario.getEmail(),
      cargo: funcionario.getCargo(),
    }));

    res.json(funcionarioSemSenha);
  });

  app.post("/api/funcionarios/cadastro", (req, res) => {
    try {
      const dadosfuncionario = req.body;
      const novofuncionario = service.createUser(dadosfuncionario);
      res.status(201).json({
        status: "Funcionario criado com sucesso",
        id: novofuncionario.getId(),
      });
    } catch (e: any) {
      return res.status(400).json({ erro: e.message });
    }
  });

  app.put("/api/funcionarios/:email", (req, res) => {
    try {
      const { email } = req.params;
      const dados = req.body;
      const funcionarioAtualizado = service.updateUser(email, dados);

      res.json({
        status: "Funcionario atualizado com sucesso",
        dados: {
          id: funcionarioAtualizado.getId(),
          nome: funcionarioAtualizado.getNome(),
          email: funcionarioAtualizado.getEmail(),
          cargo: funcionarioAtualizado.getCargo(),
        },
      });
    } catch (e: any) {
      return res.status(404).json({ erro: e.message });
    }
  });

  app.post("/api/funcionarios/autenticacao", (req, res) => {
    try {
      const { email, senha } = req.body;
      const funcionario = service.autenticar(email, senha);

      res.json({
        status: "Autenticado com sucesso",
        dados: {
          id: funcionario.getId(),
          nome: funcionario.getNome(),
          email: funcionario.getEmail(),
          cargo: funcionario.getCargo(),
        },
      });
    } catch (e: any) {
      return res.status(401).json({ erro: e.message || "Não autorizado" });
    }
  });
}
