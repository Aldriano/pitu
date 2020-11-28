import { TypeFormatFlags } from "typescript";

//puro typeScript, criar um tipo de objeto
//A grande sacada do typeScript é cria "tipos"
export type Link = {  //definir a estrutura/atributos/parâmetros no Link 
    // ? indica que são opcionais
    id?: number,
    url: string,  //URL longa, a normal
    code?: string, //URL encurtada
    hits?: number,  //quantidade de vezes de foram clicados
    updateAt?: Date  //fiz por conta ????
}