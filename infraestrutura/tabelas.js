//Arquivo responsável pela criação de tabelas no banco de dados
class Tabelas {

    //Iniciando
    init(conexao){
        this.conexao = conexao

        this.criarAtendimentos()
    }

    //Criando Tabela Atendimentos
    criarAtendimentos(){ 
        
        //Query com comandos para criação da tabela
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos(id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'  

        //Testando se a tabela foi criada
        this.conexao.query(sql, (erro) => {
            if (erro){
                console.log(erro)
            } else {
                console.log('Tabela Atendimentos criada com sucesso')
            }
        })
    }
}

//Exportando a classe tabela para outros modulos
module.exports = new Tabelas