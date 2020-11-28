import React from 'react';
//Renderiza o icon que for passado
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../../components/Header';
//desestruturar o bootstrap
import { Container, InputGroup, FormControl, Button, Alert, Spinner}  from 'react-bootstrap';
import { ContentContainer, Form, AdsBlock} from './styles';
import ShortenerService from '../../services/shortenerService';

class HomePage extends React.Component {
    //construtor q recebe todos os propriedades (props) passado pela página
    constructor(props){ 
        super(props);

        //armazenar dados. Preservar as informações/persistir
        this.state = {
            isLoading: false,  //cuidar o comportamento do carregamento
            url: '',   //armazenr a url q o usuario digitar
            code: '',  //url gerada
            errorMessage:'',
        };

    }

    handleSubmit = async(event) => {
        event.preventDefault();  //cancela o submite da página

        const { url } = this.state;

        //setar algumas informações no estado
        this.setState({isLoading: true, errorMessage: '' });

        //testa se a URL est vazia, se sim seta algo
        if(!url){
            this.setState({ isLoading: false, errorMessage: 'Informe uma URL para encurtar.'});
        }else{
            //chamar o backend
            try{
                const service = new ShortenerService();
                const result = await service.generate({url});

                this.setState({isLoading: false, code: result.code});
            }catch (error){
                this.setState({isLoading: false, errorMessage: 'Ocorreu um erro ao tentar encurtar a url '+url+ ' '+error});
            }
        }

    }

    copyToClipboard = () => {
        const element = this.inputURL;
        //selecionar todo o conteúdo desse elemento e executa um Ctrl+C
        element.select();
        document.execCommand('copy');
    }


    //retornar
    render(){
        //para usar uma variável de um state. Ex: isLoading>
        //Usa {this.isLoadin..} ou define
        //desistruturar
        const {isLoading, errorMessage, code} = this.state;  //agora consegue enxergar abaixo

        return (
           <Container>
               <Header> Seu novo encurtador de URL. :)</Header> 
               <ContentContainer>
                   <Form onSubmit={this.handleSubmit}>
                        <InputGroup className="mb-3"> 
                            <FormControl 
                                placeholder="Digite a url para encrtar"
                                defaultValue=""
                                //seta o valor digitado no estado url, isto é, quando o usuário for digitando, vai armazenando
                                onChange={e => this.setState({ url: e.target.value})}
                            />
                            <InputGroup.Append>
                                <Button variant="primary" type="submit">Encurtar</Button>
                            </InputGroup.Append>
                        </InputGroup>

                       {isLoading ? (
                           <Spinner animation="border"/>
                       ) : (
                           //testa se code for diferente vazio/Nullo, retornar um componente
                           // retornar um fragmente(<></>). fragment retorna um conjunto de itens
                           code && (
                               <>
                                <InputGroup className="mb-3">
                                    <FormControl 
                                        autoFocus={true}
                                        defaultValue={`https://pitu.tk/${code}`}
                                        //Precisa referenciar ao componente FormControl para poder manipular dentro do contexto
                                        //maneira correta de referenciar um input dentro do métode de renderização
                                        //Cria o elemento inputURL "this.inputURL", usado na função copyToClipboard
                                        ref={(input) => this.inputURL = input}                                
                                    />
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary" onClick={() => this.copyToClipboard()}>Copiar</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <p>Para acompanhar as estatísticas, acesse https://pitu.tk/{code}</p>
                               </>
                           )
                       )}
                       
                       {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                       
                   </Form>
               </ContentContainer>
               <ContentContainer>
                   <AdsBlock>Adense </AdsBlock>
               </ContentContainer>
            </Container>
            
           //<p>Homepage</p>
        )
    }
}

//Obs: existe duas formas de passar um propriedade: como filho ou props
//como filho, ex: <Header> Header customizada</Header>
//como propriedade: Header title="Titulo"> Header customizada</Header> -- passando um propriedade para o componente
// <FontAwesomeIcon icon="check-square" /> HomePage

//Obs: {errorMessage && <Alert variant="danger">errorMessage</Alert>} - verificar se erroMessagem for diferente de vazio/nullo
//mostra uma mensaggem




export default HomePage;