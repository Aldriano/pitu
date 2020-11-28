import React from 'react';
import Header from '../../components/Header';
import {Container} from 'react-bootstrap';

import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';  //para usar o icones
import {StatsContainer} from './styles';

class NotFoundPage extends React.Component {
    constructor(props){
        super(props);

    }

    //retornar
    render(){
        return (      
            <Container>
                <>
                    <Header>
                        Seu novo encurtador de urls. :)                        
                    </Header>
                    <StatsContainer className="text-center">
                        <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                        <p className="mb-3">Página não encontad</p>
                        <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                    </StatsContainer>
                </>
                  
            </Container>
        )
    }
}

//      <p>Página não encontada :(</p>
export default NotFoundPage;