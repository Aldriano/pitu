import React from 'react';
// {} desistruturar
import {Logo, HeaderContainer} from './styles';

import Icone from '../../assets/logo-pitu.jpg';

function Header(props){
    return (
        /*<> 
        <p>Header: {props.title}</p>
        <p>{props.children}</p>
        </>*/
        <>
            <HeaderContainer>
                <Logo src={Icone} alt='Pitu Encurtador de URL' />
                <h1>Pitu</h1>
                <p>{props.children}</p>
            </HeaderContainer>
        </>

    )
}

//Obs: as tags <></> permite agrupar os itens em único elemente (saída), pois somente permite retorno um elemento
export default Header;