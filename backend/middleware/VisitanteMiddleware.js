const { status } = require("express/lib/response");
const MeuTokenJWT = require('../modelo/MeuTokenJWT')
//const funcionario = require("../modelo/Funcionario");
//const Cargo = require("../modelo/cargo");

module.exports = class VisitanteMiddleware {
    //Testes Para visitante{
    validar_nomeVisitante = async (request, response, next) => {
        const nomeVisitante = request.body.visitante.nomeVisitante;
        const regex = /[^a-zA-ZÀ-ÖØ-öø-ÿ -]/;
        if (!nomeVisitante || nomeVisitante.length < 3) {
            return response.status(400).send({
                status: false,
                msg: "O nome do visitante deve ter pelo menos 3 caracteres.",
            });
        }else if(regex.test(nomeVisitante)){
            return response.status(400).send({
                status:false,
                msg:"Não pode conter números ou caracteres especiais."
            });
        }
        next();
    };
    //}


    validar_rgVisitante = (request, response, next) => {
        const rgVisitante = request.body.visitante.rgVisitante;
        //                    XX. XXX  . XXX - X
        const regexRG = /^\d{2}\.\d{3}\.\d{3}-\d{1}$/;
        if (!rgVisitante || !regexRG.test(rgVisitante)) {
            return response.status(400).send({
                status: false,
                msg: "O RG deve estar no formato xx.xxx.xxx-x",
            });
        }
        next();
    };

    validar_entrada = (request, response, next) => {
        const horarioEntrada = request.body.visitante.horarioEntrada;
        //Limitar somente para XX:XX
        const regexH = /^[0-9:]+$/
        if (!horarioEntrada) {
            return response.status(400).send({
                status: false,
                msg: "O horário de entrada deve ser informado.",
            });
        }else if(!regexH.test(horarioEntrada)){
            return response.status(400).send({
                status: false,
                msg: "O horário deve conter apenas números e no formato (xx:xx).",
            });
        }
        next();
    };
};
