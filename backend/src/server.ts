//responsável para subir o app e conexão com o bando
import app from './app';

//up database
import database from './database';
//Para sincronizar o javascript com o banco de dados
// force: true - sempre destroi e recria a tabela
database.sync({force: false}); //usar force: true somente em ambiente DEV, nunca em produção
console.log('Database running at 3306');

app.listen(3000); //vai ficar escutando a porta 3000
console.log('Server running at 3000');