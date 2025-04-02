const express = require("express");
const CargoMiddleware = require("../middleware/CargoMiddleware");
const CargoControle = require("../controle/CargoControle");
const JwtMiddleware = require("../middleware/JwtMiddleware");


module.exports = class CargoRoteador {
    constructor() {
        this._router = express.Router();
        this._cargoMiddleware = new CargoMiddleware();
        this._controleCargo = new CargoControle();
        this._jwtMiddleware = new JwtMiddleware();
					

    }

    criarRotasCargo = () => {
        this._router.post("/",
            this._jwtMiddleware.validar_token_acesso,
            this._cargoMiddleware.validar_nomeCargo,
            this._cargoMiddleware.validar_cargo_nao_existe,
            this._controleCargo.cargo_create_controle

        );

        this._router.get("/",
            this.controleCargo.cargo_readAll_controle

        );

        this._router.get("/:idCargo",
            this.controleCargo.cargo_readById_controle

        );

        this._router.put("/:idCargo",
            this.controleCargo.cargo_update_controle

        );

        this._router.delete("/:idCargo",
            this.controleCargo.cargo_delete_controle

        );
        return this._router;
        
    }

    get jwtMiddleware() {
        return this._jwtMiddleware;
    }
    set jwtMiddleware(in_jwtMiddleware) {
        this._jwtMiddleware = in_jwtMiddleware;
    }

    get controleCargo(){
        return this._controleCargo;
    }
    set controleCargo(_controleCargo){
        return this._controleCargo = _controleCargo;
    }



    get cargoMiddleware(){
        return this._cargoMiddleware;
    }
    set cargoMiddleware(_cargoMiddleware){
        return this._cargoMiddleware = _cargoMiddleware;
    }

    



    get router(){
        return this._router;
    }
    set router(router){
        return this._router = router;
    }
}