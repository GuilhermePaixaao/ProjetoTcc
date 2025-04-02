const { request, response } = require("express");
const { status } = require("express/lib/response");
const Cargo = require("../modelo/cargo");

module.exports = class CargoMiddleware {
    validar_nomeCargo = (request, response, next) => {
        const nomeCargo = request.body.cargo.nomeCargo;

        if (nomeCargo.length < 3) {
            const objResposta = {
                status: false,
                msg: "o nome deve possuir mais do que 3 caracteres"
            }
            response.status(400).send(objResposta);
        } else {
            next();
        }
    }

    validar_cargo_nao_existe = async(request, response, next) => {
        const nomeCargo = request.body.cargo.nomeCargo;
        const cargo = new Cargo();
        cargo.nomeCargo = nomeCargo;
        const existe = await cargo.isCargo();

        if (existe === true) {
            const objResposta = {
                status: false,
                msg: "ja existe um cargo cadastrado com esse nome"
            }
            response.status(400).send(objResposta);
        } else {
            next();
        }
    }
}