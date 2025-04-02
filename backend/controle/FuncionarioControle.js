const Cargo = require("../modelo/cargo");
const Funcionario = require("../modelo/Funcionario");
const MeuTokenJWT = require("../modelo/MeuTokenJWT");

module.exports = class FuncionarioControle {

    funcionario_login_controle = async (request, response) => {
        console.log("FuncionarioControle.funcionario_login_controle");
        const funcionario = new Funcionario();
        funcionario.senha = request.body.funcionario.senha;
        funcionario.email = request.body.funcionario.email;

        const objResposta = {
            status: true,
            msg: "Autenticado com sucesso",
            token: null,
        }

        const logou = await funcionario.login();
        if (logou === false) {
            objResposta.status = false;
            objResposta.msg = "Email ou senha Invalidos";
            response.status(401).send(objResposta);
        } else {
            const jwt = new MeuTokenJWT();
            const obj = {
                email: funcionario.email,
                role: funcionario.cargo.nomeCargo,
                name: funcionario.nomeFuncionario,
                idFuncionario: funcionario.idFuncionario
            }
            objResposta.token = jwt.gerarToken(obj);
            response.status(200).send(objResposta);
        }
    }
    funcionario_create_controle = async (request, response) => {
        console.log("FuncionarioControle.funcionario_create_controle");
        const funcionario = new Funcionario();
        funcionario.nomeFuncionario = request.body.funcionario.nomeFuncionario;
        funcionario.senha = request.body.funcionario.senha;
        funcionario.email = request.body.funcionario.email;
        funcionario.cargo.idCargo = request.body.funcionario.idCargo;

        const objResposta = {
            status: true,
            msg: "Cadastrado com sucesso",
        }

        const criou = await funcionario.create();
        if (criou === false) {
            objResposta.status = false;
            objResposta.msg = "Erro ao cadastrar";
            response.status(500).send(objResposta);
        } else {
            response.status(201).send(objResposta);
        }
    }
    funcionario_readAll_controle = async (request, response) => {
        console.log("FuncionarioControle.funcionario_readAll_controle()");
        const funcionario = new Funcionario();
        const objResposta = {
            status: true,
            msg: "Executado com sucesso",
            dados: await funcionario.readAll(),
        }
        response.status(200).send(objResposta);
    }

    funcionario_readById_controle = async (request, response) => {
        console.log("FuncionarioControle.funcionario_readById_controle()");

        const funcionario = new Funcionario();
        funcionario.idFuncionario = request.params.idFuncionario;

        const objResposta = {
            status: true,
            msg: "Executado com sucesso",
            dados: await funcionario.readById(),
        } 
        response.status(200).send(objResposta);
    }

    funcionario_update_controle = async (request, response) => {
        console.log("FuncionarioControle.funcionario_update_controle()");

        const funcionario = new Funcionario();
        funcionario.idFuncionario = request.params.idFuncionario;
        funcionario.nomeFuncionario = request.body.funcionario.nomeFuncionario;
        funcionario.senha = request.body.funcionario.senha;
        funcionario.email = request.body.funcionario.email;
        funcionario.cargo.idCargo = request.body.funcionario.idCargo;


        const objResposta = {
            status: await funcionario.update(),
            msg: "Executado com sucesso",
        } 
        response.status(200).send(objResposta);
    }

    funcionario_delete_controle = async (request, response) => {
        console.log("FuncionarioControle.funcionario_delete_controle()");

        const funcionario = new Funcionario();
        funcionario.idFuncionario = request.params.idFuncionario;
      

        const objResposta = {
            status: await funcionario.delete(),
            msg: "Executado com sucesso",
        } 
        response.status(200).send(objResposta);
    }



}