//conexão com o banco de dados
import {Sequelize} from 'sequelize';
//usuário:senha@ip:porta/bancodeDados
const sequelize = new Sequelize('mysql://root:@localhost:3306/pitu'); //passa um string de conexão

// para poder usar o objeto sequelize em server.ts para inicializar o banco de dados
export default sequelize; 