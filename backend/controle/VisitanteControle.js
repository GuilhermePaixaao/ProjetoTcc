const Visitante = require("../modelo/Visitante");
const { response } = require("express");
const Cargo = require("../modelo/cargo");
const { status } = require("express/lib/response");


module.exports = class VisitanteControle {
    
    visitante_create_controle = async (request, response) => {
        console.log("VisitanteControle.visitante_create_controle()");
        
        const visitante = new Visitante();
        visitante.nomeVisitante = request.body.visitante.nomeVisitante;
        visitante.rgVisitante = request.body.visitante.rgVisitante;
        visitante.empresaVisitante = request.body.visitante.empresaVisitante;
        visitante.origemVisitante = request.body.visitante.origemVisitante;

        const objResposta = {
            status: true,
            msg: "Visitante cadastrado com sucesso!",
        };

        const criou = await visitante.create();
        if (!criou) {
            objResposta.status = false;
            objResposta.msg = "Erro ao cadastrar visitante.";
            response.status(500).send(objResposta);
        } else {
            response.status(201).send(objResposta);
        }
    };

    visitante_readAll_controle = async (request, response) => {
        console.log("VisitanteControle.visitante_readAll_controle()");
        
        const visitante = new Visitante();
        const objResposta = {
            status: true,
            msg: "Consulta realizada com sucesso!",
            dados: await visitante.readAll(),
        };
        response.status(200).send(objResposta);
    };

    visitante_readById_controle = async (request, response) => {
        console.log("VisitanteControle.visitante_readById_controle()");
        
        const visitante = new Visitante();
        visitante.idVisitante = request.params.idVisitante;

        const objResposta = {
            status: true,
            msg: "Consulta realizada com sucesso!",
            dados: await visitante.readById(),
        };
        response.status(200).send(objResposta);
    };

    visitante_updateSaida_controle = async (request, response) => {
        console.log("VisitanteControle.visitante_updateSaida_controle()");
        
        const visitante = new Visitante();
        visitante.idVisitante = request.params.idVisitante;

        const objResposta = {
            status: await visitante.updateSaida(),
            msg: "Horário de saída atualizado com sucesso!",
        };

        response.status(200).send(objResposta);
    };

    visitante_delete_controle = async (request, response) => {
        console.log("VisitanteControle.visitante_delete_controle()");
        
        const visitante = new Visitante();
        visitante.idVisitante = request.params.idVisitante;

        const objResposta = {
            status: await visitante.delete(),
            msg: "Visitante excluído com sucesso!",
        };

        response.status(200).send(objResposta);
    };
};
