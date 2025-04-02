const Banco = require("./banco");

module.exports = class Cargo {
    constructor() {
        this._idCargo = null;
        this._nomeCargo = null;
    }

    create = async () => {
        const SQL = "INSERT INTO cargo (nomeCargo) VALUES (?)";
        try {
            console.log("Executando create com nomeCargo:", this.nomeCargo); // Adicionando log
            const conexao = Banco.getConexao();
            const [resposta] = await conexao.promise().execute(SQL, [this.nomeCargo]);
            console.log("Resposta da execução do create:", resposta); // Adicionando log
            this.id = resposta.insertId;
            return resposta.affectedRows > 0;
        } catch (error) {
            console.error("Erro no create:", error); // Adicionando log
            return false;
        }
    }

    delete = async () => {
        const SQL = "DELETE FROM cargo WHERE idCargo = ?";
        try {
            console.log("Executando delete com idCargo:", this.idCargo); // Adicionando log
            const conexao = Banco.getConexao();
            const [resposta] = await conexao.promise().execute(SQL, [this.idCargo]);
            console.log("Resposta da execução do delete:", resposta); // Adicionando log
            return resposta.affectedRows > 0;
        } catch (error) {
            console.error("Erro no delete:", error); // Adicionando log
            return false;
        }
    }

    update = async () => {
        const SQL = "UPDATE cargo SET nomeCargo = ? WHERE idCARGO = ?";
        try {
            console.log("Executando update com nomeCargo:", this.nomeCargo, "idCargo:", this.idCargo); // Adicionando log
            const conexao = Banco.getConexao();
            const [resposta] = await conexao.promise().execute(SQL, [this.nomeCargo, this.idCargo]);
            console.log("Resposta da execução do update:", resposta); // Adicionando log
            return resposta.affectedRows > 0;
        } catch (error) {
            console.error("Erro no update:", error); // Adicionando log
            return false;
        }
    }

    isCargo = async () => {
        const SQL = "SELECT COUNT(*) AS qtd FROM cargo WHERE nomeCargo = ?";
        try {
            console.log("Verificando existência do cargo com nomeCargo:", this.nomeCargo); // Adicionando log
            const conexao = Banco.getConexao();
            const [resposta] = await conexao.promise().execute(SQL, [this.nomeCargo]);
            console.log("Resultado da verificação do cargo:", resposta); // Adicionando log
            return resposta[0].qtd > 0;
        } catch (error) {
            console.error("Erro na verificação de cargo:", error); // Adicionando log
            return false;
        }
    }
    isCargoById = async () => {
        const SQL = "SELECT COUNT(*) AS qtd FROM cargo WHERE idCargo = ?";
        try {
            console.log("Verificando existência do cargo com nomeCargo:", this.idCargo); // Adicionando log
            const conexao = Banco.getConexao();
            const [resposta] = await conexao.promise().execute(SQL, [this.idCargo]);
            console.log("Resultado da verificação do cargo:", resposta); // Adicionando log
            return resposta[0].qtd > 0;
        } catch (error) {
            console.error("Erro na verificação de cargo:", error); // Adicionando log
            return false;
        }
    }
    readAll = async () => {
        const SQL = "SELECT * FROM cargo order by nomeCargo";
        try {
            console.log("Buscando todos os cargos..."); // Adicionando log
            const conexao = Banco.getConexao();
            const [matrizRespostas] = await conexao.promise().execute(SQL);
            console.log("Resultado da busca por todos os cargos:", matrizRespostas); // Adicionando log
            return matrizRespostas;
        } catch (error) {
            console.error("Erro ao buscar todos os cargos:", error); // Adicionando log
            return [];
        }
    }

    readById = async () => {
        const SQL = "SELECT * FROM cargo WHERE idCargo = ?";
        try {
            console.log("Buscando cargo pelo ID:", this.idCargo); // Adicionando log
            const conexao = Banco.getConexao();
            const [matrizRespostas] = await conexao.promise().execute(SQL, [this.idCargo]);
            console.log("Resultado da busca pelo ID:", matrizRespostas); // Adicionando log
            return matrizRespostas;
        } catch (error) {
            console.error("Erro ao buscar cargo pelo ID:", error); // Adicionando log
            return [];
        }
    }

    get idCargo() {
        return this._idCargo;
    }
    set idCargo(novoIdCargo) {
        this._idCargo = novoIdCargo;
    }

    get nomeCargo() {
        return this._nomeCargo;
    }
    set nomeCargo(novoCargo) {
        this._nomeCargo = novoCargo;  // Corrigido de _novoCargo para _nomeCargo
    }
}
