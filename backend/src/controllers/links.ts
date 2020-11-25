//Lógica por trás do roteamento
// Papel do controller é processar as requisições e enviar para o Model
// O controller é o meio de campo entre o Router e o Banco de dados- padrão MVC
import {Request, Response} from 'express';
import {Link} from '../models/link';

//Para salvar no banco de dados
import linksRepository from '../models/linksRepository';

/* desativado pois n~~ao iremos testar na memória, irá salvar no banco de dados
const links : Link[] =[]; //criando um array do tipo Link
// tipo let, quando a varável será alterada
let proxId = 1;  //controle do id, porque só virá no body o URL
*/

function generateCode(){
    let text = '';
    // //armaena a lista de caractes possíveis
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
    //gerar um código encurtado de tamanho 5
    for(let i=0; i<5; i++)
        //concatena com um letra(charAt), o charAr pede um posição
        //floor = função de arredondamento 
        // Math.random() * possible.length - para gerar de acordo com as possibilidades declaradas
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
async function postLink(req:Request, res:Response){
    //um POST manda um BODY da requisição
    //o Body pode vir qualquer coisa, nesse caso especifico será do tipo Link (que criamos)
    //Lembra que criamos uns atributos opcionais?
    const link = req.body as Link; //pega o Body e faz um type CAST pra o tipo Link
    // desativa pois no banco é auto Incremento link.id = proxId++; // adiciona 1 e incrementa +1 para a próxima requisião que vier
    //gerar a URL encurtada
    link.code = generateCode();
    link.hits = 0;  // usado para a estatística de cliques do link
    //desativar pois será salvo no banco de dados: links.push(link); //armazena no array links (memória)
    
    //salvar na tabela
    const result = await linksRepository.add(link); //usou await, a função tem que inicar com async
    //send enviar resposta para o usuário
    if(!result.id) return res.sendStatus(400);
    
    link.id = result.id;
    //status: 201 significa que foi criando o solicitado e retorna o link encutado em json
    res.status(201).json(link);  
}

async function getLink(req:Request, res:Response){
    //req.params.code - pega os 5 caracteres (url encurtada)
     const code = req.params.code as string;  //faz um cast para o tipo string
    //Obs: Não estamos controlando/validando a geração de URLs encurtadas repetidas *futura implementação
    
    //desativado foi para teste - const link = links.find(item => item.code === code);
    const link = await linksRepository.findByCode(code);

    if(!link)
        res.sendStatus(404); //não encontrado
    else
        res.json(link);
        
}

//Quando o link é acessado
async function hitLink(req:Request, res:Response){
    const code = req.params.code as string;
    //findIndex - pega  a posição do array que está o item
    //desativado -- const index = links.findIndex(item => item.code === code);

    const link = await linksRepository.hit(code);

    //desativado - if(index === -1)
    if(!link)
        res.sendStatus(404);  // não encontrado
    else{
        //como o hits é opcional o typeScript irá reclamar, pois pode estar nulo
        //mas sempre inicializamos com 0, então não será nulo, então inserimos uma 
        //exclamação (!), responsabilizamos que não será nulo.
        
        //desativado links[index].hits!++; //incrementa 1 
        //desativado teste armazenar ram - res.json(links[index]); //retorna o link da posição encontrada no array
        
        res.json(link);
    }   

}

//As funções precisão ser exportadas para usar em outras partes no projeto
//Iremos exportas as 3 funções um único objeto (encapsular). Para criar objeto em javascript usamos as chaves {}
export default {
    postLink,
    getLink,
    hitLink
}