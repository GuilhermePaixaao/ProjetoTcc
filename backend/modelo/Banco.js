const mysql = require("mysql2");

module.exports = class Banco {
    static HOST = "127.0.0.1";
    static USER = "root";
    static PASSWORD = "";
    static DATABASE = "tccteste1";
    static PORT = 3306;
    static CONEXAO = null;

    static conectar() {
        console.log("Tentando conectar ao banco de dados..."); 
        Banco.CONEXAO = mysql.createConnection({
            host: Banco.HOST,
            user: Banco.USER,
            password: Banco.PASSWORD,
            database: Banco.DATABASE,
            port: Banco.PORT
        });
        console.log("Conexão com banco de dados estabelecida.");
    }

    static getConexao() {
        console.log("Verificando conexão...");
        if (Banco.CONEXAO === null) {
            console.log("Conexão não encontrada. Conectando...");
            Banco.conectar();
        } else {
            console.log("Conexão existente.");
        }
        return Banco.CONEXAO;
    }
};
