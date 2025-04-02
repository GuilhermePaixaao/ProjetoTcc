const { status } = require("express/lib/response");
const MeuTokenJWT = require('../modelo/MeuTokenJWT')
//const funcionario = require("../modelo/Funcionario");
//const Cargo = require("../modelo/cargo");

module.exports = class VisitanteMiddleware {
    validar_nomeVisitante = async (request, response, next) => {
        const nomeVisitante = request.body.visitante.nomeVisitante;

        if (!nomeVisitante || nomeVisitante.length < 3) {
            return response.status(400).send({
                status: false,
                msg: "O nome do visitante deve ter pelo menos 3 caracteres.",
            });
        }
        next();
    };

    validar_rgVisitante = (request, response, next) => {
        const rgVisitante = request.body.visitante.rgVisitante;

        if (!rgVisitante || rgVisitante.length < 5) {
            return response.status(400).send({
                status: false,
                msg: "O RG do visitante deve ter pelo menos 5 caracteres.",
            });
        }
        next();
    };

    validar_entrada = (request, response, next) => {
        const horarioEntrada = request.body.visitante.horarioEntrada;

        if (!horarioEntrada) {
            return response.status(400).send({
                status: false,
                msg: "O horário de entrada deve ser informado.",
            });
        }
        next();
    };
};
