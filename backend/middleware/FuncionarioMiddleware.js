const { status } = require("express/lib/response");
const funcionario = require("../modelo/Funcionario");
const Cargo = require("../modelo/cargo");


module.exports = class FuncionarioMiddleware{
    validar_nomeFuncionario = (request, response, next) => {
        const nomeFuncionario = request.body.funcionario.nomeFuncionario;

        if (nomeFuncionario.length < 3) {
            const objResposta = {
                status: false,
                msg: "o nome deve possuir mais do que 3 caracteres"
            }
            response.status(400).send(objResposta);
        } else {
            next();
        }

    }

    is_cargo_By_Id = async(request,response,next) => {
        const cargo = new Cargo();
        cargo.idCargo = request.body.funcionario.idCargo;
        const existe = await cargo.isCargoById();
        if(existe=== true){
            next();
        }else{
            const objResposta ={
                status: false,
                msg: "Cargo informado nao existe"
            }
            response.status(400).send(objResposta)
        }


    }
}