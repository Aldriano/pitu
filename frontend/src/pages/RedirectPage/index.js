//finalidade para computar os clicks
import React from 'react';
import Header from '../../components/Header';
import {Container} from 'react-bootstrap';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';  //para usar o icones
import {StatsContainer} from './styles';
import ShortenerService from '../../services/shortenerService';

class RedirectPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoaind: false,
            url: '',
            errorMessage: '',
        }
    }

    //funcao para verificar se o link existe. Bater no backend
    async componentDidMount(){
        const { code } = this.props.match.params;
            
        try {
            const service = new ShortenerService();
            //retorna + de um valor, então pode desistruturar {url}
            const result = await service.getLink(code);
            //const {url} = await service.getLink(code); 

            window.location = result.url;
        }catch (error){
            this.setState({ isLoading: false, errorMessage: 'Ops, a url solicitada não existe.'});
        }
    }
    //retornar
    render(){
        const { errorMessage } = this.state;
        return (
            <Container>
                {errorMessage ? (
                    <>
                        <Header>
                            Seu novo encurtador de urls. :)                        
                        </Header>
                        <StatsContainer className="text-center">
                            <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                            <p className="mb-3">{ errorMessage }</p>
                            <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                        </StatsContainer>
                    </>
                ) : (
                    <p className="text-center">Redirecionando ...</p>
                )}                
            </Container>
        )
    }
}

export default RedirectPage;