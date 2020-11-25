//linModel é a tabela do banco de dados
import Sequelize, {Optional, Model} from 'sequelize';
import {Link} from './link'; 
import database from '../database';
import { isOptionalChain } from 'typescript';

//Optional<Link, "id"> - indica que quando for criar um novo link o id é opcional
interface ILinkCreateAttributes extends Optional<Link, "id">{} 
//Segue as regras o ILinkModel, regras 
export interface ILinkModel extends Model<Link, ILinkCreateAttributes>, Link{}

//criar a tabela e seus atributos (campos)
//define<ILinkModel> - <> Indica que o define segue as regras de nosso schema
// isso implica se tentar criar um campo que não consta na estrutura que definimos, gera um erro.
//Isto é uma validação do typeScript
const LinkModel= database.define<ILinkModel>('link',{
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false  //não permite nulo
    },
    url: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    code: {
        type: Sequelize.STRING(20),
        unique: true,  //não permitir código repetido
        allowNull: false

    },
    hits: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    }
})

export default LinkModel; 
