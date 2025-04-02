const express = require("express");
const CargoRoteador = require("./backend/roteador/CargoRoteador");
const FuncionarioRoteador = require("./backend/roteador/FuncionarioRoteador");
const VisitanteRoteador = require("./backend/roteador/VisitanteRoteador"); // Adicionando VisitanteRoteador

module.exports = class Servidor {
    constructor() {
        this._porta = 8080;
        this._app = express();

        this._app.use(express.json()); // Middleware para transformar JSON em objeto
        this._app.use(express.static('frontend')); // Pasta para arquivos estáticos (frontend)

        this._cargoRoteador = new CargoRoteador();
        this._funcionarioRoteador = new FuncionarioRoteador();
        this._visitanteRoteador = new VisitanteRoteador(); // Criando instância do VisitanteRoteador

        this.configurarRotas();
    }

    configurarRotas = () => {
        this._app.use("/cargos", this._cargoRoteador.criarRotasCargo());
        this._app.use("/funcionarios", this._funcionarioRoteador.criarRotasFuncionario());
        this._app.use("/visitantes", this._visitanteRoteador.criarRotasVisitante()); // Adicionando rota de visitantes
    }

    iniciar = () => {
        this._app.listen(this._porta, () => {
            console.log("API Rodando em http://localhost:" + this._porta + "/");
        })
    }
}
