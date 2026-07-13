const prompt = require('prompt-sync')();
const banco = require('./conexao');


class Usuario{

    async cadastrarUsuario(cpf, nome, data_nascimento, email, telefone, login, senha){
       
        try{ 
        const sql = 'INSERT INTO universidade.usuario(cpf, nome, data_nascimento, email, telefone, login, senha) VALUES($1, $2, $3, $4, $5, $6, $7)';
        await banco.query(sql, [cpf, nome, data_nascimento, email, telefone, login, senha]);
        console.log("\nUsuário cadastrado com sucesso.");
        }
        catch(erro){
            console.log("Erro ao cadastrar usuário:", erro.message);
        }
    
    }

    async listarUsuario(){

        const sql = 'SELECT * FROM universidade.usuario';
        const usuario = await banco.query(sql);
      
        if (usuario.rows.length == 0){
            console.log("Sem usuários cadastrados.");
        } 
        
        else{
            console.table(usuario.rows);
        }
    
    }

    async atualizarUsuario(cpf, nome, data_nascimento, email, telefone, login, senha){

        try{ 
        const sql = 'UPDATE universidade.usuario SET nome = $1, data_nascimento = $2, email = $3, telefone = $4, login = $5, senha = $6 WHERE cpf = $7';
        const resultado = await banco.query(sql, [nome, data_nascimento, email, telefone, login, senha, cpf]);
      
        if (resultado.rowCount > 0){
            console.log("Usuário atualizado com sucesso.");
        } 
        
        else{
            console.log("Usuário não existe.");
        }

        }
        catch(erro){
            console.log("Erro ao atualizar usuário:", erro.message);
        }
    
    }

    async deletaUsuario(cpf){
        
        try{
        const sql = 'DELETE FROM universidade.usuario WHERE cpf = $1';
        const resultado = await banco.query(sql, [cpf]);
        
        if (resultado.rowCount > 0){
            console.log("Usuário deletado com sucesso.");
        } 
        
        else{
            console.log("Usuário não encontrado.");
        }

        }
        catch(erro){
            console.log("Erro ao deletar usuário:", erro.message);
        }
    }


    async existe(cpf){

        const sql = 'SELECT cpf FROM universidade.usuario WHERE cpf = $1';
        const resultado = await banco.query(sql, [cpf]);
        return resultado.rowCount > 0;

    }


}

class Estudante{

    async cadastrarEstudante(mat_estudante, cpf, mc, ano_ingresso){

        try{ 
        const sql = 'INSERT INTO universidade.estudante(mat_estudante, cpf, mc, ano_ingresso) VALUES($1, $2, $3, $4)';
        await banco.query(sql, [mat_estudante, cpf, mc, ano_ingresso]);
        console.log("Estudante cadastrado com sucesso.");

        }
        catch(erro){
            console.log("Erro ao cadastrar estudante:", erro.message);
        }

    }

    async listarEstudante(){

        const sql = 'SELECT * FROM universidade.estudante';
        const resultado = await banco.query(sql); 
        
        if (resultado.rows.length == 0){
            console.log("Sem estudantes cadastrados.");
        } 
        
        else{
            console.table(resultado.rows);
        }

    }

    async atualizarEstudante(mat_estudante, mc, ano_ingresso){

        try{ 
        const sql = 'UPDATE universidade.estudante SET mc = $1, ano_ingresso = $2 WHERE mat_estudante = $3';
        const resultado = await banco.query(sql, [mc, ano_ingresso, mat_estudante]);

        if (resultado.rowCount > 0){
            console.log("Estudante atualizado com sucesso.");
        } 

        else{
            console.log("Estudante não localizado.");
        }

        }
        catch(erro){
            console.log("Erro ao atualizar estudante:", erro.message);
        }

    }

    async deletaEstudante(mat_estudante){

        try{ 
        const sql = 'DELETE FROM universidade.estudante WHERE mat_estudante = $1';
        const resultado = await banco.query(sql, [mat_estudante]);

        if (resultado.rowCount > 0){
            console.log("Estudante excluído com sucesso.");
        } 
        
        else{
            console.log("Estudante não localizado.");
        }

        }
        catch(erro){
            console.log("Erro ao deleta estudante:", erro.message);
        }

    }

  
    async existe(mat_estudante){
        const sql = 'SELECT mat_estudante FROM universidade.estudante WHERE mat_estudante = $1';
        const resultado = await banco.query(sql, [mat_estudante]);
        return resultado.rowCount > 0;
    }
}

class Curso{
    
