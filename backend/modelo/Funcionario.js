const Banco = require("./banco");
const Cargo = require("./cargo");

module.exports = class Funcionario {
    constructor() {
        this._idFuncionario = null;
        this._cargo = new Cargo
        this._nomeFuncionario = null;
        this._email = null;
        this._senha = null;

    }

    create = async () => {
        console.log("Funcionario.create()")
        const SQL = "INSERT INTO Funcionario (Cargo_idCargo, nomeFuncionario, emailFuncionario, senhaFuncionario) values (?,?,?,md5(?));"
        try {
            const [resultado] = await Banco.getConexao().promise().execute(SQL, [this.cargo.idCargo,this.nomeFuncionario, this.email, this.senha]);
            this.idFuncionario = resultado.insertId;
            return resultado.affectedRows > 0;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    delete = async () => {
        console.log("Funcionario.delete()")
        const SQL = "DELETE from funcionario where idFuncionario = ?"
        try {
            const [resultado] = await Banco.getConexao().promise().execute(SQL, [this.idFuncionario]);
            this.idFuncionario = resultado.insertId;
            return resultado.affectedRows > 0;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    update = async () => {
        console.log("Funcionario.update()")
        const SQL = "UPDATE funcionario SET nomeFuncionario = ?, emailFuncionario=?, senhaFuncionario=md5(?), Cargo_idCargo =? WHERE idFuncionario = ?";
        try {
            const [resultado] = await Banco.getConexao().promise().execute(SQL, [this.nomeFuncionario,this.email,this.senha,this.cargo.idCargo, this.idFuncionario]);
            this.idFuncionario = resultado.insertId;
            return resultado.affectedRows > 0;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    readAll = async () => {
        console.log("Funcionario.readAll()")
        const SQL = "SELECT * FROM funcionario;";
        try {
            const [resultado] = await Banco.getConexao().promise().execute(SQL, []);
            return resultado;
        } catch (error) {
            console.log(error)
            return [];
        }
    }

    readById = async () => {
        console.log("Funcionario.readById()")
        const SQL = "SELECT * FROM funcionario where idFuncionario = ?";
        try {
            const [resultado] = await Banco.getConexao().promise().execute(SQL, [this.idFuncionario]);
            return resultado;
        } catch (error) {
            console.log(error)
            return [];
        }
    }

    login = async () => {
        console.log("Funcionario.readById()")
        
        const SQL = "SELECT COUNT(*) AS qtd, idFuncionario, nomeFuncionario, idCargo, nomeCargo FROM Funcionario JOIN cargo ON cargo.idCargo = funcionario.Cargo_idCargo where emailFuncionario=? and senhaFuncionario= md5(?);";
        try {
            const [resultado] = await Banco.getConexao().promise().execute(SQL, [this.email,this.senha]);
            if(resultado.length > 0 && resultado[0].qtd ===1){
                this.idFuncionario = resultado[0].idFuncionario;
                this.nomeFuncionario = resultado[0].nomeFuncionario;
                this.cargo.idCargo = resultado[0].idCargo;
                this.cargo.nomeCargo = resultado[0].nomeCargo;
                return true;
            }
                return false;
        } catch (error) {
            console.log(error)
            return [];
        }
    }








    get idFuncionario() {
        return this._idFuncionario;
    }
    set idFuncionario(in_idFuncionario) {
        this._idFuncionario = in_idFuncionario;
    }

    get cargo() {
        return this._cargo;
    }
    set cargo(in_cargo) {
        this._cargo = in_cargo;
    }

    get nomeFuncionario() {
        return this._nomeFuncionario;
    }
    set nomeFuncionario(in_nomeFuncionario) {
        this._nomeFuncionario = in_nomeFuncionario;
    }

    get email() {
        return this._email;
    }
    set email(in_email) {
        this._email = in_email;
    }

    get senha() {
        return this._senha;
    }
    set senha(in_senha) {
        this._senha = in_senha;
    }

}