const MeuTokenJWT = require('../modelo/MeuTokenJWT'); // Ajuste o caminho conforme necessário

module.exports = class JwtMiddleware {
    // Função para validar o token de acesso
    validar_token_acesso = (request, response, next) => {
        const authorization = request.headers.authorization; // Pega o token do cabeçalho

        if (!authorization) {
            return response.status(401).send({ status: false, msg: "Token não fornecido" });
        }

        const jwtInstance = new MeuTokenJWT();
        const autorizado = jwtInstance.validarToken(authorization);

        if (autorizado) {
            const payload = jwtInstance.payload;
            const obj = {
                email: payload.email,
                role: payload.role, 
                name: payload.name,
            };
            request.headers.authorization = jwtInstance.gerarToken(obj); // Gera novo token
            next();
        } else {
            response.status(401).send({ status: false, msg: "Token inválido" });
        }
    };

    // Função para verificar se o usuário está autenticado
    verificarToken = (request, response, next) => {
        const authorization = request.headers.authorization;

        if (!authorization) {
            return response.status(401).send({ status: false, msg: "Token não fornecido" });
        }

        const jwtInstance = new MeuTokenJWT();
        const autorizado = jwtInstance.validarToken(authorization);

        if (autorizado) {
            next();
        } else {
            response.status(401).send({ status: false, msg: "Token inválido" });
        }
    };
};
