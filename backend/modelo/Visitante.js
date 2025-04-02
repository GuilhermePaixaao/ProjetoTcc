const Banco = require("./banco");

module.exports = class Visitante {
    constructor() {
        this._idVisitante = null;
        this._nomeVisitante = null;
        this._rgVisitante = null;
        this._empresaVisitante = null;
        this._origemVisitante = null;
        this._horarioEntrada = null;
        this._horarioSaida = null;
    }

    // Criação de um novo visitante
    create = async () => {
        const SQL = "INSERT INTO Visitante (nome, rg, empresa, origem, horarioEntrada) VALUES (?, ?, ?, ?, NOW());";
        try {
            const [resultado] = await Banco.getConexao().promise().execute(SQL, 
                [this.nomeVisitante, this.rgVisitante, this.empresaVisitante, this.origemVisitante]);
            this.idVisitante = resultado.insertId;
            return resultado.affectedRows > 0;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // Atualiza o horário de saída do visitante
    updateSaida = async () => {
        const SQL = "UPDATE Visitante SET horarioSaida = NOW() WHERE idVisitante = ?;";
        try {
            const [resultado] = await Banco.getConexao().promise().execute(SQL, [this.idVisitante]);
            return resultado.affectedRows > 0;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // Lê todos os visitantes
    readAll = async () => {
        const SQL = "SELECT * FROM Visitante;";
        try {
            const [resultado] = await Banco.getConexao().promise().execute(SQL, []);
            return resultado;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    // Lê um visitante específico pelo ID
    readById = async () => {
        const SQL = "SELECT * FROM Visitante WHERE idVisitante = ?;";
        try {
            const [resultado] = await Banco.getConexao().promise().execute(SQL, [this.idVisitante]);
            return resultado;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    // Getters and Setters
    get idVisitante() { return this._idVisitante; }
    set idVisitante(value) { this._idVisitante = value; }

    get nomeVisitante() { return this._nomeVisitante; }
    set nomeVisitante(value) { this._nomeVisitante = value; }

    get rgVisitante() { return this._rgVisitante; }
    set rgVisitante(value) { this._rgVisitante = value; }

    get empresaVisitante() { return this._empresaVisitante; }
    set empresaVisitante(value) { this._empresaVisitante = value; }

    get origemVisitante() { return this._origemVisitante; }
    set origemVisitante(value) { this._origemVisitante = value; }

    get horarioEntrada() { return this._horarioEntrada; }
    set horarioEntrada(value) { this._horarioEntrada = value; }

    get horarioSaida() { return this._horarioSaida; }
    set horarioSaida(value) { this._horarioSaida = value; }
};
