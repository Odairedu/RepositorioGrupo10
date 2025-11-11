import { MedicamentoService } from "../service/MedicamentoService";
import { app } from "../server";

export function MedicamentoController() {
  const service = new MedicamentoService();

  app.get("/api/medicamento", (req, res) => {
    const medicamento = service.getMedicamento();

    const medicamentoSemSenha = medicamento.map((medicamento) => ({
      id: medicamento.getId(),
      nome: medicamento.getNome(),
      dosagem: medicamento.getDosagem(),
      bula: medicamento.getBula(),
      informacoes: medicamento.getInformacoes(),
      estoque: medicamento.getEstoque(),
      quantidadeMax: medicamento.getQuantidadeMax(),
    }));

    res.json(medicamentoSemSenha);
  });

  app.post("/api/medicamento/criar", (req, res) => {
    try {
      const dadosMedicamento = req.body;
      const novoMedicamento = service.createMedi(dadosMedicamento);
      res.status(201).json({
        status: "Medicamento atualizado com sucesso",
        id: novoMedicamento.getId(),
      });
    } catch (e: any) {
      return res.status(400).json({ erro: e.message });
    }
  });

  app.put("/api/medicamento/:id", (req, res) => {
    try {
      const { id } = req.params;
      const dados = req.body;
      const medicamentoAtualizado = service.atualizarMedicamento(
        id,
        dados
      );

      res.json({
        status: "Medicamento atualizado com sucesso",
        dados: {
          id: medicamentoAtualizado.getId(),
          nome: medicamentoAtualizado.getNome(),
          dosagem: medicamentoAtualizado.getDosagem(),
          bula: medicamentoAtualizado.getBula(),
          informacoes: medicamentoAtualizado.getInformacoes(),
          estoque: medicamentoAtualizado.getEstoque(),
        },
      });
    } catch (e: any) {
      return res.status(404).json({ erro: e.message });
    }
  });

  app.get("/api/medicamento/filtrar", (req, res) => {
    const { nome, dosagem, bula, informacoes, estoque } = req.query;

    // Filtro por nome (retorna lista)
    if (nome) {
      const medicamento = service.getMedicamentoByNome(nome as string);
      if (!medicamento) {
        return res.status(404).json({ mensagem: "Nenhum medicamento encontrado" });
      }
      const medicamentoSemSenha = medicamento.map((medicamento) => ({
        id: medicamento.getId(),
        nome: medicamento.getNome(),
        dosagem: medicamento.getDosagem(),
        bula: medicamento.getBula(),
        informacoes: medicamento.getInformacoes(),
        estoque: medicamento.getEstoque(),
        quantidadeMax: medicamento.getQuantidadeMax(),
      }));
      return res.status(200).json(medicamentoSemSenha);
    }

    // Filtrar por Dosagem (retorna lista)
    if (dosagem) {
      const medicamento = service.getMedicamentoByDosagem(dosagem as string);
      if (!medicamento) {
        return res.status(404).json({ mensagem: "Nenhum medicamento encontrado" });
      }
      const medicamentoSemSenha = medicamento.map((medicamento) => ({
        id: medicamento.getId(),
        nome: medicamento.getNome(),
        dosagem: medicamento.getDosagem(),
        bula: medicamento.getBula(),
        informacoes: medicamento.getInformacoes(),
        estoque: medicamento.getEstoque(),
        quantidadeMax: medicamento.getQuantidadeMax(),
      }));
      return res.status(200).json(medicamentoSemSenha);
    }

    // Filtro por bula (retorna lista)
    if (bula) {
      const medicamento = service.getMedicamentoByBula(bula as string);
      if (!medicamento) {
        return res.status(404).json({ mensagem: "Nenhum medicamento encontrado" });
      }
      const medicamentoSemSenha = medicamento.map((medicamento) => ({
        id: medicamento.getId(),
        nome: medicamento.getNome(),
        dosagem: medicamento.getDosagem(),
        bula: medicamento.getBula(),
        informacoes: medicamento.getInformacoes(),
        estoque: medicamento.getEstoque(),
        quantidadeMax: medicamento.getQuantidadeMax(),
      }));
      return res.status(200).json(medicamentoSemSenha);
    }

    // Filtro por informacoes (retorna lista)
    if (informacoes) {
      const medicamento = service.getMedicamentoByInformacoes(informacoes as string);
      if (!medicamento) {
        return res.status(404).json({ mensagem: "Nenhum medicamento encontrado" });
      }
      const medicamentoSemSenha = medicamento.map((medicamento) => ({
        id: medicamento.getId(),
        nome: medicamento.getNome(),
        dosagem: medicamento.getDosagem(),
        bula: medicamento.getBula(),
        informacoes: medicamento.getInformacoes(),
        estoque: medicamento.getEstoque(),
        quantidadeMax: medicamento.getQuantidadeMax(),
      }));
      return res.status(200).json(medicamentoSemSenha);
   
    }
    return res.status(400).json({
      mensagem:
        "Parâmetros de busca inválidos. Use: nome, dosagem, bula, informacoes ou estoque",
    });
  });
}