    async cadastrarCurso(nome, grau, turno, campus, nivel){

        try{ 
        const sql = 'INSERT INTO universidade.curso( nome, grau, turno, campus, nivel) VALUES($1, $2, $3, $4, $5)';
        await banco.query(sql, [ nome, grau, turno, campus, nivel]);
        console.log("Curso cadastrado com sucesso.");

        }
        catch(erro){
            console.log("Erro ao cadastrar curso:", erro.message);
        }

    }

    async listarCurso(){

        const sql = 'SELECT * FROM universidade.curso';
        const resultado = await banco.query(sql); 

        if (resultado.rows.length == 0){
            console.log("Sem cursos cadastrados.");
        } 
        
        else{
            console.table(resultado.rows);
        }

    }

    async atualizarCurso(idcurso, nome, grau, turno, campus, nivel){

        try{ 
        const sql = 'UPDATE universidade.curso SET nome = $1, grau = $2, turno = $3, campus = $4, nivel = $5 WHERE idcurso = $6';
        const resultado = await banco.query(sql, [nome, grau, turno, campus, nivel, idcurso]);
      
        if (resultado.rowCount > 0){ 
            console.log("Curso atualizado com sucesso.");
        } 
        
        else{
            console.log("Curso não localizado.");
        }

        }
        catch(erro){
            console.log("Erro ao atualizar curso:", erro.message);
        }

    }

    async deletaCurso(idcurso){
        
        try{ 
        const sql = 'DELETE FROM universidade.curso WHERE idcurso = $1';
        const resultado = await banco.query(sql, [idcurso]);

        if (resultado.rowCount > 0){
            console.log("Curso deletado com sucesso.");
        } 
        
        else{
            console.log("Curso não localizado.");
        }

        }
        catch(erro){
            console.log("Erro ao deletar curso:", erro.message);
        }

    }

    async existe(idcurso){
        const sql = 'SELECT idcurso FROM universidade.curso WHERE idcurso = $1';
        const resultado = await banco.query(sql, [idcurso]);
        return resultado.rowCount > 0;
    }

}

class Vinculo{

    async cadastrarVinculo(mat_estudante, curso, data_entrada, status, data_saida){
        
        try{ 
        const sql = ' INSERT INTO universidade.vinculo(mat_estudante, curso, data_entrada, status, data_saida) VALUES($1, $2, $3, $4, $5)';
        await banco.query(sql,[ mat_estudante, curso, data_entrada, status, data_saida]);
        console.log("Novo vinculo cadastrado.");
        }
        catch(erro){
            console.log("Erro ao cadastrar vinculo:", erro.message);
        }
    }

    async listarVinculo(){

        const sql = 'SELECT * FROM universidade.vinculo';
        const resultado = await banco.query(sql); 

        if (resultado.rows.length == 0){
            console.log("Sem vinculo cadastrados.");  
        }

        else {
            console.table(resultado.rows);
        }

    }

    async atualizarVinculo(idVinculo, mat_estudante, curso, data_entrada, status, data_saida){

        try{ 
        const sql = 'UPDATE universidade.vinculo SET mat_estudante = $1, curso = $2, data_entrada = $3, status = $4, data_saida = $5 WHERE idVinculo = $6';
        const resultado = await banco.query(sql, [mat_estudante, curso, data_entrada, status, data_saida, idVinculo]);
       
        if (resultado.rowCount > 0){ 
            console.log("Vinculo atualizado com sucesso.");
        }

        else{
            console.log("Vinculo não localizado.");
        }

        }
        catch(erro){
            console.log("Erro ao atualizar vinculo:", erro.message);
        }


    }

    async deletaVinculo(idVinculo){
        
        try{ 
        const sql = 'DELETE FROM universidade.vinculo WHERE idVinculo = $1';
        const resultado = await banco.query(sql, [idVinculo]);

        if (resultado.rowCount > 0){
            console.log("Vinculo deletado com sucesso.");
        } 
        
        else {
            console.log("Vinculo não localizado.");
        }

        }
        catch(erro){
            console.log("Erro ao deletar vinculo:", erro.message);
        }


    }

}

class InterfaceTabela {

    limpar(){
        console.clear();
    }

    pausar() {
        prompt("Pressione ENTER para continuar......");
        this.limpar();
    }

    menutabela() {
        console.log("\n=== SELEÇÃO DE TABELAS ===\n");
        console.log("1 - Tabela Usuário");
        console.log("2 - Tabela Estudante");
        console.log("3 - Tabela Curso");
        console.log("4 - Tabela Vinculo");
        console.log("0 - Sair do Programa");
    }

    menuOperacoes(nomeTabela) {
        console.log(`\n--- Menu Operações: ${nomeTabela} ---\n`);
        console.log("1 - Cadastrar");
        console.log("2 - Listar Todos");
        console.log("3 - Atualizar");
        console.log("4 - Deletar");
        console.log("0 - Voltar");
    }

}

