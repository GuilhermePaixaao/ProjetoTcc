const express = require("express");
const VisitanteMiddleware = require("../middleware/VisitanteMiddleware");
const VisitanteControle = require("../controle/VisitanteControle");
const MeuTokenJWT = require("../modelo/MeuTokenJWT");
const JwtMiddleware = require("../middleware/JwtMiddleware");
module.exports = class VisitanteRoteador {
    constructor() {
        this._router = express.Router();
        this._visitanteControle = new VisitanteControle();
        this._visitanteMiddleware = new VisitanteMiddleware();
        this._jwt = new JwtMiddleware();
    }

    criarRotasVisitante = () => {
        // Rota POST para cadastro de visitante (somente funcionários podem cadastrar)
        this._router.post("/",
            this._jwt.verificarToken, // Verifica o token JWT do usuário
           // this._visitanteMiddleware.validarnomeVisitante, // Valida o nome do visitante
            this._visitanteMiddleware.validar_nomeVisitante,
            this._visitanteMiddleware.validar_rgVisitante, // Valida o RG do visitante
            this._visitanteMiddleware.validar_entrada, // Valida a entrada do visitante
            this._visitanteControle.visitante_create_controle // Chama a lógica do controlador
        );

        // Rota GET para buscar todos os visitantes (somente administradores podem acessar)
        this._router.get("/",
            this._jwt.verificarToken, // Verifica o token JWT
         // Verifica se o usuário é administrador
            this._visitanteControle.visitante_readAll_controle // Chama a lógica do controlador
        );

        // Rota GET para buscar visitante por ID (somente administradores podem acessar)
        this._router.get("/:idVisitante",
            this._jwt.verificarToken, // Verifica o token JWT
             // Verifica se o usuário é administrador
            this._visitanteControle.visitante_readById_controle // Chama a lógica do controlador
        );

        // Rota PUT para atualizar dados de visitante (somente administradores podem acessar)
        this._router.put("/:idVisitante",
            this._jwt.verificarToken, // Verifica o token JWT
            // Verifica se o usuário é administrador
            this._visitanteMiddleware.validar_nomeVisitante, // Valida o nome do visitante
            this._visitanteControle.visitante_updateSaida_controle // Chama a lógica do controlador
        );

        // Rota DELETE para excluir visitante (somente administradores podem excluir)
        this._router.delete("/:idVisitante",
            this._jwt.verificarToken, // Verifica o token JWT
       
            this._visitanteControle.visitante_delete_controle // Chama a lógica do controlador
        );

        return this._router; // Retorna o roteador
    }

    get router() {
        return this._router; // Getter para acessar o roteador
    }
}
