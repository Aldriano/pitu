//configuraçõs das rotas
import {Router} from 'express'; //irá usar somente o componente Router do express
//importar o controller
import linksController from '../controllers/links';

const router = Router();

/*router.post('/links',(req,res) => {  //função com 2 parametros, requisição e resposta
    res.send('POST');
})*/
//refatoração do codigo

router.post('/links', linksController.postLink);

//Tal rota espera uma url
router.get('/links/:code', linksController.hitLink); // :code é a declaração de uma variável

router.get('/links/:code/stats', linksController.getLink);

//exportar as rotas para usar no app.ts
export default router;