const Ousuario = new Usuario();
const Oestudante = new Estudante(); 
const Ocurso = new Curso();
const Ovinculo = new Vinculo();
const tface = new InterfaceTabela();

async function iniciar() {
    let tabela = -1;

    while (tabela !== 0) {
        
        tface.menutabela();
        tabela = parseInt(prompt("Escolha uma tabela: "));
        tface.limpar();

        if (tabela == 1){
            let opcao = -1;
            tface.limpar();

            while (opcao !== 0){

                tface.menuOperacoes("Usuário");
                opcao = parseInt(prompt("Escolha uma opção: "));
                tface.limpar();

                switch (opcao){

                    case 1:{

                        console.log("\n[Novo Usuário]");
                        const cpf = prompt("CPF usuário: ");
                        const nome = prompt("Nome: ");
                        const dataNasci = prompt("Data de nascimento (AAAA-MM-DD): ");
                        const email = prompt("Email: ");
                        const telefone = prompt("Telefone: ");
                        const login = prompt("Login: ");
                        const senha = prompt("Senha: ");
                        await Ousuario.cadastrarUsuario(cpf, nome, dataNasci, email, telefone, login, senha);
                        tface.pausar();
                        break;
                    }

                    case 2:{

                        console.log("\n[Listar todos os usuários]");
                        await Ousuario.listarUsuario();
                        tface.pausar();
                        break;
                    }

                    case 3:{

                        console.log("\n[Atualizar Usuário]");
                        await Ousuario.listarUsuario();
                        const cpf_usuario = prompt("CPF do usuário que deseja atualizar: ");
                        const novoNome = prompt("Novo nome: ");
                        const novoDataNasci = prompt("Nova data de nascimento (AAAA-MM-DD): ");
                        const novoEmail = prompt("Novo email: ");
                        const novoTelefone = prompt("Novo telefone: ");
                        const novoLogin = prompt("Novo login: ");
                        const novaSenha = prompt("Nova senha: ");
                        await Ousuario.atualizarUsuario(cpf_usuario, novoNome, novoDataNasci, novoEmail, novoTelefone, novoLogin, novaSenha);
                        tface.pausar();
                        break;
                    }

                    case 4:{

                        console.log("\n[Deletar Usuário]");
                        await Ousuario.listarUsuario();
                        const cpf_remover = prompt("CPF do usuário para remover: ");
                        await Ousuario.deletaUsuario(cpf_remover);
                        tface.pausar();
                        break;
                    }

                    case 0:
                        break;

                    default:
                        console.log("Opção inválida.");
                        tface.pausar();
                        break;
                }
            }
        }

        else if (tabela == 2){
            let opcao = -1;
            tface.limpar();

            while (opcao != 0){

                tface.menuOperacoes("Estudante");
                opcao = parseInt(prompt("Escolha uma opção: "));
                tface.limpar();

                switch (opcao){

                    case 1:{

                        console.log("\n[Novo Estudante]");
                        const cpf = prompt("CPF do estudante (Já deve estar cadastrado como usuário): ");
                        
                        const usuarioExiste = await Ousuario.existe(cpf);
                        if (!usuarioExiste) {
                            console.log("Esse CPF não corresponde a nenhum usuário cadastrado. Cadastre o usuário primeiro!");
                            tface.pausar();
                            break;
                        }

                        const matricula = prompt("Matrícula do estudante: ");
                        const mc = prompt("MC do estudante: ");
                        const ingresso = prompt("Ano de ingresso: ");
                        await Oestudante.cadastrarEstudante(matricula, cpf, mc, ingresso);
                        tface.pausar();
                        break;
                    }

                    case 2:{

                        console.log("\n[Listar todos os estudantes]");
                        await Oestudante.listarEstudante();
                        tface.pausar();
                        break;
                    }

                    case 3:{

                        console.log("\n[Atualizar Estudante]");
                        await Oestudante.listarEstudante();
                        const matricula_alt = prompt("Matrícula do estudante: ");
                        const novomc = prompt("Novo MC do estudante: ");
                        const novoIngresso = prompt("Novo Ano de Ingresso: ");
                        await Oestudante.atualizarEstudante(matricula_alt, novomc, novoIngresso);
                        tface.pausar();
                        break;
                    }

                    case 4:{

                        console.log("\n[Deletar Estudante]");
                        await Oestudante.listarEstudante();
                        const matricula_remover = prompt("Matrícula do estudante para remover: ");
                        await Oestudante.deletaEstudante(matricula_remover);
                        tface.pausar();
                        break;
                    }


                    case 0:
                        break;

                    default:
                        console.log("Opção inválida.");
                        tface.pausar();
                        break;
                }
            }
        }

        else if(tabela == 3){

            let opcao = -1;
            tface.limpar();

            while (opcao !== 0){

                tface.menuOperacoes("Curso");
                opcao = parseInt(prompt("Escolha uma opção: "));
                tface.limpar();

                switch (opcao){

                    case 1:{

                        console.log("\n[Novo curso]");
                        const nome = prompt("Nome: ");
                        const grau = prompt("Grau do curso: ");
                        const turno = prompt("Turno: ");
                        const campus = prompt("Campus: ");
                        const nivel = prompt("Nível: ");
                        await Ocurso.cadastrarCurso( nome, grau, turno, campus, nivel);
                        tface.pausar();
                        break;
                    }

                    case 2:{ 

                        console.log("\n[Listar todos os cursos]");
                        await Ocurso.listarCurso();
                        tface.pausar();
                        break;
                    }

                    case 3:{

                        console.log("\n[Atualizar curso]");
                        await Ocurso.listarCurso();
                        const id_curso = prompt("ID do curso que deseja atualizar: ");
                        const novoNome = prompt("Novo nome: ");
                        const novoGrau = prompt("Novo grau do curso: ");
                        const novoTurno = prompt("Novo turno: ");
                        const novoCampus = prompt("Novo campus: ");
                        const novoNivel = prompt("Novo nível do curso: ");
                        await Ocurso.atualizarCurso(id_curso, novoNome, novoGrau, novoTurno, novoCampus, novoNivel);
                        tface.pausar();
                        break;
                    }

                    case 4:{ 

                        console.log("\n[Deletar curso]");
                        await Ocurso.listarCurso();
                        const idCurso = prompt("ID do curso para remover: ");
                        await Ocurso.deletaCurso(idCurso);
                        tface.pausar();
                        break;
                    }


                    case 0:
                        break;

                    default:
                        console.log("Opção inválida.");
                        tface.pausar();
                        break;
                }
            }


        }

        else if(tabela == 4){

            let opcao = -1;
            tface.limpar();

            while (opcao !== 0){

                tface.menuOperacoes("Vinculo");
                opcao = parseInt(prompt("Escolha uma opção: "));
                tface.limpar();


                switch (opcao){
                    

                    case 1:{

                        console.log("\n[Novo vinculo]");
                        const matricula = prompt("Matricula: ");
                        const estudanteExiste = await Oestudante.existe(matricula);
                        if (!estudanteExiste) {
                            console.log("Essa matrícula não existe. Cadastre o estudante primeiro!");
                            tface.pausar();
                            break;
                        }
                        const curso = prompt("Curso: ");
                        const cursoExiste = await Ocurso.existe(curso);
                        if (!cursoExiste) {
                            console.log("Esse ID de curso não existe. Cadastre o curso primeiro!");
                            tface.pausar();
                            break;
                        }
                        const dataEntrada = prompt("Data de entrada: ");
                        const status = prompt("Status: ");
                        const dataSaida = prompt("Data de saida: ");
                        await Ovinculo.cadastrarVinculo(matricula, curso, dataEntrada, status, dataSaida);
                        tface.pausar();
                        break;
                    }

                    case 2:{ 

                        console.log("\n[Listar todos os vinculos]");
                        await Ovinculo.listarVinculo();
                        tface.pausar();
                        break;
                    }    

                    case 3:{

                        console.log("\n[Atualizar vinculo]");
                        await Ovinculo.listarVinculo();
                        const id_vinculo = prompt("ID do vinculo que deseja atualizar: ");
                        const novaMatricula = prompt("Nova matricula: ");
                        const novoCurso = prompt("Novo curso: ");
                        const novaDataEntrada = prompt("Nova data de entrada: ");
                        const novoStatus = prompt("Novo status: ");
                        const novaDataSaiada = prompt("Nova data de saida: ");
                        await Ovinculo.atualizarVinculo(id_vinculo, novaMatricula, novoCurso, novaDataEntrada, novoStatus, novaDataSaiada);
                        tface.pausar();
                        break;
                    }

                    case 4:{

                        console.log("\n[Deletar vinculo]");
                        await Ovinculo.listarVinculo();
                        const idVinculo = prompt("ID do vinculo para remover: ");
                        await Ovinculo.deletaVinculo(idVinculo);
                        tface.pausar();
                        break;
                    }


                    case 0:
                        break;

                    default:
                        console.log("Opção inválida.");
                        tface.pausar();
                        break;
                }
            }
        }
    }

    console.log("Encerrando conexão com o banco...");
    await banco.end();
    console.log("Programa finalizado.");
}

iniciar();