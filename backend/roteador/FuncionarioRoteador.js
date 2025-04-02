const express = require("express");
const CargoMiddleware = require("../middleware/CargoMiddleware");
const CargoControle = require("../controle/CargoControle");
const FuncionarioMiddleware = require("../middleware/FuncionarioMiddleware");
const FuncionarioControle = require("../controle/FuncionarioControle");


module.exports = class FuncionarioRoteador {
    constructor() {
        this._router = express.Router();
        this._cargoMiddleware = new CargoMiddleware();
        this._funcionarioControle = new FuncionarioControle();
        this._funcionarioMiddleware = new FuncionarioMiddleware();
        


    }


    criarRotasFuncionario = () => {
        this._router.post("/login/",
            this._funcionarioControle.funcionario_login_controle

        );
        this._router.post("/",
            this._funcionarioMiddleware.validar_nomeFuncionario,
            this._funcionarioMiddleware.is_cargo_By_Id,
            this._funcionarioControle.funcionario_create_controle
            


        );

        this._router.put("/:idFuncionario",
            this._funcionarioMiddleware.validar_nomeFuncionario,
            this._funcionarioControle.funcionario_update_controle


        );

        this._router.delete("/:idFuncionario",
            this.funcionarioControle.funcionario_delete_controle

        );

        this._router.get("/",
            this.funcionarioControle.funcionario_readAll_controle

        );

        this._router.get("/:idFuncionario",
            this.funcionarioControle.funcionario_readById_controle

        );
        return this.router;
    }

    get router() {
        return this._router;
    }
    set router(in_router) {
        this._router = in_router;
    }

    get cargoMiddleware() {
        return this._cargoMiddleware;
    }
    set cargoMiddleware(in_cargoMiddleware) {
        this._cargoMiddleware = in_cargoMiddleware;
    }

    get funcionarioControle() {
        return this._funcionarioControle;
    }
    set funcionarioControle(in_funcionarioControle) {
        this._funcionarioControle = in_funcionarioControle;
    }

    get funcionarioMiddleware() {
        return this._funcionarioMiddleware;
    }
    set funcionarioMiddleware(in_funcionarioMiddleware) {
        this._funcionarioMiddleware = in_funcionarioMiddleware;
    }
}