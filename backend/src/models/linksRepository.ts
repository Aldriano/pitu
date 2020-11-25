//Módulo de manipulação no banco de dados. Todas as manipulações passam por aqui
// {ILinkModel} é um componente do linkModel
import linkModel, {ILinkModel} from './linkModel';
// porque usar o {}, pois o typescript não permite usar o export default
import {Link} from './link';

//3 operações no banco:
//encontar por código
function findByCode(code: string){
    //encontre o link
    //ILinkModel é a junção do 
    // O findOne é assincrono não retorna de imediato, retorna depois, se quiser esprear tem 
    // que usr await
    return linkModel.findOne<ILinkModel>({ where: {code}});
    //findOne é o equivalente ao SELECT do SQL
}

//adiconar um novo/salvar um  link
function add(link: Link){
    //ILinkModel é a junção linkModel com Link do typeScript
    return linkModel.create<ILinkModel>(link); //passa somente o link que deseja salvar
    // Create é o equivalente INSERT do SQL
}

// atualizar o hit existente
//Quando usar await tem que especificar na função o comando async
async function hit(code: string){
    //await "trava" a aplicação enquanto não retornar a busca
    const link = await findByCode(code); //await aguardar retorno de função
    if(!link) return null;
    link.hits!++; // incrementar. A exclamção é porque o hits pode ser nulo
    //Inserir await, quebrar o assincrono da função save. 
    //Salva agora e somente prossegue quando termina.
    //Persistência dos dados
    await link.save();  //salvar no banco de dados. Semelhante a UPDATE do SQL
    return link;
}

//exportar as 3 funções
export default {
    findByCode,
    add,
    hit
}