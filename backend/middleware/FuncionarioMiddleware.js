const { status } = require("express/lib/response");
const funcionario = require("../modelo/Funcionario");
const Cargo = require("../modelo/cargo");


module.exports = class FuncionarioMiddleware{
    validar_nomeFuncionario = (request, response, next) => {
        const nomeFuncionario = request.body.funcionario.nomeFuncionario;
        const regexF = /[^a-zA-Z\u00C0-\u00FF -]/;
        // Verifica se o nome tem menos de 3 caracteres
        if (nomeFuncionario.length < 3) {
            return response.status(400).send({
                status: false,
                msg: "O nome deve possuir mais do que 3 caracteres."
            });
        }
        // Verifica se o nome contém números ou caracteres especiais
        if (regexF.test(nomeFuncionario)) {
            return response.status(400).send({
                status: false,
                msg: "O nome não deve possuir números ou caracteres especiais."
            });
        }
        next();
        

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