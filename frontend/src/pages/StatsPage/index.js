import React from 'react';
import Header from '../../components/Header';
import {Container} from 'react-bootstrap';

//referenciando o serviço
import ShortenerService from '../../services/shortenerService';

//parse e format para a data, pois está no banco em formato de String
import {parseISO, formatRelative} from 'date-fns';
//selecionar o idioma Português BR
import ptBR from 'date-fns/locale/pt-BR';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './styles';

class StatsPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            shortenedURL: {},
            errorMessage: '',
        }
    }

    // Dentro do React existe um ciclo de vida. Montar e desmontar componentes
    //https://date-fns.org/ 
    async componentDidMount(){
        //const code = this.props.match.params.code;  //ou assim: const {code} = this.props.match.params;  //desistruturando
        const {code} = this.props.match.params;  //desistruturando

        try{
            const service = new ShortenerService(); //instanciando
            const shortenedURL = await service.getStats(code);

            console.log("shortenedURL= "+Object.values(shortenedURL),"tipo =", typeof shortenedURL);
            //index.js:34 shortenedURL= 1,https://www.luiztools.com.br,qvanL,0,2020-11-25T17:41:17.000Z,2020-11-25T17:41:17.000Z
            
            //parse do atributo do banco: updateAt
            //const parseDate =  parseISO(shortenedURL.updateAt);
            const parseDate =  parseISO(Object.values(shortenedURL)[5]);
            const currentDate = new Date();  
            
            //analisando erro: Ops, a url solicitada não existe.RangeError: Invalid time value
            console.log('Data banco sem parse: '+shortenedURL.updateAt);
            console.log('data banco: '+parseDate+' data atual: '+currentDate);

            const relativeDate = formatRelative(parseDate, currentDate, {locale: ptBR}); //calcula a dirença entre datas

            //está adicionando uma propriedade e não substituindo um valor dessa variável shortenedURL
            //shortenedURL.relativeDate é a nova propriedade
            shortenedURL.relativeDate = relativeDate; 

            this.setState({isLoading: false, shortenedURL});
        }catch (error){
            this.setState({isLoading: false, errorMessage: 'Ops, a url solicitada não existe.'+error});
        }
    }

    //retornar
    render(){
        const {errorMessage, shortenedURL} = this.state;
        return (
           <Container>
               <Header>Estatísticas:</Header>
               {errorMessage ? (
                   <StatsContainer className="text-center">
                       <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                       <p className="mb-3">{errorMessage}</p>
                       <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                   </StatsContainer>
               ):(
                <StatsContainer className="text-center">
                    <p><b>https://ptu.tk/{shortenedURL.code}</b> </p>
               <p>Redireciona para: <br/>{shortenedURL.url}</p>
               <StatsRow>
                   <StatsBox>
                        <b>{shortenedURL.hits}</b>
                        <StatsBoxTitle>Visitas</StatsBoxTitle>
                   </StatsBox>
                   <StatsBox>
                        <b>{shortenedURL.relativeDate}</b>
                        <StatsBoxTitle>Última Visita</StatsBoxTitle>
                   </StatsBox>                   
               </StatsRow>
               <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                </StatsContainer>
               )}
           </Container>
        )
    }
}

export default StatsPage;