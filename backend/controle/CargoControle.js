const { response } = require("express");
const Cargo = require("../modelo/cargo");
const { status } = require("express/lib/response");

module.exports = class CargoControle {
    cargo_create_controle = async (request, response) => {
        console.log("CargoControle.cargo_create_controle");
        const cargo = new Cargo();
        cargo.nomeCargo = request.body.cargo.nomeCargo;
        const objResposta = {
            status: true,
            msg: "Cadastrado com sucesso",
            token: null
        }

        const criou = await cargo.create();
        if (criou === false) {
            objResposta.status = false;
            objResposta.msg = "Erro ao cadastrar";
            response.status(500).send(objResposta);
        }else{
            objResposta.token = request.headers.authorization;
            response.status(201).send(objResposta);
        }

    }

    cargo_readAll_controle = async (request, response) => {
        console.log("CargoControle.cargo_readAll_controle()");
        const cargo = new Cargo();
        const objResposta = {
            status: true,
            msg: "Executado com sucesso",
            dados: await cargo.readAll(),
        } 
        response.status(200).send(objResposta);
    }

    cargo_readById_controle = async (request, response) => {
        console.log("CargoControle.cargo_readById_controle()");

        const cargo = new Cargo();
        cargo.idCargo = request.params.idCargo;

        const objResposta = {
            status: true,
            msg: "Executado com sucesso",
            dados: await cargo.readById(),
        } 
        response.status(200).send(objResposta);
    }

    cargo_update_controle = async (request, response) => {
        console.log("CargoControle.cargo_update_controle()");

        const cargo = new Cargo();
        cargo.idCargo = request.params.idCargo;
        cargo.nomeCargo = request.body.cargo.nomeCargo;

        const objResposta = {
            status: await cargo.update(),
            msg: "Executado com sucesso",
        } 
        response.status(200).send(objResposta);
    }

    cargo_delete_controle = async (request, response) => {
        console.log("CargoControle.cargo_delete_controle()");

        const cargo = new Cargo();
        cargo.idCargo = request.params.idCargo;
      

        const objResposta = {
            status: await cargo.delete(),
            msg: "Executado com sucesso",
        } 
        response.status(200).send(objResposta);
    }
}